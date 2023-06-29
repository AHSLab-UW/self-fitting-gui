import React, { useState } from 'react';
import './Grid.css';
import { ProgressBar } from "./ProgressBar";
import * as math from "mathjs";
import "./NextButton.css";
import { sendG, sendStep } from '../Command';

interface Props {
    setFitted: (fitted: boolean) => void;
    setFinalG: (finalG: math.Matrix) => void;
}

const MAX_STEP = 14;

const Grid = ({setFitted, setFinalG}: Props) => {
  // coordinate determines the gain values for two frequency bands
  const [coordinate, setCoordinate] = useState<number[]>([0, 0]);
  // trial number
  const [trialNum, setTrialNum] = useState<number>(1);
  // current summation of all gainDeltas
  const [aggregateGain, setAggregateGain] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  // total sum of all gainDelta arrays 
  const [showContinue, setShowContinue] = useState<boolean>(false);
  // which option did user click on last
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(3);
  
  const gainClick = (index: number): void => {
    if(lastClickedIndex != index){
      setLastClickedIndex(index)
      const values = new Map<number, number[]>();
      values.set(0, [10, 0]);
      values.set(1, [10, 10]);
      values.set(2, [0, 10]);
      values.set(3, [0, 0]);
      values.set(4, [-10, 0]);
      values.set(5, [-10, -10]);
      values.set(6, [10, 10]);
      const coords = values.get(lastClickedIndex || 3) || [0, 0];
      setCoordinate(coords)
      const deltas = new Map<number, number[]>();
      if(coordinate != null){
        deltas.set(1, [0, 0, coordinate[0], coordinate[1], 0, 0]);
        deltas.set(2, [0, 0, coordinate[0], coordinate[1], 0, 0]);
        deltas.set(3, [0, 0, coordinate[0], coordinate[1], 0, 0]);
        deltas.set(4, [0, 0, 0, coordinate[0], coordinate[1], 0]);
        deltas.set(5, [0, 0, 0, coordinate[0], coordinate[1], 0]);
        deltas.set(6, [0, 0, 0, coordinate[0], coordinate[1], 0]);
        deltas.set(7, [0, 0, 0, 0, coordinate[0], coordinate[1]]);
        deltas.set(8, [0, 0, 0, 0, coordinate[0], coordinate[1]]);
        deltas.set(9, [0, 0, 0, 0, coordinate[0], coordinate[1]]);
        deltas.set(10, [0, coordinate[0], coordinate[1], 0, 0, 0]);
        deltas.set(11, [0, coordinate[0], coordinate[1], 0, 0, 0]);
        deltas.set(12, [0, coordinate[0], coordinate[1], 0, 0, 0]);
        deltas.set(13, [0, coordinate[0], coordinate[1], 0, 0, 0]);
        deltas.set(14, [0, coordinate[0], coordinate[1], 0, 0, 0]);
      }
      var gainDelta = deltas.get(trialNum);
      if(gainDelta == undefined){
        gainDelta = [0, 0, 0, 0 ,0, 0]
      }
      const updatedAggregateGain = [...aggregateGain];
      for (let i = 0; i < 6; i++) {
        updatedAggregateGain[i] += gainDelta[i];
      }
      setAggregateGain(updatedAggregateGain);
      sendG(math.matrix(aggregateGain));
    }
  };

  const nextStep = () => {
    sendStep(math.matrix(aggregateGain), trialNum);
    if(trialNum == 14){
      setShowContinue(true)
    }
    else{
      setTrialNum(trialNum + 1);
      setCoordinate([0, 0]);
      setLastClickedIndex(3);
    }
  }
  
  return (
    <div>
      <ProgressBar steps={MAX_STEP} currentStep={trialNum}/>

      <button className={`grid-button ${lastClickedIndex === 0 ? 'red' : ''}`} onClick={() => gainClick(0)}></button>
      <button className={`grid-button ${lastClickedIndex === 1 ? 'red' : ''}`} onClick={() => gainClick(1)}></button>
      <div></div>
      <button className={`grid-button ${lastClickedIndex === 2 ? 'red' : ''}`} onClick={() => gainClick(2)}></button>
      <button className={`grid-button ${lastClickedIndex === 3 ? 'red' : ''}`} onClick={() => gainClick(3)}></button>
      <button className={`grid-button ${lastClickedIndex === 4 ? 'red' : ''}`} onClick={() => gainClick(4)}></button>
      <div></div>
      <button className={`grid-button ${lastClickedIndex === 5 ? 'red' : ''}`} onClick={() => gainClick(5)}></button>
      <button className={`grid-button ${lastClickedIndex === 6 ? 'red' : ''}`} onClick={() => gainClick(6)}></button>
      <div className='button-container'>
        {showContinue ? (
          <button onClick={() => setFitted(true)}>Continue</button>
        ) : (
          <button onClick={nextStep} className="big-button">Next Step!</button>
        )}
      </div>
    </div>
  );
};

export default Grid;

export interface Coordinates { x: number; y: number; }