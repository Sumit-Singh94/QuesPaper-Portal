import React, { useState } from 'react';

const SearchBar = ({ papers, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const q = e.target.value;
    setQuery(q);

    const filtered = papers.filter((paper) => {
      const subject = paper.subject_name || '';
      const code = paper.coursecode || '';
      return subject.toLowerCase().includes(q.toLowerCase()) ||
             code.toLowerCase().includes(q.toLowerCase());
    });

    onSearch(filtered);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by course code or subject name..."
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
    </div>
  );
};

export default SearchBar;
