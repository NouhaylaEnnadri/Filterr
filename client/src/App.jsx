import React, { useState } from 'react';
import { NavBar, Filters, Pic, Param } from "./components";

const App = () => {
 
  return (
    <div >
      <div >
        <div className="flex">
          <Param />
          <NavBar />
          <Pic />
        </div>
       
      </div>
     
    </div>
  );
};

export default App;
