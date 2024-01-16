import React, { useEffect, useState } from "react";
import "../../css/Slider.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function BannerSidebar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = [
    "woodfeeds_banner.png",
    "woodfeeds_banar.png",
    // Add your banner image URLs here
  ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000);

      return () => clearInterval(interval);
    }, [banners.length]);
    const previousBanner = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
      );
    };

  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="banner-slider">
      <div>
        <div className="image">
          <img 
          src={banners[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`}
            className={` border slider-image ${currentIndex === currentIndex ? 'active' : ''}`}
          />
        </div>
        <button onClick={previousBanner}>  <ArrowBackIosNewIcon /> </button>
        <button onClick={nextBanner}> <ArrowForwardIosIcon /> </button>
        
      </div>
      <div className="slider-dots">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSidebar;
