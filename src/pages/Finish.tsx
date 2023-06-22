import "../styles/Finish.css";
import smile from "../assets/imgs/Smiling Face Enhanced.png";

/*export default function Finish() {
  return (
    <div className="finish-container">
      <h1>Well Done!</h1>
      <h3>Your device is now ready to use! </h3>
    </div>
  );
}*/

export default function Finish() {
  return (
    <div className="finish-container">
      <div className="image">
        <img src={smile} alt="smiling face" style={{ maxWidth: 310, marginTop: 150 }}></img>
      </div>
      <h1 style={{ marginTop: -590 }}> Well done, thank you!
      </h1>
      <h4>Your device is now ready to use!</h4>
    </div>
  );
}
