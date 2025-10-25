import React, { useState, ReactNode } from 'react';
import './CarouselGame.css';




export function GameActive({ Gameimages,lenImg }) {

    const [index, setIndex] = useState(0);

    const LenCont = lenImg;

    const goToSlide = (slideIndex) => {
      setIndex(slideIndex);
    }

    return (
        <>
        <div className="carousel-container-images">
            <div className="carousel-images-game" >
                    {React.Children.toArray(Gameimages)[index]}
            </div>
            <div className="button-images-games-carouseles">
             <GameImagesCarousel images={Array.from({ length: LenCont }).map((_, i) => (
                <button
                    key={i}
                    className={`button-image-game ${i === index ? 'active' : ''}`}
                    
                >
                  {Gameimages[i] ? ( <img className='button-image-game' src={Gameimages[i]} alt={Gameimages[i]?.title} onClick={() => goToSlide(i)}  />
                    ) : null}
                </button>
                ))} len={LenCont} />

            </div>
        </div>
        </> 
      );
}; 

export function GameImagesCarousel({ images, len }) {

  const [index, setIndex] = useState(0);
  const LenCont = len;

    const handlePrevious = () => {
      const newIndex = index - 1;
      setIndex(newIndex < 0 ? LenCont - 1 : newIndex);
    };
    const handleNext = () => {
      const newIndex = index + 1;
      setIndex(newIndex >= LenCont ? 0 : newIndex);
    };

    return (
        <>
            <div className="carousel-game">
                <button onClick={handlePrevious} className='button-left-carousel-game'><i className="bi bi-chevron-left" /></button>
                <div className="slides-container-game" >
                  {React.Children.toArray(images)[index]}
                </div>
                <button onClick={handleNext} className='button-right-carousel-game'><i className="bi bi-chevron-right" /></button>
            </div>
        </>
    );  
};
