'use client';

import { useState, useEffect } from 'react';

export function useSearch(users) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    if (!searchTerm && selectedFilters.length === 0) {
      setFilteredUsers(users);
      return;
    }

    let result = [...users];

    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter((user) => 
        user.firstName.toLowerCase().includes(lowerCaseSearchTerm) || 
        user.lastName.toLowerCase().includes(lowerCaseSearchTerm) || 
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.department.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Filter by department
    if (selectedFilters.length > 0) {
      result = result.filter((user) => selectedFilters.includes(user.department));
    }

    setFilteredUsers(result);
  }, [searchTerm, users]);

  const filterByDepartment = (departments) => {
    if (departments.length === 0) {
      setFilteredUsers(users);
      return;
    }

    let result = [...users];

    // Apply search term filter first
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter((user) => 
        user.firstName.toLowerCase().includes(lowerCaseSearchTerm) || 
        user.lastName.toLowerCase().includes(lowerCaseSearchTerm) || 
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.department.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Then apply department filter
    result = result.filter((user) => departments.includes(user.department));
    
    setFilteredUsers(result);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    setFilteredUsers,
    filterByDepartment,
    selectedFilters,
    setSelectedFilters
  };
}
