import React, { useEffect, useState } from "react";
import { sendCommand, sendGridCommand } from "../Command";
import * as math from 'mathjs';

export interface Coordinates {
  x: number;
  y: number;
}

const toScreenPosition = (
  coordinates: Coordinates,
  gridSize: number,
  xOffset: number,
  yOffset: number,
  range: number = 30
) => {
  return {
    x: (coordinates.x / range + 1) * (gridSize / 2) + xOffset,
    y: (coordinates.y / range + 1) * (gridSize / 2) - yOffset,
  };
};

const toStatePosition = (
  coordinates: Coordinates,
  gridSize: number,
  xOffset: number,
  yOffset: number,
  range: number = 30
) => {
  return {
    x: ((coordinates.x - xOffset) / (gridSize / 2) - 1) * range,
    y: ((coordinates.y + yOffset) / (gridSize / 2) - 1) * range,
  };
};

const Grid = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [down, setDown] = useState(false);
  const [gridSize, setGridSize] = useState(300);
  const [dotStyle, setDotStyle] = useState({});

  const [a, setA] = useState(math.matrix([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]));

  useEffect(() => {
    setGridSize(window.innerWidth / 2);
    setCoordinates({
      x: 0,
      y: 0,
    });

    // === Tuning Parameters ===
    // Generate an array of 6 random numbers with mean 0 and standard deviation 1
    let arr = math.random([6], -1, 1);

    // Subtract the mean of the array from each element to make the sum of all elements equal to 0
    let sum = math.sum(arr);
    arr = arr.map(x => x - sum/6);

    // Convert the array to a matrix
    let matrix = math.matrix(arr);

    // Reshape the matrix into a 6 x 2 matrix
    let reshapedMatrix = math.zeros([6, 2]);
    reshapedMatrix = math.subset(reshapedMatrix, math.index(math.range(0, 3), 0), matrix.subset(math.index(math.range(0, 3))) );
    reshapedMatrix = math.subset(reshapedMatrix, math.index(math.range(3, 6), 1), matrix.subset(math.index(math.range(3, 6))) );
    
    setA(math.matrix(reshapedMatrix));

    sendCommand("?read:/home/mha/self_fit.cfg");
    sendCommand("cmd=start");
  }, []);

  useEffect(() => {
    // print both state and screen coordinates
    console.log("state: ", coordinates);
    console.log(
      "screen: ",
      toScreenPosition(coordinates, gridSize, gridSize / 2, 0)
    );

    setDotStyle({
      left:
        toScreenPosition(coordinates, gridSize, gridSize / 2, 0).x -
        (62 * gridSize) / 100,
      top:
        toScreenPosition(coordinates, gridSize, gridSize / 2, 0).y -
        gridSize / 8,
      from: { left: 0, top: 0 },
    });
  }, [coordinates]);

  // send command
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (down) {
      intervalId = setInterval(sendGridCommand, 100, a, coordinates, math.matrix([10,10,10,10,10,10]));
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [down]);

  const setCoordinatesFromEvent = (x: number, y:number) => {
    setCoordinates(
      toStatePosition(
        {
          x: x,
          y: y
        },
        gridSize,
        gridSize / 2,
        0
      )
    );
  }

  const handleEnd = () => {
    setCoordinates({
      x: math.round(coordinates.x / 20) * 20,
      y: math.round(coordinates.y / 20) * 20,
    });
    console.log("end")
    setDown(false);
  };

  return (
    <div
      className="grid"
      style={{
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        display: "grid",
        gridTemplateColumns: `repeat(3, 1fr)`,
        gridTemplateRows: `repeat(3, 1fr)`,
        gap: `${gridSize / 75}px ${gridSize / 75}px`,
      }}
      onTouchStart={(e) => {setCoordinatesFromEvent(e.touches[0].clientX, e.touches[0].clientY); setDown(true);}}
      onTouchMove={(e) => {if (down) setCoordinatesFromEvent(e.touches[0].clientX, e.touches[0].clientY)}}
      onTouchEnd={handleEnd}
      
      onMouseDown={(e) => {setCoordinatesFromEvent(e.clientX, e.clientY); setDown(true);}}
      onMouseMove={(e) => {if (down) setCoordinatesFromEvent(e.clientX, e.clientY)}}
      onMouseUp={handleEnd}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100%",
            border: `${gridSize / 150}px solid black`,
            boxSizing: "border-box",
          }}
        />
      ))}
      <div
        className="dot"
        style={{
          position: "absolute",
          width: `${gridSize / 4}px`,
          height: `${gridSize / 4}px`,
          background: "red",
          borderRadius: "50%",
          transitionDuration: "0s",
          ...dotStyle,
        }}
      />
    </div>
  );
};

export default Grid;
