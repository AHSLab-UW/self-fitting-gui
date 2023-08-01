import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";

export default function FittingInstruction() {
  return (
    <div>
      <h1 className="title">
        Explore various options on the screen by moving the cursor and select
        their preferred settings, which allows you to listen to the speaker
        clearly without getting disturbed by the background noise.
      </h1>

      <h1 className="title">Start from the edges of the grid to get the feeling</h1>

      <NextButton to="/fit-select" text="Continue" style={{ marginTop: 100 }} />
    </div>
  );
}
