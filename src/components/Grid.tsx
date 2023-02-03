import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface Coordinates {
  x: number;
  y: number;
}

const toScreenPosition = (coordinates: Coordinates, screenSize: number, gridSize: number = 50) => {
    return {
      x: coordinates.x * (screenSize / gridSize) + (screenSize / 2),
      y: coordinates.y * -(screenSize / gridSize) + (screenSize / 2),
    };
  };

const toStatePosition = (coordinates: Coordinates, screenSize: number, gridSize: number = 50) => {
    return {
        x: Math.round(coordinates.x / (screenSize / gridSize)) - (gridSize / 2),
        y: Math.round((coordinates.y - (screenSize / 2)) * -1 / (screenSize / gridSize)),
    };
};

const Grid = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [down, setDown] = useState(false);
  const [gridSize, setGridSize] = useState(300);

    useEffect(() => {
        setGridSize(window.innerWidth / 2);
        setCoordinates({
            x: 0,
            y: 0,
        })
    }, []);

    useEffect(() => {
        // print both gridsize and coordinates
        console.log(gridSize, coordinates);
    }, [coordinates]);


  const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setCoordinates(toStatePosition({
        x: e.touches ? e.touches[0].clientX : e.clientX,
        y: e.touches ? e.touches[0].clientY : e.clientY,
    }, window.innerWidth, gridSize));
    setDown(true);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!down) return;

    setCoordinates(toStatePosition({
      x: e.touches ? e.touches[0].clientX : e.clientX,
      y: e.touches ? e.touches[0].clientY : e.clientY,
    }, window.innerWidth, gridSize))
  };

  const handleEnd = () => {
    setCoordinates({
        x: Math.round(coordinates.x / 15) * 15,
        y: Math.round(coordinates.y / 15) * 15,
    });
    setDown(false);
  };

  const styles = useSpring({
    left: toScreenPosition(coordinates, window.innerWidth, gridSize).x,
    top: toScreenPosition(coordinates, window.innerWidth, gridSize).y,
    from: { left: 0, top: 0 },
  });

  return (
    <div
        className='grid'
        style={{
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(3, 1fr)`,
        gridTemplateRows: `repeat(3, 1fr)`,
        gap: `${gridSize / 30}px ${gridSize / 30}px`,
      }}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchStart={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseDown={handleStart}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            height: '100%',
            border: `${gridSize / 150}px solid black`,
            boxSizing: 'border-box',
          }}
        />
      ))}
      <animated.div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          background: 'red',
          borderRadius: '50%',
          transitionDuration: '0s',
          ...styles,
        }}
      />
    </div>
  );
};

export default Grid;
