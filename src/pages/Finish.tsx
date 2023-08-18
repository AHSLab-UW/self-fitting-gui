import "../styles/Finish.css";
import check from "../assets/imgs/check.png";
import ebackground from "../assets/imgs/Exit Waves.jpg";


function Finish() {
  return (
    <div className="finish-container">
      <img className={"background"} src={ebackground} alt={"ebackground"} /> 

      <h1 style={{ marginTop: -180 }}> Congratulations! </h1>
      <h3>Your device is now ready to use!</h3>

      <img src={check} alt="confirmation" style={{ width:220, marginTop: -20 }}></img>

    </div>
  );
}
export default Finish