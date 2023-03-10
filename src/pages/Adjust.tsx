import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";
import "../styles/Adjust.css";

export default function Adjust() {
  return (
    <>
   <br> 
   </br>
   <br> 
   </br>
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
      <p className="adjust-text">
  Well Done! Now one last adjustment please. Move the slider until it sounds
  most comfortable.
</p>

      <NextButton to="/prompt" text="Next" />
    </>
  );
}
