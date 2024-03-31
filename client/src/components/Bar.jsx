import React, { useState } from 'react';
import { AdjustmentsIcon, ScaleIcon, ColorSwatchIcon, SunIcon, LightBulbIcon } from '@heroicons/react/solid'; // Import icons from Heroicons v2
import axios from 'axios'; // Import Axios for making HTTP requests

const Bar = (props) => {
  const Icon = props.icon; // Dynamically assign the icon component
  const [value, setValue] = useState(50); // State to hold the value of the input range

  const handleChange = (e) => {
  const newValue = e.target.value;
  setValue(newValue);
  console.log(`${props.title} value: ${newValue}`); // Log the value of the input range
  sendValueToBackend(newValue); // Call sendValueToBackend with the new value
};


  const sendValueToBackend = () => {
    // Send value to the backend
    axios.post('http://localhost:8080/api/update-value', { title: props.title, value })
      .then(response => {
        console.log(response.data); // Log the response from the backend
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
        <input type="range" min="0" max="100" value={value} onChange={handleChange} className="w-full" />
      </div>
    </div>
  );
};

export default Bar;
