import React, { useState } from 'react';
import { NavBar, Filters, Pic, Param } from "./components";

const App = () => {

  const [value,setValue]=useState("");
  const [barTitle,setbarTitle]=useState("");
  const [barValue,setBarValue]=useState("");


  const buttoncclicked = (degree)=>{
    setValue(degree);
    console.log("clicked button");
  }
  const filterChanged = (barTitle,barValue)=>{
      setbarTitle(barTitle);
      setBarValue(barValue);

      console.log(" bar value changed");
    }

  return (
      <div className='overflow-hidden  h-screen ' >
        <div className="flex">
          <Param />
          <NavBar btnonclick={buttoncclicked} barclick={filterChanged} />
        <div className="flex-1  h-screen ">
        <Pic  value={value} barTitle={barTitle} barValue={barValue} />
        </div>
      </div>
      </div>
     
  );
};

export default App;
