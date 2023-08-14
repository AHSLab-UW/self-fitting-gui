import { useEffect, useState } from "react";
import {
  sendStoreStepCommand,
  sendStoreLogCommand,
  sendSetDeviceGainButtonCommand,
} from "../Command";
import * as math from "mathjs";
import { ProgressBar } from "./ProgressBar";
import { getRandomColor } from "../Colors";

import { AudioMeter } from "./AudioMeter";

import "../styles/GridLayout.css";
import { MIN_DB, MAX_DB, gridMatrixFormatter, matrixFormatter, MAX_DB_HF, MAX_DB_LF } from "./ButtonLayout";


const MAX_STEP = 30; //<---- fix this after testing

const MIN_VOLUME = -15;
const MAX_VOLUME = 15;
const RANGE = 15;

// export const MIN_CLIP = 15;
// export const MAX_CLIP = 30;

interface Props {
  setFitted: (fitted: boolean) => void;
  appendNextG: (gMatrix: math.Matrix) => void;
  setHalf: (half: boolean) => void;
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
  arr = arr.map((x) => x - sum);

  let squares1 = 0;
  for(let i = 0; i < arr.length; i++){
    squares1 += (arr[i] * arr[i])
  }
  let result1 = parseFloat(math.sqrt(squares1 / 6).toString())

  arr = arr.map((x) => x  / result1);
  // this part is to see if sum of squares of the variables / 6 =? 1
  // let squares = 0;
  // for(let i = 0; i < arr.length; i++){
  //   squares += ((arr[i]) * (arr[i]))
  // }
  // squares = squares / 6 ;
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
  console.log("A : ", reshapedMatrix)
  return math.matrix(reshapedMatrix);
};

const Grid = ({ setFitted, appendNextG, setHalf }: Props) => {
  const GRID_CALC = (RANGE / 5) * 2;

  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [prevG, setPrevG] = useState<math.Matrix | null>(null); // Store the previous coord


  const [explored_set, setExploredSet] = useState<Set<Number>>(new Set);
  const [down, setDown] = useState(false);
  const [gridSize, setGridSize] = useState(300);
  const [dotStyle, setDotStyle] = useState({});
  const [dotColor, setDotColor] = useState("#ff0000");

  const [selectedGrid, setSelectedGrid] = useState(-1);

  const [step, setStep] = useState(1);
  const [currG, setCurrG] = useState(math.matrix([0, 0, 0, 0, 6, 10]));
  const [gLast, setGLast] = useState(math.matrix([0, 0, 0, 0, 6, 10]));

  const [volume, setVolume] = useState(0);

  const [a, setA] = useState(
    math.matrix([
      [1, 0],
      [1, 0],
      [1, 0],
      [0, 1],
      [0, 1],
      [0, 1],
    ])
  );

  const snapToGrid = (coordinates: Coordinates): Coordinates => {
    // if negative ceil if positive floor
    let snapX = math.round(coordinates.x / GRID_CALC) * GRID_CALC;
    let snapY = math.round(coordinates.y / GRID_CALC) * GRID_CALC;

    // cap to offset
    snapX = Math.min(Math.max(snapX, -GRID_CALC * 2), GRID_CALC * 2);
    snapY = Math.min(Math.max(snapY, -GRID_CALC * 2), GRID_CALC * 2);

    return { x: snapX, y: snapY };
  }

  useEffect(() => {
    setGridSize(window.innerWidth / 1.4); // <--- GRID SIZE ADJUSTMENT !!
    setCoordinates({
      x: 0,
      y: 0,
    });
    setExploredSet(explored_set.add(selectedGrid));

    // setA(getCoefficient());
  }, []);

  useEffect(() => {
    // set dot position based on state
    const screenPos = toScreenPosition(
      coordinates,
      gridSize,
      48,
      -365 /* y offset for position of circle*/
    );
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

      const snapCoordinate = snapToGrid(coordinates);
      
      const coord = math.matrix([[snapCoordinate.x], [snapCoordinate.y]]);
      const b = math.multiply(a, coord); 
      const flattenedB = [];
        for (let i = 0; i < b.size()[0]; i++) {
          for (let j = 0; j < b.size()[1]; j++) {
            flattenedB.push(b.get([i, j]));
          }
        }
       
      let gSelect = math.add(flattenedB, gLast);
      let g = math.add(gSelect, volume) as math.Matrix;
  
        // round to integer
      g = math.round(g) as math.Matrix;
        // clipping min max
      for(let i = 0; i < 6; i++){
           if(i < 3){var MAX_db = MAX_DB_LF;}
           else{var MAX_db = MAX_DB_HF}
          g.set([i], Math.min(Math.max(g.get([i]), MIN_DB), MAX_DB))
        }
      setCurrG(g);  

      if (prevG !== null && math.deepEqual(g, prevG)) {

      }
      else{
        sendStoreLogCommand(a, snapCoordinate, volume, currG, gLast, step);
        sendSetDeviceGainButtonCommand(gridMatrixFormatter(g));
      }

      setPrevG(g);
    }, 20);
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
        -120 /* y offset of picking up red cursor */
      )
    );
    setExploredSet(explored_set.add(selectedGrid));
  };

  const handleEnd = () => {
    const snapCoordinates = snapToGrid(coordinates);
    setCoordinates(snapCoordinates);
    setExploredSet(explored_set.add(selectedGrid));
    setDown(false);
  };

  const nextStep = () => {
    if(explored_set.size < 6){ //<---minimum exploration : set the color below as well!
      return
    }
    sendStoreStepCommand(currG, step);
    appendNextG(currG);
    // console.log("curr a", a);
    // console.log("g last: ", gLast);
    const snap = snapToGrid(coordinates);
    console.log("snap coordinate", snap);

    setGLast(currG);
    setA(getCoefficient());

    setCoordinates({ x: 0, y: 0 });
    setExploredSet(new Set);
    setDotColor(getRandomColor());
    setStep(step + 1);
    if(step == ((MAX_STEP/2) - 1)){
    setHalf(true);
    }
    setVolume(0);
  };

  return (
    <>
      <ProgressBar steps={MAX_STEP} currentStep={step} />
      <p className="instructions"> Drag the cursor to explore each location. </p>
      <p className="instructions2"> Choose the one that sounds the best for you!</p>
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
          setExploredSet(explored_set.add(selectedGrid));
          setDown(true);
        }}
        onTouchMove={(e) => {
          if (down)
            setCoordinatesFromEvent(e.touches[0].clientX, e.touches[0].clientY);
            setExploredSet(explored_set.add(selectedGrid));
        }}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => {
          setCoordinatesFromEvent(e.clientX, e.clientY);
          setExploredSet(explored_set.add(selectedGrid));
          setDown(true);
        }}
        onMouseMove={(e) => {
          if (down) setCoordinatesFromEvent(e.clientX, e.clientY);
          setExploredSet(explored_set.add(selectedGrid));
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
            width: `${gridSize / 6}px`,
            height: `${gridSize / 6}px`,
            background: dotColor,
            borderRadius: "50%",
            ...dotStyle,
          }}
        />
      </div>

      <div className="frame-container">
        <h3 className="volume_control" style={{ color: "#ffd56a", marginTop: 10, marginBottom: 15 }}>
          Volume Control{" "}
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
      </div>
      {step < MAX_STEP ? (
        
        <button onClick={nextStep} className="big-button-grid" style={{ backgroundColor: explored_set.size > 6 ? "#F3B71B" : "#808080" }}>Next</button>
        
      ) : (
        <button
          className="grid-continue"
          onClick={() => {
            nextStep();
            setFitted(true);
          }}
          style={{backgroundColor: explored_set.size > 6 ? "#F3B71B" : "#808080" }}
        >
          Continue
        </button>
      )}
    </>
  );
};

export default Grid;
