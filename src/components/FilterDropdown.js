import { useState } from 'react';

export default function FilterDropdown({ departments, selectedFilters, setSelectedFilters, applyFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (department) => {
    if (selectedFilters.includes(department)) {
      setSelectedFilters(selectedFilters.filter(d => d !== department));
    } else {
      setSelectedFilters([...selectedFilters, department]);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 flex items-center text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18.85 1.1A1.99 1.99 0 0 0 17.063 0H2.937a2 2 0 0 0-1.566 3.242L7.437 10v6.5a1.5 1.5 0 0 0 .4 1.025l2 2A1.5 1.5 0 0 0 12 18.5V10l6.067-6.758A2 2 0 0 0 18.85 1.1Z"/>
        </svg>
        Filter
        {selectedFilters.length > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {selectedFilters.length}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700">
          <div className="p-3">
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Department</h6>
            <ul className="space-y-2 text-sm">
              {departments.map((department) => (
                <li key={department} className="flex items-center">
                  <input
                    id={`filter-${department}`}
                    type="checkbox"
                    checked={selectedFilters.includes(department)}
                    onChange={() => toggleFilter(department)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500" 
                  />
                  <label
                    htmlFor={`filter-${department}`}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {department}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3">
            <button
              onClick={() => {
                applyFilters();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
