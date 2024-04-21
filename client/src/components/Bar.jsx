import React, { useState } from 'react';
import { AdjustmentsIcon, ScaleIcon, ColorSwatchIcon, SunIcon, LightBulbIcon } from '@heroicons/react/solid'; // Import icons from Heroicons v2
import axios from 'axios'; // Import Axios for making HTTP requests

const Bar = (props) => {
  const { bar, title, icon } = props; // Destructure props
  const [value, setValue] = useState(3); // State to hold the value of the input range
  const Icon = props.icon; // Dynamically assign the icon component

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    console.log("handleChange " + `${props.title} value: ${newValue}`); // Log the value of the input range
    sendValueToBackend(newValue); // Call sendValueToBackend with the new value
    bar("bar" + title, newValue); // Call the bar function passed from props
  };

  const sendValueToBackend = (newValue) => {
    // Send value to the backend
    const scaledValue = newValue * 0.5; // Scale value to range between 0 and 2 (PIL brightness factor)
    axios.post('http://localhost:8080/api/update-value', { title: props.title, value: scaledValue })
      .then(response => {
        console.log("bar" + response.data);
        let Bardata = response.data;
        let Title = Bardata.title;
        console.log("bar" + Title);
      })
      .catch(error => {
        console.error('Error sending value to backend:', error);
      });
  };

  return (
    <div className="flex items-center mb-2">
      <Icon className="w-6 h-6 mr-2 text-gray-400" />
      <div className="flex flex-col flex-grow">
        <span className="text-gray-400">{props.title}</span>
        <input type="range" min="0" max="10" value={value} onChange={handleChange} className="w-full" />
      </div>
    </div>
  );
};

export default Bar;
