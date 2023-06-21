import React, { useState } from 'react';
import './Grid.css';
import { ProgressBar } from "./ProgressBar";
import * as math from "mathjs";
import "./NextButton.css";
import { sendStep } from '../Command';


interface Props {
    setFitted: (fitted: boolean) => void;
    setFinalG: (finalG: math.Matrix) => void;
}

const MAX_STEP = 14;

const Grid = ({setFitted, setFinalG}: Props) => {
  // coordinate determines the gain values for two frequency bands
  const [coordinate, setCoordinate] = useState<[number, number] | null>(null);
  // trial number
  const [trialNum, setTrialNum] = useState<number>(1);
  // array of all 14 gainDelta arrays
  const [gainMatrix, setGainMatrix] = useState<number[][]>(Array(14).fill([0, 0, 0, 0, 0, 0]));
  // current summation of all gainDeltas
  const [aggregateGain, setAggregateGain] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  // total sum of all gainDelta arrays 
  const [showContinue, setShowContinue] = useState<boolean>(false);

  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  const middleClick = () => {
    setCoordinate([0, 0]);
    setLastClickedIndex(3);
  };
  const topRightClick = () => {
    setCoordinate([0, 5]);
    setLastClickedIndex(2);
  };
  const topLeftClick = () => {
    setCoordinate([5, 0]);
    setLastClickedIndex(0);
  };
  const topMiddleClick = () => {
    setCoordinate([5, 5]);
    setLastClickedIndex(1);
  };
  const bottomRightClick = () => {
    setCoordinate([0, -5]);
    setLastClickedIndex(6);
  };
  const bottomLeftClick = () => {
    setCoordinate([-5, 0]);
    setLastClickedIndex(4);
  };
  const bottomMiddleClick = () => {
    setCoordinate([-5, -5]);
    setLastClickedIndex(5);
  };

  const nextStep = () => {
    if (trialNum === 1 || trialNum === 2 || trialNum === 3) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, 0, x, y, 0, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      const updatedAggregateGain = [...aggregateGain];
      for (let i = 0; i < 6; i++) {
        updatedAggregateGain[i] += gainDelta[i];
      }
      setAggregateGain(updatedAggregateGain);
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 4 || trialNum === 5 || trialNum === 6) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, 0, 0, x, y, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      const updatedAggregateGain = [...aggregateGain];
      for (let i = 0; i < 6; i++) {
        updatedAggregateGain[i] += gainDelta[i];
      }
      setAggregateGain(updatedAggregateGain);
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 7 || trialNum === 8 || trialNum === 9) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, 0, 0, 0, x, y];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      const updatedAggregateGain = [...aggregateGain];
      for (let i = 0; i < 6; i++) {
        updatedAggregateGain[i] += gainDelta[i];
      }
      setAggregateGain(updatedAggregateGain);
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 10 || trialNum === 11 || trialNum === 12) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, x, y, 0, 0, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      const updatedAggregateGain = [...aggregateGain];
      for (let i = 0; i < 6; i++) {
        updatedAggregateGain[i] += gainDelta[i];
      }
      setAggregateGain(updatedAggregateGain);
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 13 || trialNum === 14) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [x, y, 0, 0, 0, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      setGainMatrix(updatedGainMatrix);
      const updatedAggregateGain = [...aggregateGain];
      for (let i = 0; i < 6; i++) {
        updatedAggregateGain[i] += gainDelta[i];
      }
      setAggregateGain(updatedAggregateGain);
      if (trialNum === 14) {
        const sumMatrix = updatedGainMatrix.reduce(
          (acc, curr) => curr.map((value, index) => value + acc[index]),
          [0, 0, 0, 0, 0, 0]
        );
        setFinalG(math.matrix(sumMatrix));
        setShowContinue(true);
        setFitted(true); // Add this line to trigger the fitting process
        return;
      }
    }
    sendStep(math.matrix(aggregateGain), trialNum);
    setTrialNum(trialNum + 1);
    setCoordinate([0, 0]);
    setLastClickedIndex(null);
  };

  return (
    <div>
      <ProgressBar steps={MAX_STEP} currentStep={trialNum}/>

      <button className={`grid-button ${lastClickedIndex === 0 ? 'red' : ''}`} onClick={topLeftClick}></button>
      <button className={`grid-button ${lastClickedIndex === 1 ? 'red' : ''}`} onClick={topMiddleClick}></button>
      <div></div>
      <button className={`grid-button ${lastClickedIndex === 2 ? 'red' : ''}`} onClick={topRightClick}></button>
      <button className={`grid-button ${lastClickedIndex === 3 ? 'red' : ''}`} onClick={middleClick}></button>
      <button className={`grid-button ${lastClickedIndex === 4 ? 'red' : ''}`} onClick={bottomLeftClick}></button>
      <div></div>
      <button className={`grid-button ${lastClickedIndex === 5 ? 'red' : ''}`} onClick={bottomMiddleClick}></button>
      <button className={`grid-button ${lastClickedIndex === 6 ? 'red' : ''}`} onClick={bottomRightClick}></button>
      <div className='button-container'>
        {showContinue ? (
          <button onClick={() => setFitted(true)}>Continue</button>
        ) : (
          <button onClick={nextStep} className="big-button">Next Step</button>
        )}
      </div>
    </div>
  );
};

export default Grid;