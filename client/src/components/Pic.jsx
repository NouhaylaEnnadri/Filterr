import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pic = ({ clickedCard }) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (clickedCard) {
      console.log('A card is clicked:', clickedCard);
    }
  }, [clickedCard]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };
  
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[680px] h-[480px] border-2 border-gray-300 border-dashed rounded-lg flex justify-center items-center overflow-hidden">
        {previewImage ? (
          <div className="flex flex-col items-center">
            <img
              src={previewImage}
              className="w-[480px] h-[380px] object-cover"
              alt="Uploaded image"
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
              onClick={() => setPreviewImage(null)}
            >
              Import another image
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img className="mx-auto h-10 w-10" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>Drag and drop</span>
                <span className="text-indigo-600"> or browse</span>
                <span> to upload</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pic;

