import "../styles/Welcome.css";
import ear from "../assets/imgs/ear-03.png";
import background from "../assets/imgs/homepageHand.png";
import { NextButton } from "../components/NextButton";

export default function Welcome() {
  return (
    <div style={{ marginTop: 50 }}>
      <img
        src={ear}
        alt={"logo"}
        style={{ maxWidth: 150, marginBottom: 30 }}
      ></img>
     
     <div
      className="welcome-container"
      style={{ backgroundImage: `url(${background})` }}
    >
  <h1>Self Fitting Hearing Aid</h1>
      <h3>Let's get started!</h3>
      <NextButton
        to="/name"
        text="Next"
      />
    </div>
  
    
    </div>
  );
}