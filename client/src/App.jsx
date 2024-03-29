import React, { useState } from 'react';
import { NavBar, Filters, Pic, Param } from "./components";

const App = () => {
 
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
