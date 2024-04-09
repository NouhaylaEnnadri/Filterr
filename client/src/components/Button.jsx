import React from 'react';
import axios from 'axios';
import { rotate } from '../assets';

const Button = ({ degree ,btt }) => { // Corrected props destructuring
  const handleClick = async () => {
    btt(degree)

    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:8080/api/update-degree', { degree });
      console.log(response.data); // Optionally, log the response
    } catch (error) {
      console.error('Error sending degree:', error);
    }
  };
  return (
    <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 flex items-center`} onClick={handleClick}>
      <img src={rotate} alt="Icon" className={`w-6 h-6 mr-2 rotate-${degree}`} />
      <span>{degree}</span>
    </button>
  );
};

export default Button;
