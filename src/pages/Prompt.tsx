import { sendResetDeviceGainCommand } from "../Command";
import { useNavigate } from "react-router-dom";
import { NextButton } from "../components/NextButton";
import "../styles/Prompt.css";

export default function Prompt() {
  let navigate = useNavigate();
  return (
    <div>
      <h3 className="final-prompt" style={{ marginTop: 200 }}>
        Exit the app or customize another scene?
      </h3>

      <button
        className="big-button"
        onClick={() => {
          sendResetDeviceGainCommand();
          navigate("/select");
        }}
      >
        Customize
      </button>
      <div className="top-space"></div>
      <button
        className="big-button"
        style={{ marginTop: 100 }}
        onClick={() => {
          sendResetDeviceGainCommand();
          navigate("/finish");
        }}
      >
        Exit
      </button>
    </div>
  );
}
