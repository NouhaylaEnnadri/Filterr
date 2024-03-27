import React from 'react';
import { AdjustmentsIcon, ScaleIcon, ColorSwatchIcon, SunIcon } from '@heroicons/react/solid'; // Import icons from Heroicons v2
import Bar from './Bar';

const DarkSidebar = () => {
  return (
    <div className="bg-[#2D363F] border-t border-[#ffffff] mt-[55px] p-2 flex h-screen">
      <div className="w-64 "> 
        <h1 className="m-[10px] font-poppins font-semibold text-2xl text-white mb-4">Editing</h1>
        <nav className="mt-4 mb-10">
         <Bar icon={AdjustmentsIcon} title="Adjustement"/>
         <Bar icon={ScaleIcon} title="Scale"/>
         <Bar icon={ColorSwatchIcon} title="Color swatch"/>
         <Bar icon={SunIcon} title="light"/>
        </nav>
      </div>
    </div>
  );
};

export default DarkSidebar;
