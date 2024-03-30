import React, { useState } from 'react';
import { NavBar, Filters, Pic, Param } from "./components";

const App = () => {
 
  return (
      <div className='overflow-hidden  h-screen   ' >
        <div className="flex">
          <Param />
          <NavBar />
        <div className="flex-1  h-screen ">
        <Pic />
        </div>
      </div>
      </div>
     
  );
};

export default App;
