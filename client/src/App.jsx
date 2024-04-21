import React, { useState } from 'react';
import { NavBar, Filters, Param, Landing, Pic } from "./components";

const App = () => {
  const [value, setValue] = useState("");
  const [barTitle, setBarTitle] = useState("");
  const [barValue, setBarValue] = useState("");
  const [showPic, setShowPic] = useState(false); // State to track whether to show the Pic component

  const buttonClicked = (degree) => {
    setValue(degree);
    console.log("clicked button");
  }

  const filterChanged = (barTitle, barValue) => {
    setBarTitle(barTitle);
    setBarValue(barValue);
    console.log("bar value changed");
  }

  const handleButtonClick = () => {
    setShowPic(true); // Set showPic to true to display the Pic component
  }

  return (
    <>
      {!showPic && (
            <Landing onClick={handleButtonClick} />
      )}
      {showPic && (
        <div className="overflow-hidden h-screen">
          <div className="flex h-screen">
            <Param />
            <NavBar btnonclick={buttonClicked} barclick={filterChanged} />
            <Pic value={value} barTitle={barTitle} barValue={barValue} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
