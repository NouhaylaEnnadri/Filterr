import React from 'react';
import { AdjustmentsIcon, ScaleIcon, ColorSwatchIcon, SunIcon } from '@heroicons/react/solid'; // Import icons from Heroicons v2

const Bar = (props) => {
  const Icon = props.icon; // Dynamically assign the icon component

  return (
    <div className="flex items-center mb-2">
      <Icon className="w-6 h-6 mr-2 text-gray-400" />
      <div className="flex flex-col flex-grow">
        <span className="text-gray-400">{props.title}</span>
        <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
      </div>
    </div>
  );
};

export default Bar;
