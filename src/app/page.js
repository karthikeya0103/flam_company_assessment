'use client';

import { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import { useBookmark } from '../hooks/useBookmark';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateUserModal from '../components/CreateUserModal';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookmarkedUsers, addBookmark, removeBookmark } = useBookmark();
  const { user, logout } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/users?limit=${usersPerPage}&skip=${(currentPage - 1) * usersPerPage}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        
        // Add mock performance data to each user
        const enhancedUsers = data.users.map(user => ({
          ...user,
          department: user.company?.department || 'N/A',
          performanceRating: Math.floor(Math.random() * 5) + 1
        }));
        
        if (currentPage === 1) {
          setUsers(enhancedUsers);
        } else {
          setUsers(prev => [...prev, ...enhancedUsers]);
        }
        
        // Check if we've loaded all users
        setHasMore(data.total > currentPage * usersPerPage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [currentPage]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePromote = (userId) => {
    alert(`User ${userId} promoted!`);
  };

  const handleUserCreated = (newUser) => {
    // In a real app, this would come from the API response
    const enhancedUser = {
      ...newUser,
      id: users.length + 1,
      department: newUser.department || 'Engineering',
      performanceRating: 5,
      image: 'https://dummyjson.com/icon/user/128' 
    };
    
    setUsers(prev => [enhancedUser, ...prev]);
    setShowCreateModal(false);
  };

  if (error && !users.length) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        {showCreateModal && (
          <CreateUserModal 
            onClose={() => setShowCreateModal(false)}
            onUserCreated={handleUserCreated}
          />
        )}
        
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Employee Directory</h1>
            
            <div className="flex space-x-4">
              <Link
                href="/analytics"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Analytics
              </Link>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Add Employee
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
          
          {/* Welcome message */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              Welcome back, <span className="font-semibold">{user?.name}</span>! You are logged in as an {user?.role}.
            </p>
          </div>
          
          {/* User cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isBookmarked={bookmarkedUsers.some((bookmarkedUser) => bookmarkedUser.id === user.id)}
                onBookmark={addBookmark}
                onUnbookmark={removeBookmark}
                onPromote={handlePromote}
              />
            ))}
          </div>
          
          {/* Load more button */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
          
          {!hasMore && users.length > 0 && (
            <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
              All employees loaded
            </p>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
