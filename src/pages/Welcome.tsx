import "../styles/Welcome.css";
import ear from "../assets/imgs/Logo.png";
import background from "../assets/imgs/Background.png";
import { NextButton } from "../components/NextButton";


export default function Welcome() {

  return (

      <div

        className="welcome-container"
      >
      <img
          className={"background"}
          src={background}

          alt={"background"}

          

        ></img>

        <img

          src={ear}

          alt={"logo"}

          style={{ maxWidth: 220, marginBottom: -20 }}

        ></img>

        <h2 className="space-top">Self Fitting Hearing Aid</h2>

        <h3></h3>

        <NextButton to="/name" text="Start"/>

      </div>

   

  );

}