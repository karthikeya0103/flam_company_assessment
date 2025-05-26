'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import RatingStars from '../../../components/RatingStars';
import { useBookmark } from '../../../hooks/useBookmark';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function EmployeeDetails({ params }) {
    const { id } = React.use(params);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const { bookmarkedUsers, addBookmark, removeBookmark } = useBookmark();
    
    const isBookmarked = user ? bookmarkedUsers.some((bookmarkedUser) => bookmarkedUser.id === user.id) : false;
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://dummyjson.com/users/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const userData = await response.json();
                
                // Add mock data
                const departments = ["HR", "Engineering", "Marketing", "Finance", "Sales", "Design", "Operations"];
                const enhancedUser = {
                    ...userData,
                    department: departments[Math.floor(Math.random() * departments.length)],
                    performanceRating: Math.floor(Math.random() * 5) + 1,
                    bio: "A dedicated professional with extensive experience in the field. Known for attention to detail and commitment to excellence.",
                    performanceHistory: [
                        { period: 'Q1 2023', rating: Math.floor(Math.random() * 5) + 1, notes: "Exceeded expectations on project delivery." },
                        { period: 'Q4 2022', rating: Math.floor(Math.random() * 5) + 1, notes: "Strong team collaboration skills." },
                        { period: 'Q3 2022', rating: Math.floor(Math.random() * 5) + 1, notes: "On-time delivery of all assigned tasks." }
                    ],
                    projects: [
                        { name: "Website Redesign", status: "Completed", role: "Lead Developer" },
                        { name: "Mobile App Development", status: "In Progress", role: "UI Designer" },
                        { name: "Data Migration", status: "Planned", role: "Data Analyst" }
                    ],
                    feedback: [
                        { from: "Manager", date: "2023-06-15", content: "Shows great initiative and problem-solving skills." },
                        { from: "Peer", date: "2023-05-20", content: "Always willing to help team members and share knowledge." },
                        { from: "Client", date: "2023-04-10", content: "Professional attitude and excellent communication." }
                    ]
                };
                
                setUser(enhancedUser);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [id]);
    
    const handleBookmarkToggle = () => {
        if (isBookmarked) {
            removeBookmark(user);
        } else {
            addBookmark(user);
        }
    };
    
    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };
    
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Dashboard
                    </Link>
                    
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[500px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error || !user ? (
                        <div className="flex flex-col justify-center items-center min-h-[500px]">
                            <p className="text-red-500 mb-4">Error: {error || 'User not found'}</p>
                            <Link href="/" className="text-blue-600 hover:underline">Return to Dashboard</Link>
                        </div>
                    ) : (
                        <>
                            {/* Employee Header */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
                                        <Image 
                                            src={user.image} 
                                            alt={`${user.firstName} ${user.lastName}`}
                                            width={150}
                                            height={150}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="md:w-2/3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user.firstName} {user.lastName}</h1>
                                                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                                                <p className="text-gray-600 dark:text-gray-300">{user.phone}</p>
                                            </div>
                                            <div>
                                                <button 
                                                    onClick={handleBookmarkToggle}
                                                    className={`p-2 rounded-full ${
                                                        isBookmarked 
                                                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200' 
                                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
                                                    }`}
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
                                                <p className="font-medium text-gray-800 dark:text-white">{user.department}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                                                <p className="font-medium text-gray-800 dark:text-white">{user.age}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                                                <p className="font-medium text-gray-800 dark:text-white">{user.address.city}, {user.address.state}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
                                                <div className="flex items-center">
                                                    <RatingStars rating={user.performanceRating} />
                                                    <span className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded ${getPerformanceColor(user.performanceRating)}`}>
                                                        {user.performanceRating}/5
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Tabs Navigation */}
                            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                    <li className="mr-2">
                                        <button
                                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                                                activeTab === 'overview'
                                                    ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                            }`}
                                            onClick={() => setActiveTab('overview')}
                                        >
                                            Overview
                                        </button>
                                    </li>
                                    <li className="mr-2">
                                        <button
                                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                                                activeTab === 'projects'
                                                    ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                            }`}
                                            onClick={() => setActiveTab('projects')}
                                        >
                                            Projects
                                        </button>
                                    </li>
                                    <li className="mr-2">
                                        <button
                                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                                                activeTab === 'feedback'
                                                    ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                            }`}
                                            onClick={() => setActiveTab('feedback')}
                                        >
                                            Feedback
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Tab Content with Animation */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={tabVariants}
                                    >
                                        {activeTab === 'overview' && (
                                            <div>
                                                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Employee Overview</h2>
                                                <p className="mb-6 text-gray-600 dark:text-gray-300">{user.bio}</p>
                                                
                                                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Performance History</h3>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Period</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Rating</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Notes</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                            {user.performanceHistory.map((history, index) => (
                                                                <tr key={index}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{history.period}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <RatingStars rating={history.rating} />
                                                                            <span className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded ${getPerformanceColor(history.rating)}`}>
                                                                                {history.rating}/5
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{history.notes}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {activeTab === 'projects' && (
                                            <div>
                                                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Projects</h2>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    {user.projects.map((project, index) => (
                                                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                            <h3 className="font-bold text-gray-800 dark:text-white mb-2">{project.name}</h3>
                                                            <div className="flex justify-between mb-2">
                                                                <span className="text-sm text-gray-600 dark:text-gray-300">Role: {project.role}</span>
                                                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                                                                    project.status === 'Completed' 
                                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                                        : project.status === 'In Progress'
                                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                                                }`}>
                                                                    {project.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {activeTab === 'feedback' && (
                                            <div>
                                                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Feedback</h2>
                                                <div className="space-y-6">
                                                    {user.feedback.map((item, index) => (
                                                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                            <div className="flex justify-between mb-2">
                                                                <span className="font-medium text-gray-800 dark:text-white">From: {item.from}</span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                                                            </div>
                                                            <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                                                        </div>
                                                    ))}
                                                    
                                                    <div className="mt-6">
                                                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Add Feedback</h3>
                                                        <form className="space-y-4">
                                                            <div>
                                                                <label htmlFor="feedback" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Your Feedback</label>
                                                                <textarea 
                                                                    id="feedback" 
                                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                    placeholder="Write your feedback here..." 
                                                                    rows="4"
                                                                ></textarea>
                                                            </div>
                                                            <button 
                                                                type="button"
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                            >
                                                                Submit Feedback
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
