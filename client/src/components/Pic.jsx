import React, { useState } from 'react';
import axios from 'axios';

const Pic = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post('http://localhost:8080/api/filtre/image', formData, {
          responseType: 'arraybuffer',  // Ensure axios treats the response as binary data
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Convert the array buffer to blob
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        
        // Create blob URL for the image data
        const imageUrl = URL.createObjectURL(blob);
        
        // Set the blob URL as the preview image
        setPreviewImage(imageUrl); 
      } catch (error) {
        console.error('Error uploading image:', error);
      }
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
              alt="Black and white image"
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
