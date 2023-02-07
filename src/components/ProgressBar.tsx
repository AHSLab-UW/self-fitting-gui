/* 5 step progress bar */

import React, { useState } from 'react';
import './ProgressBar.css';

interface Props {
    step: number;
    currentStep: number;
    handleClick: (steP: number) => void;
    color: string;
}

/* origional Skeleton 
export default function ProgressBar({title}: Props) {
  return (
    <div>
        <button className="coolButton" type="button" value="Submit">{title}</button>
        </div>
  )
}   */


const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="progress-bar">
      <Step
        step={1}
        currentStep={currentStep}
        handleClick={handleClick}
        color="#4CAF50"
      />
      <Step
        step={2}
        currentStep={currentStep}
        handleClick={handleClick}
        color="#2196F3"
      />
      <Step
        step={3}
        currentStep={currentStep}
        handleClick={handleClick}
        color="#F44336"
      />
      <Step
        step={4}
        currentStep={currentStep}
        handleClick={handleClick}
        color="#9C27B0"
      />
      <Step
        step={5}
        currentStep={currentStep}
        handleClick={handleClick}
        color="#E91E63"
      />
    </div>
  );
};

const Step = ({ step, currentStep, handleClick, color } : Props) => {
  const isCurrentStep = (step === currentStep);

  
  return (
    <div
      className={`step ${isCurrentStep ? 'active' : ''}`}
      onClick={() => handleClick(step)}
      style={{ backgroundColor: color }}
    >
      {step}
    </div>
  );
};

export default ProgressBar;



/*const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="progress-bar">
      <Step
        step={1}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        color="#4CAF50"
      />
      <Step
        step={2}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        color="#2196F3"
      />
      <Step
        step={3}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        color="#F44336"
      />
      <Step
        step={4}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        color="#9C27B0"
      />
      <Step
        step={5}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        color="#E91E63"
      />
    </div>
  );
};
type ProgressBar = {
   current: string;
    next: string;
    color: string;

  };
  
const Step: React.FunctionComponent<ProgressBar> = (props) => {
    const {current, next, color} = props;

const Step = ({ step, currentStep, setCurrentStep, color }) => { 
  const isCurrentStep = step === currentStep;

  const handleClick = () => {
    setCurrentStep(step);
  };

  return (
    <div
      className={`step ${isCurrentStep ? 'active' : ''}`}
      onClick={handleClick}
      style={{ backgroundColor: color }}
    >
      {step}
    </div>
  );
};

export default ProgressBar; */

