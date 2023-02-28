import { useEffect, useState } from "react";
import { sendCommand, sendGridCommand } from "../Command";
import * as math from "mathjs";
import { ProgressBar } from "./ProgressBar";
import AudioButton from "./AudioButton";
import stim from "../assets/audio/stimulus.wav";
import { getRandomColor } from "../Colors";

const MAX_STEP = 30;

const RANGE = 30;
const GRID_CALC = (RANGE / 3) * 2;

interface Props {
  gainDelta: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const toScreenPosition = (
  coordinates: Coordinates,
  gridSize: number,
  yOffset: number,
  range: number = RANGE
) => {
  return {
    x:
      (coordinates.x / range) * (gridSize / 2) +
      getWindowDimensions().width / 2 -
      gridSize / 8,
    y: (coordinates.y / range) * (gridSize / 2) - yOffset,
  };
};

const toStatePosition = (
  coordinates: Coordinates,
  gridSize: number,
  yOffset: number,
  range: number = RANGE
) => {
  const stateX =
    ((coordinates.x + gridSize / 8 - getWindowDimensions().width / 2) /
      (gridSize / 2)) *
    range;
  const stateY = ((coordinates.y + yOffset) / (gridSize / 2) - 1) * range;

  // cap x and y to range
  const cappedX = Math.min(Math.max(stateX, -range), range);
  const cappedY = Math.min(Math.max(stateY, -range), range);
  return {
    x: cappedX,
    y: cappedY,
  };
};

const getCoefficient = () => {
  // === Tuning Parameters ===
  // Generate an array of 6 random numbers with mean 0 and standard deviation 1
  let arr = math.random([6], -1, 1);

  // Subtract the mean of the array from each element to make the sum of all elements equal to 0
  let sum = math.sum(arr);
  arr = arr.map((x) => x - sum / 6);

  // Convert the array to a matrix
  let matrix = math.matrix(arr);

  // Reshape the matrix into a 6 x 2 matrix
  let reshapedMatrix = math.zeros([6, 2]);
  reshapedMatrix = math.subset(
    reshapedMatrix,
    math.index(math.range(0, 3), 0),
    matrix.subset(math.index(math.range(0, 3)))
  );
  reshapedMatrix = math.subset(
    reshapedMatrix,
    math.index(math.range(3, 6), 1),
    matrix.subset(math.index(math.range(3, 6)))
  );

  return math.matrix(reshapedMatrix);
};

const Grid = ({ gainDelta }: Props) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [down, setDown] = useState(false);
  const [gridSize, setGridSize] = useState(300);
  const [dotStyle, setDotStyle] = useState({});
  const [dotColor, setDotColor] = useState("#ff0000");

  const [step, setStep] = useState(0);
  const [currG, setCurrG] = useState(math.matrix([0, 0, 0, 0, 0, 0]));
  const [gLast, setGLast] = useState(math.matrix([0, 0, 0, 0, 0, 0]));

  const [a, setA] = useState(
    math.matrix([
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ])
  );

  useEffect(() => {
    setGridSize((window.innerWidth /4.5) * 2);
    setCoordinates({
      x: 0,
      y: 0,
    });

    setA(getCoefficient());

    sendCommand("?read:/home/mha/self_fit.cfg");
    sendCommand("cmd=start");
  }, []);

  useEffect(() => {
    // set dot position based on state
    const screenPos = toScreenPosition(coordinates, gridSize, -178);
    setDotStyle({
      left: screenPos.x,
      top: screenPos.y,
    });
  }, [coordinates]);

  // send command
  useEffect(() => {
    let intervalId = setInterval(
      () => setCurrG(sendGridCommand(a, coordinates, gainDelta, gLast)),
      100
    );
    return () => clearInterval(intervalId);
  });

  const setCoordinatesFromEvent = (x: number, y: number) => {
    // set state from screen touch position
    setCoordinates(
      toStatePosition(
        {
          x: x - 35,
          y: y,
        },
        gridSize,
        -70
      )
    );
  };

  const handleEnd = () => {
    // if negative ceil if positive floor
    let snapX = math.round(coordinates.x / GRID_CALC) * GRID_CALC;
    let snapY = math.round(coordinates.y / GRID_CALC) * GRID_CALC;

    // cap to offset
    snapX = Math.min(Math.max(snapX, -GRID_CALC), GRID_CALC);
    snapY = Math.min(Math.max(snapY, -GRID_CALC), GRID_CALC);

    setCoordinates({
      x: snapX,
      y: snapY,
    });
    setDown(false);
  };

  return (
    <>
      <ProgressBar steps={MAX_STEP} currentStep={step} />

      <div
        className="grid"
        style={{
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          display: "grid",
          gridTemplateColumns: `repeat(3, 1fr)`,
          gridTemplateRows: `repeat(3, 1fr)`,
          gap: `${gridSize / 70}px ${gridSize / 70}px`,
        }}
        onTouchStart={(e) => {
          setCoordinatesFromEvent(e.touches[0].clientX, e.touches[0].clientY);
          setDown(true);
        }}
        onTouchMove={(e) => {
          if (down)
            setCoordinatesFromEvent(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => {
          setCoordinatesFromEvent(e.clientX, e.clientY);
          setDown(true);
        }}
        onMouseMove={(e) => {
          if (down) setCoordinatesFromEvent(e.clientX, e.clientY);
        }}
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
              background: "white",
            }}
          />
        ))}
        
        <div
          className="dot"
          style={{
            position: "fixed",
            width: `${gridSize / 4}px`,
            height: `${gridSize / 4}px`,
            background: dotColor,
            borderRadius: "50%",
            ...dotStyle,
          }}
        />
      </div>
      <AudioButton stim={stim} />

      <button
        className="top-space"
        onClick={() => {
          setStep(step + 1);
          
          setGLast(currG);
          setA(getCoefficient());

          setCoordinates({ x: 0, y: 0 });
          setDotColor(getRandomColor());
        }}
      >
        Next Step
      </button>
    </>
  );
};

export default Grid;
