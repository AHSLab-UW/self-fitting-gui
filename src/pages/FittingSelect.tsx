import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";

export default function FittingSelect() {
  return (
    <div>
      <h1 className="pick" style={{ marginTop: 200 }}>
        Choose the user interface{" "}
      </h1>
      <NextButton
        onclick={() => {
          localStorage.setItem("fitType", "button");
        }}
        to="/buttons"
        text="Buttons"
      />
      <div className="top-space"></div>
      <NextButton
        onclick={() => {
          localStorage.setItem("fitType", "grid");
        }}
        to="/fit-instruct"
        text="Grid"
        style={{ marginTop: 100 }}
      />
    </div>
  );
}
