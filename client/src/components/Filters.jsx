import React, { useState } from 'react';
import { cardData } from '../constant';

const Filtres = () => {
  const [clickedCard, setClickedCard] = useState(null);

  const handleCardClick = (card) => {
    setClickedCard(card);
  };
 
  return (
    <div className="mt-[55px] border border-gray-400 bg-primary relative overflow-hidden h-screen">
      <h1 className="m-[10px] font-poppins font-semibold text-2xl text-white mb-4">Filtres</h1>
      <div className="overflow-y-auto" style={{ height: 'calc(100% - 4rem)' }}>
        <div className="flex flex-col">
          {cardData.map((card, index) => (
            <div key={card.id} className="max-w-xs mx-2 mb-4" onClick={() => handleCardClick(card)}>
              <div className="rounded overflow-hidden shadow-lg bg-white">
               
                <div className="px-4 py-2">
                  <div className="font-bold text-lg mb-1 text-[#111827]">{card.title}</div>
                  <p className="text-text text-sm">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    

    </div>
  );
};

export default Filtres;
