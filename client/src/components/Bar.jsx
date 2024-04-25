  import React, { useState } from 'react';
  import { AdjustmentsIcon, ScaleIcon, ColorSwatchIcon, SunIcon, LightBulbIcon } from '@heroicons/react/solid';
  import axios from 'axios';

  const Bar = (props) => {
    const { bar, title, icon } = props;
    const [value, setValue] = useState(3);
    const [loading, setLoading] = useState(false); // State to track loading status
    const Icon = props.icon;

    const handleChange = (e) => {
      const newValue = parseInt(e.target.value);
      setValue(newValue);
      console.log("handleChange " + `${props.title} value: ${newValue}`);
      sendValueToBackend(newValue);
      bar("bar" + title, newValue);
    };

    const sendValueToBackend = (newValue) => {
      setLoading(true); // Set loading to true while waiting for response
      const scaledValue = newValue * 0.5;
      axios.post('http://localhost:8080/api/update-value', { title: props.title, value: scaledValue })
        .then(response => {
          console.log("bar" + response.data);
          let Bardata = response.data;
          let Title = Bardata.title;
          console.log("bar" + Title);
          setLoading(false); // Set loading to false when response received
        })
        .catch(error => {
          console.error('Error sending value to backend:', error);
          setLoading(false); // Set loading to false in case of error
        });
    };

    return (
      <div className="flex items-center mb-2">
        <Icon className="w-6 h-6 mr-2 text-gray-400" />
        <div className="flex flex-col flex-grow">
          <span className="text-gray-400">{props.title}</span>
          <input type="range" min="0" max="10" value={value} onChange={handleChange} className="w-full" />
          {loading && <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-9.291A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4z"></path>
            </svg>
          </div>}
        </div>
      </div>
    );
  };

  export default Bar;
