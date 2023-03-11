import { NextButton } from "../components/NextButton";

export default function FittingSelect() {
  return (
    <div>
      <h1>Pick 3x3 or 5x5</h1>
      <NextButton to="/fit" text="3 by 3" />
      <div className="top-space"></div>
      <NextButton to="/fit5" text="5 by 5" />
    </div>
  );
}
