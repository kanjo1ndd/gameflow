import React, { useState, useEffect } from 'react';
import './CarouselGame.css';


export function CarouselGame ({ Gameimages, lenImg }) {
  const [index, setIndex] = useState(0);
  const LenCont = lenImg;


    const handlePrevious = () => {
      const newIndex = index - 1;
      setIndex(newIndex < 0 ? LenCont - 1 : newIndex);

    };

    const handleNext = () => {
      const newIndex = index + 1;
      setIndex(newIndex >= LenCont ? 0 : newIndex);
    };
    const goToSlide = (slideIndex) => {
      setIndex(slideIndex);
    }

    useEffect(() => {
      const timer = setInterval(() => {
      handleNext();
      }, 8000);

      return () => clearInterval(timer);
    }, [index]);

  return (
    <>
    <div className="carousel-container">
      <div className="carousel">
        <button onClick={handlePrevious} className='button-left-carousel-game'><i className="bi bi-chevron-left" /></button>
        <div className="carousel-images-game" >
              <img className="carousel-images-game-2" src={React.Children.toArray(Gameimages)[index]} alt="" />
            </div>
        <button onClick={handleNext} className='button-right-carousel-game'><i className="bi bi-chevron-right" /></button>
      </div>
       <div className="button-game-images-carouseles">
                {Array.from({ length: LenCont }).map((_, i) => (
                <button
                    key={i}
                    className={`button-game-image-carousel-active ${i === index ? 'active' : ''}`}
                    onClick={() => goToSlide(i)}
                >
                  {Gameimages[i] ? ( <img className='button-image-game' src={Gameimages[i]} alt={Gameimages[i]?.title || 'Banner image'} />
                    ) : null}
                </button>
                ))}
            </div>

    </div>
      
    </>
  );
};


