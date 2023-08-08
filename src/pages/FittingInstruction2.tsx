import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";

export default function FittingInstruction() {
  return (
    <div>

      <h1 className="title">
      &#8594; Start adjusting the sound to a confortable level using the slider.
        
      </h1>


      <h1 className="title">
      &#8594; Explore options on the screen by tapping on the buttons.
        
      </h1>

      <h1 className="title">
    
      &#8594; Leave the button active, which allows you to listen to the speaker
        clearly without getting disturbed by the background noise. 
        <p> Then, click "Next".</p>
      </h1>

      <NextButton to="/buttons" text="Continue" style={{ marginTop: 100 }} />
    </div>
  );
}
