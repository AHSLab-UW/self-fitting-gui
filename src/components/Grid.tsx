import { useEffect, useState } from "react";
import { sendStep, sendGridCommand } from "../Command";
import * as math from "mathjs";
import { ProgressBar } from "./ProgressBar";
import { getRandomColor } from "../Colors";

const MAX_STEP = 30;

const RANGE = 30;

interface Props {
  grid5: boolean;
  gainDelta: number;
  setFitted: (fitted: boolean) => void;
  setNewG: (gMatrix: math.Matrix) => void;
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
  xOffset: number,
  yOffset: number,
  range: number = RANGE
) => {
  return {
    x:
      (coordinates.x / range) * (gridSize / 2) +
      getWindowDimensions().width / 2 -
      xOffset,
    y: (coordinates.y / range) * (gridSize / 2) - yOffset,
  };
};

const toStatePosition = (
  coordinates: Coordinates,
  gridSize: number,
  xOffset: number,
  yOffset: number,
  range: number = RANGE
) => {
  const stateX =
    ((coordinates.x + xOffset - getWindowDimensions().width / 2) /
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

const Grid = ({ grid5, gainDelta, setFitted, setNewG }: Props) => {
  const GRID_CALC = (RANGE / (grid5 ? 5 : 3)) * 2;

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
    setGridSize((window.innerWidth / 4.5) * 2);
    setCoordinates({
      x: 0,
      y: 0,
    });

    setA(getCoefficient());

    localStorage.setItem("grid5", grid5 ? "5x5" : "3x3");
  }, []);

  useEffect(() => {
    // set dot position based on state
    const screenPos = toScreenPosition(coordinates, gridSize, 25, grid5 ? -235 : -215);
    setDotStyle({
      left: screenPos.x,
      top: screenPos.y,
    });
  }, [coordinates]);

  // send command
  useEffect(() => {
    let intervalId = setInterval(() => {
      setCurrG(sendGridCommand(a, coordinates, gainDelta, gLast, step));
    }, 100);
    return () => clearInterval(intervalId);
  });

  const setCoordinatesFromEvent = (x: number, y: number) => {
    // set state from screen touch position
    setCoordinates(
      toStatePosition(
        {
          x: x,
          y: y,
        },
        gridSize,
        0,
        -80
      )
    );
  };

  const handleEnd = () => {
    // if negative ceil if positive floor
    let snapX = math.round(coordinates.x / GRID_CALC) * GRID_CALC;
    let snapY = math.round(coordinates.y / GRID_CALC) * GRID_CALC;

    // cap to offset
    snapX = Math.min(Math.max(snapX, (grid5 ? -GRID_CALC * 2 : -GRID_CALC)), (grid5 ? GRID_CALC * 2 : GRID_CALC));
    snapY = Math.min(Math.max(snapY, (grid5 ? -GRID_CALC * 2 : -GRID_CALC)), (grid5 ? GRID_CALC * 2 : GRID_CALC));

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
          gridTemplateColumns: `repeat(${grid5 ? 5 : 3}, 1fr)`,
          gridTemplateRows: `repeat(${grid5 ? 5 : 3}, 1fr)`,
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
        {Array.from({ length: (grid5 ? 25 : 9) }).map((_, index) => (
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
            width: `${gridSize / (grid5 ? 7 : 4)}px`,
            height: `${gridSize / (grid5 ? 7 : 4)}px`,
            background: dotColor,
            borderRadius: "50%",
            ...dotStyle,
          }}
        />
      </div>

      {step < MAX_STEP ? (
        <button
          className="big-button top-space"
          onClick={() => {
            const gFinal = math.add(currG, gainDelta) as math.Matrix
            sendStep(gFinal, step);
            setNewG(gFinal);

            setStep(step + 1);

            setGLast(currG);
            setA(getCoefficient());

            setCoordinates({ x: 0, y: 0 });
            setDotColor(getRandomColor());
          }}
        >
          Next Step
        </button>
      ) : (
        <button className="big-button top-space"
          onClick={() => {
            setFitted(true);
          }}
        >
          Continue
        </button>
      )}
    </>
  );
};

export default Grid;
