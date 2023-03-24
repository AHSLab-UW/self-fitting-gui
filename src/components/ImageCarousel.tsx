import React, { useState } from "react";
import { NextButton } from "./NextButton";

interface Image {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handlePreviousImage() {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  }

  function handleNextImage() {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  }

  function handleSelectImage(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedImageIndex = Number(event.target.value);
    setCurrentImageIndex(selectedImageIndex);
  }

  const imageStyles: React.CSSProperties = {
    display: "block",
    margin: "auto",
    width: "50vw",
    height: "50vw",
    objectFit: "cover",
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handlePreviousImage}> Prev </button>
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            style={imageStyles}
          />
          <button onClick={handleNextImage}>Next</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <label htmlFor="imageSelect">Select image:</label>
          <select
            id="imageSelect"
            value={currentImageIndex}
            onChange={handleSelectImage}
          >
            {images.map((image, index) => (
              <option key={index} value={index}>
                {image.alt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <NextButton
        onclick={() => {
          localStorage.setItem("scene", images[currentImageIndex].alt);
        }}
        to="/fit-select"
        text="Next"
      />
    </>
  );
};

export default ImageCarousel;
