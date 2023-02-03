import React, { useEffect, useState } from 'react';

interface Coordinates {
  x: number;
  y: number;
}

const toScreenPosition = (coordinates: Coordinates, gridSize: number, xOffset: number, yOffset: number, range: number = 25) => {
    return {
      x: (coordinates.x / range + 1) * (gridSize/2) + xOffset,
      y: (coordinates.y / range + 1) * (gridSize/2) - yOffset,
    };
  };

const toStatePosition = (coordinates: Coordinates, gridSize: number, xOffset: number, yOffset: number, range: number = 25) => {
    return {
      x: ((coordinates.x - xOffset) / (gridSize/2) - 1) * range,
      y: ((coordinates.y + yOffset) / (gridSize/2) - 1) * range,
    };
};

const Grid = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [down, setDown] = useState(false);
  const [gridSize, setGridSize] = useState(300);
  const [dotStyle, setDotStyle] = useState({});

    useEffect(() => {
        setGridSize(window.innerWidth / 2);
        setCoordinates({
            x: 0,
            y: 0,
        })
    }, []);

    useEffect(() => {
        // print both state and screen coordinates
        console.log("state: ", coordinates);
        console.log("screen: ", toScreenPosition(coordinates, gridSize, gridSize/2, 0));

        setDotStyle({
          left: toScreenPosition(coordinates, gridSize, gridSize/2, 0).x - gridSize/2 - gridSize/24,
          top: toScreenPosition(coordinates, gridSize, gridSize/2, 0).y - gridSize/24,
          from: { left: 0, top: 0 },
        });
    }, [coordinates]);


  const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setCoordinates(toStatePosition({
        x: e.touches ? e.touches[0].clientX : e.clientX,
        y: e.touches ? e.touches[0].clientY : e.clientY,
    }, gridSize, gridSize/2, 0));
    setDown(true);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!down) return;

    setCoordinates(toStatePosition({
      x: e.touches ? e.touches[0].clientX : e.clientX,
      y: e.touches ? e.touches[0].clientY : e.clientY,
    }, gridSize, gridSize/2, 0))
  };

  const handleEnd = () => {
    setCoordinates({
        x: Math.round(coordinates.x / 16.7) * 16.7,
        y: Math.round(coordinates.y / 16.7) * 16.7,
    });
    setDown(false);
  };

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
      <div
        className="dot"
        style={{
          position: 'absolute',
          width: `${gridSize / 10}px`,
          height: `${gridSize / 10}px`,
          background: 'red',
          borderRadius: '50%',
          transitionDuration: '0s',
          ...dotStyle,
        }}
      />
    </div>
  );
};

export default Grid;
