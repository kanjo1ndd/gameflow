import React, { useState, useEffect } from 'react';
import './Carousel.css';


const Carousel = ({ game, len }) => {
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
    const goToSlide = (slideIndex) => {
      setIndex(slideIndex);
    }

    useEffect(() => {
      const timer = setInterval(() => {
      handleNext();
      }, 12000);

      return () => clearInterval(timer);
    }, [index]);

  return (
    <>
    <div className="carousel-container">
      <div className="carousel">
        <button onClick={handlePrevious} className='button-carousel'><i className="bi bi-chevron-left" /></button>
        <div className="slides-container" >
            {React.Children.toArray(game)[index]}
        </div>
        <button onClick={handleNext} className='button-carousel'><i className="bi bi-chevron-right" /></button>
      </div>
      <div className="button-indicators">
        {Array.from({ length: LenCont }).map((_, i) => (
          <button
            key={i}
            className={`button-indicator ${i === index ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
      
    </>
  );
};
export default Carousel;

export function CarouselVertical({ game, len }) {
  const [index, setIndex] = useState(0);
  const LenCont = len;
    
    const handleNext = () => {
      const newIndex = index + 1;
      setIndex(newIndex >= LenCont ? 0 : newIndex);
    };
    
    useEffect(() => {
      const timer = setInterval(() => {
      handleNext();
      }, 5000);

      return () => clearInterval(timer);
    }, [index]);

  return (
    <>
    <div className="carousel-container-vertical">
        <div className="slides-container-vertical" >
            {React.Children.toArray(game)[index]}
        </div>
    </div>
      
    </>
  );
};

