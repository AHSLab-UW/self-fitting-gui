import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";
import "../styles/Adjust.css";

export default function Adjust() {
  return (
    <>
      <h3>
        Well Done! Now one last adjustment please. Move the slider until it
        sounds most comfortable.
      </h3>

      <div className="slider-container">
        <ReactSlider
          className="vertical-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          orientation="vertical"
          pearling
          minDistance={10}
        />
      </div>

      <NextButton to="/prompt" text="Next" />
    </>
  );
}
