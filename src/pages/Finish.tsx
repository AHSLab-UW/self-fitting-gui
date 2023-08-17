import "../styles/Finish.css";
import check from "../assets/imgs/check.png";
import background from "../assets/imgs/waves_background.png";


function Finish() {
  return (
    <div className="finish-container">
       {/* <img className={"background"} src={background} alt={"background"} /> */}

      <h1 style={{ marginTop: 0 }}> Cheers! </h1>
      <h3>Your device is now ready to use!</h3>

      <img src={check} alt="confirmation" style={{ width:250, marginTop: 50 }}></img>


    </div>
  );
}
export default Finish