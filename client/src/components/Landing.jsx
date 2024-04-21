import React, { useState } from 'react';
import { hero } from "../assets";
import { Param } from '.';

const Landing = ({ onClick }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Param/>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Enhance Your Photos.
              <span className="sm:block"> With Our Filters. </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Transform your images with our advanced filter collection, designed to elevate your photography.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"
                onClick={onClick}
              >
                Get Started
              </a>
              <button
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white  hover:bg-transparent focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                onClick={openModal}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
    <div className="bg-white p-8 rounded-md m-40">
      <h2 className="text-lg font-semibold mb-4">How Our Filter App Works</h2>
      <p className="text-gray-700 ">
        Our filter app allows you to modify your original images without altering the filtered versions. 
        With our app, any filter applied will only affect the original image, preserving the integrity of 
        your filtered versions. This ensures that you can experiment with different filters without 
        compromising the quality of your images.
      </p>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      
    </>
  );
};

export default Landing;
