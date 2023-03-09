import "../styles/Welcome.css";
import ear from "../assets/imgs/ear-03.png";
import background from "../assets/imgs/homepageHand.png";
import { NextButton } from "../components/NextButton";

export default function Welcome() {
  return (
    <div style={{ marginTop: 50 }}>
      <div
        className="welcome-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <img
          src={ear}
          alt={"logo"}
          style={{ maxWidth: 150, marginBottom: 30 }}
        ></img>
        <h2 className="space-top">Self Fitting Hearing Aid</h2>
        <h3></h3>
        <NextButton to="/name" text="Let's Get Started  "/>
      </div>
    </div>
  );
}
