import { NextButton } from "../components/NextButton";

export default function Prompt() {
  return (
    <div>
      <h3>Would you like to exit the app or customize another scene?</h3>
      <NextButton to="/select" text="Customize" />
      <div className="top-space"></div>
      <NextButton to="/finish" text="Exit" />
    </div>
  );
}
