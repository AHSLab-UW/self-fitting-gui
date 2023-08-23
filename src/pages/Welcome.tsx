import React, { useState } from "react";
import "../styles/Welcome.css";
import ear from "../assets/imgs/Logo.png";
// import background from "../assets/imgs/waves_background.png";
import background from "../assets/imgs/Welcome Waves.jpg";
import StartMenu from "../components/StartMenu";

function Welcome() {
  const [startMenu, setStartMenu] = useState(false);

  const handleTouchStart = () => {
    setStartMenu(true); // Trigger the fade-in effect with touch
  };

  return (
    
    <div className="welcome-container" onTouchStart={handleTouchStart}>
    <img className={"background"} src={background} alt={"background"} />  

      <img
        src={ear}
        alt={"logo"}
        style={{ maxWidth: 220, marginBottom: -20, marginTop:10 }}
      />

      <StartMenu fadeIn={startMenu} />
      
      <h4 className="bottom">UW Applied Hearing Science Lab</h4>
    </div>
  );
}

export default Welcome;
