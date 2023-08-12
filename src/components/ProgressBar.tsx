import "../styles/ProgressBar.css";

interface Props {
  steps: number;
  currentStep: number;
}

export const ProgressBar = ({ steps, currentStep }: Props) => {
  const percentComplete = Math.floor((currentStep / steps) * 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${percentComplete}%` }} />
      <div className="progress-bar-text">{`${percentComplete}% Complete`}</div>
    </div>
  );
};
