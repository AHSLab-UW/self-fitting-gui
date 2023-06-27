import { useEffect, useState } from "react";
import { sendStep, sendGridCommand } from "../Command";
import * as math from "mathjs";
import { ProgressBar } from "./ProgressBar";
import { getRandomColor } from "../Colors";

import { AudioMeter } from "../components/AudioMeter";

const MAX_STEP = 30;

const MIN_VOLUME = -15;
const MAX_VOLUME = 15;

const RANGE = 20;

interface Props {
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

const Grid = ({ setFitted, setNewG }: Props) => {
  const GRID_CALC = (RANGE / 5) * 2;

  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [down, setDown] = useState(false);
  const [gridSize, setGridSize] = useState(300);
  const [dotStyle, setDotStyle] = useState({});
  const [dotColor, setDotColor] = useState("#ff0000");

  const [selectedGrid, setSelectedGrid] = useState(-1);

  const [step, setStep] = useState(1);
  const [currG, setCurrG] = useState(math.matrix([0, 0, 0, 0, 0, 0]));
  const [gLast, setGLast] = useState(math.matrix([0, 0, 0, 0, 0, 0]));

  const [volume, setVolume] = useState(0);

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
    setGridSize((window.innerWidth / 2.75) * 2);
    setCoordinates({
      x: 0,
      y: 0,
    });

    setA(getCoefficient());

    localStorage.setItem("grid", "5x5");
  }, []);

  useEffect(() => {
    // set dot position based on state
    const screenPos = toScreenPosition(coordinates, gridSize, 40, -333);
    setDotStyle({
      left: screenPos.x,
      top: screenPos.y,
    });

    let snapX = math.round(coordinates.x / GRID_CALC) * GRID_CALC;
    let snapY = math.round(coordinates.y / GRID_CALC) * GRID_CALC;

    if (snapY < ((-1 * RANGE) / 5) * 3) {
      if (snapX < ((-1 * RANGE) / 5) * 3) {
        setSelectedGrid(0);
      } else if (snapX < (-1 * RANGE) / 5) {
        setSelectedGrid(1);
      } else if (snapX == 0) {
        setSelectedGrid(2);
      } else if (snapX < (RANGE / 5) * 3) {
        setSelectedGrid(3);
      } else {
        setSelectedGrid(4);
      }
    } else if (snapY < (-1 * RANGE) / 5) {
      if (snapX < ((-1 * RANGE) / 5) * 3) {
        setSelectedGrid(5);
      } else if (snapX < (-1 * RANGE) / 5) {
        setSelectedGrid(6);
      } else if (snapX == 0) {
        setSelectedGrid(7);
      } else if (snapX < (RANGE / 5) * 3) {
        setSelectedGrid(8);
      } else {
        setSelectedGrid(9);
      }
    } else if (snapY === 0) {
      if (snapX < ((-1 * RANGE) / 5) * 3) {
        setSelectedGrid(10);
      } else if (snapX < (-1 * RANGE) / 5) {
        setSelectedGrid(11);
      } else if (snapX == 0) {
        setSelectedGrid(12);
      } else if (snapX < (RANGE / 5) * 3) {
        setSelectedGrid(13);
      } else {
        setSelectedGrid(14);
      }
    } else if (snapY < (RANGE / 5) * 3) {
      if (snapX < ((-1 * RANGE) / 5) * 3) {
        setSelectedGrid(15);
      } else if (snapX < (-1 * RANGE) / 5) {
        setSelectedGrid(16);
      } else if (snapX == 0) {
        setSelectedGrid(17);
      } else if (snapX < (RANGE / 5) * 3) {
        setSelectedGrid(18);
      } else {
        setSelectedGrid(19);
      }
    } else {
      if (snapX < ((-1 * RANGE) / 5) * 3) {
        setSelectedGrid(20);
      } else if (snapX < (-1 * RANGE) / 5) {
        setSelectedGrid(21);
      } else if (snapX == 0) {
        setSelectedGrid(22);
      } else if (snapX < (RANGE / 5) * 3) {
        setSelectedGrid(23);
      } else {
        setSelectedGrid(24);
      }
    }
  }, [coordinates]);

  // send command
  useEffect(() => {
    let intervalId = setInterval(() => {
      setCurrG(sendGridCommand(a, coordinates, volume, gLast, step));
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
    snapX = Math.min(Math.max(snapX, -GRID_CALC * 2), GRID_CALC * 2);
    snapY = Math.min(Math.max(snapY, -GRID_CALC * 2), GRID_CALC * 2);

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
          gridTemplateColumns: `repeat(${5}, 1fr)`,
          gridTemplateRows: `repeat(${5}, 1fr)`,
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
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "100%",
              border: `${gridSize / 150}px solid black`,
              boxSizing: "border-box",
              background: index === selectedGrid ? "gray" : "white",
            }}
          />
        ))}

        <div
          className="dot"
          style={{
            position: "fixed",
            width: `${gridSize / 7}px`,
            height: `${gridSize / 7}px`,
            background: dotColor,
            borderRadius: "50%",
            ...dotStyle,
          }}
        />
      </div>

      <h3 className="top-space" style={{ color: "white", marginTop: 20 }}>
        Volume{" "}
      </h3>
      <div className="flex-row">
        <button
          className="volume-button"
          onClick={() => setVolume(Math.min(MAX_VOLUME, volume - 2))}
        >
          -
        </button>

        <div className="top-space">
          <AudioMeter val={volume} min={MIN_VOLUME} max={MAX_VOLUME} />
        </div>
        <button
          className="volume-button"
          onClick={() => setVolume(Math.max(MIN_VOLUME, volume + 2))}
        >
          +
        </button>
      </div>

      {step < MAX_STEP ? (
        <button
          className="big-button top-space"
          onClick={() => {
            const gFinal = math.add(currG, volume) as math.Matrix;
            sendStep(gFinal, step);
            setNewG(gFinal);

            setStep(step + 1);

            setGLast(currG);
            setA(getCoefficient());

            setCoordinates({ x: 0, y: 0 });
            setDotColor(getRandomColor());

            setVolume(0);
          }}
        >
          Next Step
        </button>
      ) : (
        <button
          className="big-button top-space"
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
