import React, { useState } from 'react';
import { NavBar, Filters, Pic, Param } from "./components";
import axios from 'axios';

const App = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = async (cardId, filterType) => {
    try {
      setSelectedFilter(cardId);
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post('http://localhost:8080/api/apply_filter', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          filterType: filterType,
        },
      });
      console.log(response);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-3/4 flex flex-col">
        <div className="flex">
          <Param />
          <NavBar />
          <Pic />
        </div>
        <div className="flex-1 overflow-auto">
          {/* Your main content here */}
        </div>
      </div>
      <div className="w-1/4 bg-gray-200">
        <Filters />
      </div>
    </div>
  );
};

export default App;
