import React from 'react';
import { AdjustmentsIcon, ScaleIcon, ColorSwatchIcon, SunIcon, LightningBoltIcon, LightBulbIcon } from '@heroicons/react/solid'; // Import icons from Heroicons v2
import Bar from './Bar';
import Button from './Button'; // Import the Button component

const DarkSidebar = ({btnonclick,barclick}) => {
  return (
    <div className="bg-[#2D363F] border-t border-[#ffffff] mt-[55px] p-2 flex h-screen">
      <div className="w-64 "> 
        <h1 className="m-[10px] font-poppins font-semibold text-2xl text-white mb-4">Editing</h1>
        <nav className="mt-4 mb-10">
          <Bar icon={LightBulbIcon} title="Bright" bar={barclick}  />
          <Bar icon={ScaleIcon} title="Scale" bar={barclick}/>
          <Bar icon={ColorSwatchIcon} title="Color swatch" bar={barclick} />
          <Bar icon={SunIcon} title="light" bar={barclick}/>
          <div className="flex 1 pl-4 space-x-10">
          <Button degree={90}   btt={btnonclick} />   
          <Button degree={180}   btt={btnonclick} />   

          </div>
          <div className="flex 1  pl-4 space-x-10">
          <Button degree={360}   btt={btnonclick} />   
          <Button degree={120}   btt={btnonclick} />   

          </div>
       

        </nav>
      </div>
    </div>
  );
};

export default DarkSidebar;
