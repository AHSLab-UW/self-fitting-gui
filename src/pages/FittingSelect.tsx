import { NextButton } from "../components/NextButton";
import "../styles/FittingSelect.css";

export default function FittingSelect() {
  return (
    <div>
      <h1 className="pick" style={{ marginTop: 200 }}>Pick 3x3 or 5x5 </h1>
      <NextButton to="/fit" text="3 by 3" />
      <div className="top-space"></div>
      <NextButton to="/fit5" text="5 by 5" style={{ marginTop: 100 }} />
    </div>
  );
}
