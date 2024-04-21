import React from 'react';

const Landing = ({ onClick }) => {
  return (
    <div className="h-screen w-screen bg-red-500 flex justify-center items-center">
      <button
        className="bg-white text-red-500 px-4 py-2 rounded-md font-semibold text-lg"
        onClick={onClick} // Pass onClick handler received from props
      >
        Click to view Pic
      </button>
    </div>
  );
};

export default Landing;
