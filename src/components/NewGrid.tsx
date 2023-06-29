import React, { useState } from 'react';
import './Grid.css';
import { ProgressBar } from "./ProgressBar";
import * as math from "mathjs";
import "./NextButton.css";


interface Props {
    setFitted: (fitted: boolean) => void;
}

const MAX_STEP = 14;

const NewGrid = ({setFitted}: Props) => {
  const [coordinate, setCoordinate] = useState<[number, number] | null>(null);
  const [trialNum, setTrialNum] = useState<number>(1);
  const [gainMatrix, setGainMatrix] = useState<number[][]>(Array(14).fill([0, 0, 0, 0, 0, 0]));
  const [finalG, setFinalG] = useState<math.Matrix>(math.matrix([0, 0, 0, 0, 0, 0]));
  const [showContinue, setShowContinue] = useState<boolean>(false);

  const middleClick = () => {
    setCoordinate([0, 0]);
  };
  const topRightClick = () => {
    setCoordinate([0, 5]);
  };
  const topLeftClick = () => {
    setCoordinate([5, 0]);
  };
  const topMiddleClick = () => {
    setCoordinate([5, 5]);
  };
  const bottomRightClick = () => {
    setCoordinate([0, -5]);
  };
  const bottomLeftClick = () => {
    setCoordinate([-5, 0]);
  };
  const bottomMiddleClick = () => {
    setCoordinate([-5, -5]);
  };

  const nextStep = () => {
    if (trialNum === 1 || trialNum === 2 || trialNum === 3) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, 0, x, y, 0, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 4 || trialNum === 5 || trialNum === 6) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, 0, 0, x, y, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 7 || trialNum === 8 || trialNum === 9) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, 0, 0, 0, x, y];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 10 || trialNum === 11 || trialNum === 12) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [0, x, y, 0, 0, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      setGainMatrix(updatedGainMatrix);
    }
    if (trialNum === 13 || trialNum === 14) {
      const x = coordinate ? coordinate[0] : 0;
      const y = coordinate ? coordinate[1] : 0;
      const gainDelta = [x, y, 0, 0, 0, 0];
      const updatedGainMatrix = [...gainMatrix];
      updatedGainMatrix[trialNum - 1] = gainDelta;
      setGainMatrix(updatedGainMatrix);
      if (trialNum === 14) {
        const sumMatrix = updatedGainMatrix.reduce(
          (acc, curr) => curr.map((value, index) => value + acc[index]),
          [0, 0, 0, 0, 0, 0]
        );
        setFinalG(math.matrix(sumMatrix));
        setShowContinue(true)
        return;
      }
    }
    setTrialNum(trialNum + 1);
    setCoordinate([0, 0]);
  };

  return (
    <div>
      <ProgressBar steps={MAX_STEP} currentStep={trialNum} />
      <button className="grid-button" onClick={topLeftClick}></button>
      <button className="grid-button" onClick={topMiddleClick}></button>
      <button className="grid-button" onClick={topRightClick}></button>
      <button className="grid-button" onClick={middleClick}></button>
      <button className="grid-button" onClick={bottomLeftClick}></button>
      <button className="grid-button" onClick={bottomMiddleClick}></button>
      <button className="grid-button" onClick={bottomRightClick}></button>
      {showContinue ? (
        <button onClick={() => setFitted(true)}>Continue</button>
      ) : (
        <button onClick={nextStep} className="big-button">Next Step</button>
      )}
    </div>
  );
};

export default NewGrid;
