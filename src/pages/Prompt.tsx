import { resetG } from "../Command";
import { useNavigate } from "react-router-dom";
import { NextButton } from "../components/NextButton";
import "../styles/Prompt.css";

export default function Prompt() {
  let navigate = useNavigate();
  return (
    <div>
      <h3 className="final-prompt" style={{ marginTop: 200 }}>Would you like to exit the app or customize another scene?</h3>
  
      <button className="big-button" onClick={() => {
        resetG();
        navigate("/select");
      }}>
        Customize
      </button>
      <div className="top-space"></div>
      <button className="big-button" style={{ marginTop: 100 }}onClick={() => {
        resetG();
        navigate("/finish");
      }}>
        Exit
      </button>
    </div>
  );
}
