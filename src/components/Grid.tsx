import React, { useState } from 'react';
import './Grid.css';
import { ProgressBar } from "./ProgressBar";
import * as math from "mathjs";
import "./NextButton.css";
import { getRandomColor } from "../Colors";
import { sendG, sendStep } from '../Command';
import { send } from 'process';
import { getLast } from '../pages/Fitting';

interface Props {
    setFitted: (fitted: number) => void;
}

let trialNum = 1;
var initialGain: number[][] = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]]
let aggregateGain: number[][] = initialGain

const BLANK_TABLE = math.matrix([[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[6, 6, 6],
[10, 10, 10]])
// gainIndex determines which frequency band (1-6) to adjust
const GAIN_INDICES = new Map<number, number[]>([
  [1, [3, 4, 5]], [2, [0, 1, 2]], [3, [3, 4, 5]], [4, [0, 1, 2]], [5, [2, 3]], [6, [4, 5]], [7, [0, 1]],
  [8, [2, 3]], [9, [4, 5]], [10, [0, 1]], [11, [2]], [12, [3]], [13, [4]], [14, [5]], [15, [1]], [16, [0]]
]);
const MAX_STEP = 16;
const DB_GAIN = 5;
// buttons map to different gains
const VALUES = new Map<number, number[]>();
VALUES.set(0, [1, 0.5, 0]);
VALUES.set(1, [1, 1, 1]);
VALUES.set(2, [0, -0.5, -1]);
VALUES.set(3, [0, 0, 0]);
VALUES.set(4, [-1, -1, -1]);
VALUES.set(5, [0, 0.5, 1]);

// displays gain table on front end for debugging purposes
export function gainToString(arr: number[][]): string {
  let str = "";
  let freq = ["250hz: ", "500hz: ", "1khz: ", "2khz: ", "4khz: ", "8khz: "];
  for(let i = 0; i < arr.length; i++){
    str += freq[i];
    str += "[" + arr[i][0] + ", "+ arr[i][1] + ", "+ arr[i][2] + "]";
    str += "\n"
  }
  console.log(str)
  return str;
}

export function setInitial(arr: number[][]){
  initialGain = arr;
  aggregateGain = initialGain
  sendG(matrixFormatter(arr))
}

// accepts a 6x3 2d array and returns it into a 12x19 matrix, properly 
// formatted for hearing aid device
export function matrixFormatter(arr: number[][]): math.Matrix {
  let matrix = BLANK_TABLE
  for(let i = 0; i < 6; i++){
    let left = arr[i][0]
    let mid = arr[i][1]
    let right = arr[i][2]
    for(let j = 0; j < 11; j++){
      matrix.set([i, j], left)
      matrix.set([i + 6, j], left)
    }
    for(let j = 11; j < 15; j++){
      matrix.set([i, j], mid)
      matrix.set([i + 6, j], mid)
    }
    for(let j = 15; j < 19; j++){
      matrix.set([i, j], right)
      matrix.set([i + 6, j], right)
    }
  }
  // console.log("Sending this matrix: " + matrix.toString());
  return matrix
}

const Grid = ({setFitted}: Props) => {
  // random color every trial, starts at red as default
  const [buttonColor, setButtonColor] = useState<string>('red');
  // if user has finished all trials 
  const [showContinue, setShowContinue] = useState<boolean>(false);
  // which option did user click on last, is random to begin
  const [lastClickedIndex, setLastClickedIndex] = useState<number>(3);
  // current summation of all gainDeltas
  // const [aggregateGain, setAggregateGain] = useState<number[][]>(INITIAL_GAIN);
  // when user clicks two different options during the same trial, 
  // we can revert their previous selection by subtracting lastDelta
  const [newGain, setNewGain] = useState<number[][]>(initialGain);


  const gainClick = (index: number, first: boolean): void => {
    setLastClickedIndex(index)
    let gainIndex = GAIN_INDICES.get(trialNum) || [];
    const coords = VALUES.get(index) || [0, 0, 0];
    const delta = [coords[0] * DB_GAIN, coords[2] * DB_GAIN]
    const newGain = JSON.parse(JSON.stringify(aggregateGain));
    for(let i = gainIndex[0]; i <= gainIndex[gainIndex.length - 1]; i++){
      newGain[i][0] += delta[0]
      newGain[i][2] += delta[1]
      newGain[i][1] = (newGain[i][0] + newGain[i][2])/2
    }
    setNewGain(newGain)    
    sendG(matrixFormatter(newGain));
  };

  const nextStep = () => {
    // setAggregateGain(newGain)
    aggregateGain = JSON.parse(JSON.stringify(newGain));;
    sendStep(math.matrix(aggregateGain), trialNum);
    if(trialNum == MAX_STEP){
      setShowContinue(true)
      getLast(aggregateGain);
    }
    trialNum++;
    let randomIndex = Math.floor(Math.random() * 6)
    let randomColor = Math.floor(Math.random() * 5)
    let color = buttonColor
    let colors = ["red", "orange", "green", "purple", "blue"]
    let randColor = colors[randomColor]
    while(randColor == color){
      randColor = colors[Math.floor(Math.random() * 5)]
    }
    setButtonColor(randColor)
    gainClick(randomIndex, true)
  }

  
  return (
    <div>
      <ProgressBar steps={MAX_STEP} currentStep={trialNum}/>

      <button className={`grid-button ${lastClickedIndex === 0 ? (buttonColor) : ''}`} onClick={() =>  gainClick(0, false)}>[1, 0]</button>
      <button className={`grid-button ${lastClickedIndex === 1 ? (buttonColor) : ''}`} onClick={() => gainClick(1, false)}>[1, 1]</button>
      <div></div>
      <button className={`grid-button ${lastClickedIndex === 2 ? (buttonColor) : ''}`} onClick={() => gainClick(2, false)}>[0, -1]</button>
      <button className={`grid-button ${lastClickedIndex === 3 ? (buttonColor) : ''}`} onClick={() => gainClick(3, false)}>[0, 0]</button>
      <button className={`grid-button ${lastClickedIndex === 4 ? (buttonColor) : ''}`} onClick={() => gainClick(4, false)}>[-1, -1]</button>
      <div></div>
      <button id="#5" className={`grid-button ${lastClickedIndex === 5 ? buttonColor : ''}`} onClick={() => gainClick(5, false)}>[0, 1]</button>
      <div className='button-container'>
        {showContinue ? (
          <button className={'big-button'}onClick={() => setFitted(2)}>Continue</button>
        ) : (
          <button onClick={nextStep} className="big-button">Next Step!</button>
        )}
      </div>

      <div className='debugger'>
        <p className='g2s'>
            {gainToString(newGain)}
        </p>
      </div>
    </div>
    
  );
};

export default Grid;

export interface Coordinates { x: number; y: number; }