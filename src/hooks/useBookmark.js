'use client';

import { useState, useEffect } from 'react';

export function useBookmark() {
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedUsers');
    if (savedBookmarks) {
      try {
        setBookmarkedUsers(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Failed to parse bookmarks:', error);
      }
    }
  }, []);

  // Update localStorage when bookmarkedUsers changes
  useEffect(() => {
    if (bookmarkedUsers.length > 0) {
      localStorage.setItem('bookmarkedUsers', JSON.stringify(bookmarkedUsers));
    }
  }, [bookmarkedUsers]);

  const addBookmark = (user) => {
    setBookmarkedUsers(prev => {
      // Check if user is already bookmarked to avoid duplicates
      if (prev.some(bookmarkedUser => bookmarkedUser.id === user.id)) {
        return prev;
      }
      return [...prev, user];
    });
  };

  const removeBookmark = (user) => {
    setBookmarkedUsers(prev => 
      prev.filter(bookmarkedUser => bookmarkedUser.id !== user.id)
    );
    // If all bookmarks are removed, clear localStorage item
    if (bookmarkedUsers.length === 1) {
      localStorage.removeItem('bookmarkedUsers');
    }
  };

  return { bookmarkedUsers, addBookmark, removeBookmark };
}
