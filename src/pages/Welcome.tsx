import { useEffect, useState } from "react";
import "../styles/Welcome.css";
import ear from "../assets/imgs/New Logo.png";
import background from "../assets/imgs/startMenu.png";
import StartMenu from "../components/StartMenu";

export default function Welcome() {
  const [startMenu, setStartMenu] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartMenu(true);
    }, 2000);
  }, []);

  return (
    <div className="welcome-container">
      <img className={"background"} src={background} alt={"background"}style={{maxHeight: 900}}></img>

      <img
        src={ear}
        alt={"logo"}
        style={{ maxWidth: 225, marginTop: 30 }}
      ></img>

      <StartMenu fadeIn={startMenu} />

      <h4 className="bottom">UW Applied Hearing Science Lab</h4>
    </div>
  );
}
