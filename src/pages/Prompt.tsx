import { sendResetDeviceGainCommand } from "../Command";
import { useNavigate } from "react-router-dom";
import "../styles/Prompt.css";

export default function Prompt() {
  let navigate = useNavigate(); 
  return (
    <div>
      <h3 className="final-prompt" style={{ marginTop: 200 }}>
        Thanks! Now call the examiner for the next procedure!
      </h3>

      <button
        className="big-button-prompt " style={{ marginTop: 50 }}
        onClick={() => {
          sendResetDeviceGainCommand();
          navigate("/select");
        }}
      >
        Customize new scene 
      </button>
      <div className="top-space"></div>
      <button
        className="big-button-prompt "
        style={{ marginTop: 200 }}
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
