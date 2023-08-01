import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";

export default function FittingSelect() {
  return (
    <div>
      <h1 className="pick" style={{ marginTop: 200 }}>Pick 3x3 or 5x5 </h1>
      <NextButton to="/buttons" text="Buttons" />
      <div className="top-space"></div>
      <NextButton to="/grid" text="Grid" style={{ marginTop: 100 }} />
    </div>
  );
}
