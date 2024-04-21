import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cardData } from '../constant';
import { bw, gaussian, sepia ,original , rotated_120,
  rotated_180,
  rotated_90,
  rotated_360,
  sharp,
  staruration,
  contrast,
  vignette,
  warmth,
  lens, water,Bright_0,Bright_1,Bright_2,Bright_3,Bright_4,Bright_5} from '../../../server/index';

const ImageSection = ({ previewImage, handleFileChange, handleRefresh }) => (
  <div className="m-10 flex-1 mt-10 flex justify-center items-center">
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
);

const Pic = ({ value, barValue, barTitle }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState(""); // Initialize title state
  const [degree, setDegree] = useState(0); // Initialize degree state
  const [PbarTitle, setbarTitle] = useState(0); // Initialize degree state
  const [PbarValue, setbarValue] = useState(0); // Initialize degree state


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
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
      try {
        const response = await axios.post('http://localhost:8080/api/card', { cardId: card.id });
        console.log(response.data);
      } catch (error) {
        console.error('Error sending card ID:', error);
      }

      if (previewImage) {
        switch (card.id) {
          case 1:
            setPreviewImage(original);
            break;
          case 2:
            setPreviewImage(bw);
            break;
          case 3:
            setPreviewImage(gaussian);
            break;
          case 4:
            setPreviewImage(sepia);
            break;
          case 5: 
          setPreviewImage(sharp);
          break;
          case 6:
            setPreviewImage(staruration);
            break;

          case 7:
            setPreviewImage(contrast);
            break;

          case 8:
            setPreviewImage(vignette);
            break;

          case 9:
            setPreviewImage(warmth);
            break;

          case 10:
            setPreviewImage(water);
            break;

          case 11:
            setPreviewImage(lens);
            break;
          default:
            break;
        }
      }
    }
  };

  const handleRefresh = () => {
    setPreviewImage(null); // Reset previewImage state to null
  };

  useEffect(() => {
    console.log("value" + value); 

    if (previewImage && value) {
      console.log("rotation" + value);
      setTimeout(() => {
        switch (value) {
          case 90:
            setPreviewImage(rotated_90);
            break;
          case 120:
            setPreviewImage(rotated_120);
            break;
          case 180:
            setPreviewImage(rotated_180);
            break;
          case 360:
            setPreviewImage(rotated_360);
            break;
          default:
            break;
        }
      }, 1000); // Wait for 1 second (1000 milliseconds) before updating previewImage
    }
  }, [value, previewImage]);

  useEffect(() => {
    setbarTitle(barTitle);
    setbarValue(barValue);
    console.log("pic" + barValue);

    if (previewImage && barValue) {
      if (barValue >= 0 && barValue < 1) {
        setPreviewImage(Bright_0);
      } else if (barValue >= 1 && barValue < 2) {
        setPreviewImage(Bright_1);
      } else if (barValue >= 2 && barValue < 3) {
        setPreviewImage(Bright_2);
      }
     else if (barValue >= 3 && barValue < 4) {
      setPreviewImage(Bright_3);

    }
   else if (barValue >= 4 && barValue < 5) {
    setPreviewImage(Bright_4);
  }

    }
  
    console.log("pic" + barTitle);
  }, [barValue, barTitle,previewImage]);
  
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Image Section */}
      <ImageSection
        previewImage={previewImage}
        handleFileChange={handleFileChange}
        handleRefresh={handleRefresh}
      />
      {/* Filters Section */}
      <div className="w-[250px] flex-1 mt-14 border border-gray-400 bg-primary relative overflow-hidden">
        <h1 className="m-[10px] font-poppins font-semibold text-2xl text-white mb-4">Filters</h1>
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 4rem)' }}>
          <div className="flex flex-col items-end pr-4">
            {cardData.map((card) => (
              <div key={card.id} className="max-w-xs mx-2 mb-4" onClick={() => handleCardClick(card)}>
                <div className="rounded overflow-hidden shadow-lg bg-white">
                  <div className="px-4 py-2">
                    <img src={card.imgUrl} alt="" />
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
