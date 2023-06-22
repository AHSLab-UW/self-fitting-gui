import React, { useState, useRef } from "react";
import { NextButton } from "./NextButton";
import arrowLeftImage from "../assets/imgs/arrowL.png"; // Import the left arrow image
import arrowRightImage from "../assets/imgs/arrowR.png"; // Import the right arrow image

interface Image {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  function handlePreviousImage() {
    if (currentImageIndex != 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }

  function handleNextImage() {
    if (currentImageIndex != images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }

  function handleSelectImage(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedImageIndex = Number(event.target.value);
    setCurrentImageIndex(selectedImageIndex);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartXRef.current = event.touches[0].clientX;
    setIsSwiping(true);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (isSwiping) {
      const touchCurrentX = event.touches[0].clientX;
      const touchStartX = touchStartXRef.current;
      const diffX = touchStartX && touchCurrentX - touchStartX;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(calc(-${
          currentImageIndex * 100
        }% + ${diffX}px))`;
      }
    }
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (isSwiping) {
      const touchEndX = event.changedTouches[0].clientX;
      const touchStartX = touchStartXRef.current;
      const diffX = touchStartX && touchEndX - touchStartX;

      if (diffX && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          handlePreviousImage();
        } else {
          handleNextImage();
        }
      }

      setIsSwiping(false);
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(-${
          currentImageIndex * 100
        }%)`;
      }
    }
  }

  const imageStyles: React.CSSProperties = {
    display: "block",
    margin: "auto",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  };

  return (
    <>
        <img
          src={arrowLeftImage}
          alt="Previous"
          onClick={handlePreviousImage}
          style={{
            position: "absolute",
            top: "45%",
            right: "100%",
            transform: "translateY(-50%)",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            zIndex: 1,
            marginRight: 25,            
          }}
        />
      <div
        style={{ position: "relative", overflow: "hidden" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel container */}
        <div
          ref={carouselRef}
          style={{
            display: "flex",
            transform: `translateX(-${currentImageIndex * 100}%)`,
            transition: isSwiping ? "none" : "transform 0.3s ease",
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              style={imageStyles}
            />
          ))}
        </div>
      </div>
      <img
          src={arrowRightImage}
          alt="Next"
          onClick={handleNextImage}
          style={{
            position: "absolute",
            top: "45%",
            left: "100%",
            transform: "translateY(-50%)",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            zIndex: 1,
            marginLeft: 25
          }}
        />
            <NextButton
        onclick={() => {
          localStorage.setItem("scene", images[currentImageIndex].alt);
        }}
        to="/fit-instruct"
        text="Next"
      />
    </>
  );
};

export default ImageCarousel;
