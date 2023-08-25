import { useEffect, useState } from "react";
import Grid from "../components/GridLayout";
import * as math from "mathjs";
import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";
import "../styles/Slider.css";
import Halfway from "../components/Halfway";
import { sendStoreFinalStepCommand, sendSetDeviceGainButtonCommand, sendResetDeviceGainCommand, sendStoreStepCommand } from "../Command";
import { gridMatrixFormatter, MAX_DB_LF, MAX_DB_HF, MIN_DB_LF, MIN_DB_HF } from "../components/ButtonLayout";
import Halfway_grid from "../components/Halfway_grid";

type Props = {};


export default function GridFitting({}: Props) {
  const [fitted, setFitted] = useState(false);

  let gAverage = new math.Matrix();
  // fititng page
  const [gMatrix, setGMatrix] = useState<number[][]>([]);

  // volume page
  const [gAvg, setGAvg] = useState<math.Matrix>(new math.Matrix());
  const [finalG, setFinalG] = useState<math.Matrix>(new math.Matrix());

  const [half, setHalf] = useState(true);

  const handleContinue = () => {
    setHalf(false); // Update the 'half' state when the button is clicked
  }

  useEffect(() => {
    setHalf(false)
    if (fitted) {
      // 30 x 6 number[]
      // get row 5-30
      const gMatrix25 = gMatrix.slice(5);
      // convert to math.js matrix
      const gMatrix25Matrix = math.matrix(gMatrix25);
      // take the average of the gMatrix row 5 - 30 axis 1
      const gAvg = math.round(math.mean(gMatrix25Matrix, 0));
      setGAvg(gAvg);
      setFinalG(gAvg);
      sendSetDeviceGainButtonCommand(gridMatrixFormatter(gAvg));
      sendStoreStepCommand(gAvg, 50);
      //console.log(gAvg)
    }
  }, [fitted]);

  return !fitted ? (

    <div className="flex-column">
      <div>
        <Grid
          appendNextG={(currG) => {
            // append new g to existing gMatrix
            setGMatrix([...gMatrix, currG.toArray() as number[]]);
          }}
          setHalf={ setHalf }
          setFitted={setFitted}
        />
        
      {half && <Halfway_grid fadeIn={true} handleContinue={handleContinue} />}
      </div>
    </div>
  ) : (
    <>
      <h2 className="last-prompt">
        Well Done! Now do one last adjustment with the slider, please. 
      </h2>
      <div className="slider-container top-space">
        <ReactSlider
          className="vertical-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          orientation="vertical"
          pearling
          minDistance={1}
          min={-10}
          max={10}
          invert={true}
          onChange={(val) => {
            let finalG = math.add(gAvg, val) as math.Matrix;
              for(let i = 0; i < 6; i++){
                if(i < 3){
                  var MAX_DB = MAX_DB_LF;
                  var MIN_DB= MIN_DB_LF;}
                else{
                  var MAX_DB = MAX_DB_HF;
                  var MIN_DB = MIN_DB_HF;
                }
                finalG.set([i], Math.min(Math.max(finalG.get([i]), MIN_DB), MAX_DB))
              }
            sendSetDeviceGainButtonCommand(gridMatrixFormatter(finalG));
            setFinalG(finalG);
          }}
        />
      </div>
        
      <NextButton  onclick={ () => 
        {sendStoreFinalStepCommand(finalG);
          sendResetDeviceGainCommand();
          
        }}
      to="/prompt" text="Finish" />
    </>
  );
}
