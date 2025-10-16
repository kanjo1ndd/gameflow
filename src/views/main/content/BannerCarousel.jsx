import React, { useState, ReactNode } from 'react';
import './BannerCarousel.css';
import './mobileContent.css';

const BannerCarousel = ({ game, len }) => {

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

    return (
        <>
          <div className="carousel-container-banner">
            <div className="carousel-banner">
              <button onClick={handlePrevious} className='button-left-carousel-banner'><i className="bi bi-chevron-left" /></button>
              <div className="slides-container-banner" >
                {React.Children.toArray(game)[index]}
              </div>
              <button onClick={handleNext} className='button-right-carousel-banner'><i className="bi bi-chevron-right" /></button>
            </div>
            <div className="button-indicators-banner">
              {Array.from({ length: LenCont }).map((_, i) => (
                <button key={i} className={`button-indicator-banner ${i === index ? 'active' : ''}`} onClick={() => goToSlide(i)} />
              ))}
            </div>
          </div>
        </>
    );  
};
export default BannerCarousel;


export function BannerActive({ images,lenImg }) {

    const [index, setIndex] = useState(0);

    const LenCont = lenImg;

    const goToSlide = (slideIndex) => {
      setIndex(slideIndex);
    }

    return (
        <>
        <div className="carousel-container-images">
            <div className="carousel-images" style={index%2===0 ? { backgroundColor: 'red' } :index%3===0 ? { backgroundColor: 'green' } :index===0 ? { backgroundColor: 'red' } : { backgroundColor: 'darkgray' }}>
                    {React.Children.toArray(images)[index]}
            </div>
            <div className="button-images-carouseles">
                {Array.from({ length: LenCont }).map((_, i) => (
                <button
                    key={i}
                    className={`button-image-carousel ${i === index ? 'active' : ''}`}
                    onClick={() => goToSlide(i)}
                >
                  {images[i] ? ( <img className='button-image-banner' src={images[i]} alt={images[i]?.title || 'Banner image'} />
                    ) : null}
                </button>
                ))}
            </div>
        </div>
        </> 
      );
};        
