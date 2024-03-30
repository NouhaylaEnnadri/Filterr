import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { cardData } from '../constant';
import { bw, gaussian } from '../../../server/index';

const Pic = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      // Send image to backend for processing
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:8080/api/process-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

  const handleCardClick = async (card) => {
    console.log('Card clicked:', card.id);

    if (card) {
      // Update preview image with the processed image
      try {
        const response = await axios.post('http://localhost:8080/api/card', { cardId: card.id });
        console.log(response.data);
      } catch (error) {
        console.error('Error sending card ID:', error);
      }

      // Check if an image has been loaded before setting the preview image to black and white
      if (previewImage && card.id === 1) {
        setPreviewImage(bw);
      }
      if (previewImage && card.id === 2) {
        setPreviewImage(gaussian);
      }
    }
  };

  const handleRefresh = () => {
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[680px] h-[480px] border-2 border-gray-300 border-dashed rounded-lg flex justify-center items-center overflow-hidden">
          {previewImage ? (
            <div className="flex flex-col items-center">
              <img src={previewImage} className="w-[480px] h-[380px] object-cover" alt="Uploaded image" />
              <button
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
                onClick={handleRefresh}
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
      <div className="flex-1 mt-[55px] border border-gray-400 bg-primary relative overflow-hidden h-screen">
        <h1 className="m-[10px] font-poppins font-semibold text-2xl text-white mb-4">Filtres</h1>
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 4rem)' }}>
          <div className="flex flex-col items-end pr-4"> {/* Move the filter cards to the far right */}
            {cardData.map((card, index) => (
              <div key={card.id} className="max-w-xs mx-2 mb-4" onClick={() => handleCardClick(card)}>
                <div className="rounded overflow-hidden shadow-lg bg-white">
                  <div className="px-4 py-2">
                    <img src={card.imgUrl} alt="" /> {/* Use card.image to display the associated image */}
                    <div className="font-bold text-lg mb-1 text-[#111827]">{card.title}</div>
                    <p className="text-text text-sm">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pic;
