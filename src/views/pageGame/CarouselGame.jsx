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
              <img className="carousel-images-game-2" src={React.Children.toArray(Gameimages)[index]} alt="" />
            </div>
            <div className= {`button-images-games-carouseles ${index === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}>
              
             <GameImagesCarousel images={Gameimages} len={LenCont} />

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
                <div className="carousel-container-game-images">
                <div className="slides-container-game" >
                  {Array.from({ length: LenCont }).map((_, i) => (
                    <button
                        key={i}
                        className="button-image-carousel"
                    >
                      {images[i] ? ( <img className='button-image-banner' src={images[i]} alt={images[i]?.title || 'Banner image'} />
                        ) : null}
                    </button>
                ))}
                </div>
                </div>
                <button onClick={handleNext} className='button-right-carousel-game'><i className="bi bi-chevron-right" /></button>
            </div>
        </>
    );  
};
