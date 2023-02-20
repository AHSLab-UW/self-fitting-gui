import React, { useState } from "react";
import "./ImageSlider.css";

interface Image {
  src: string;
  alt: string;
}

interface SliderProps {
  images: Image[];
}

const ImageSlider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="slider">
      {images.map((image, index) => (
        <img
          key={index}
          className={index === currentIndex ? "slide active" : "slide"}
          src={image.src}
          alt={image.alt}
        />
      ))}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
