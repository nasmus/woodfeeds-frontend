import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from "react";
import "../../css/Slider.css";


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
  }, [nextBanner]);

  return (
    <div className="flex flex-col lg:flex-row px-3 lg:px-10 ">
      <div className="lg:w-4/6">
        {" "}
        <div className="banner-slider">
          <div>
            <div className="image">
              <img
                src={banners[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className={`object-fill rounded-xl border slider-image ${
                  currentIndex === currentIndex ? "active" : ""
                }`}
              />
            </div>
            <button onClick={previousBanner}>
              {" "}
              <ArrowBackIosNewIcon />{" "}
            </button>
            <button onClick={nextBanner}>
              {" "}
              <ArrowForwardIosIcon />{" "}
            </button>
          </div>
          <div className="slider-dots">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`slider-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 flex flex-col mt-[10px] ">
        <img
          src="/woodfeeds_banar.png"
          className="w-full h-[169px] mb-[10px]  rounded-xl"
          alt="banner-pic"
        />
        <img
          src="woodfeeds_banner.png"
          className="w-full h-[169px]  rounded-xl"
          alt="banner-pic"
        />
      </div>
    </div>
  );
}

export default BannerSidebar;
