import { useEffect, useState } from "react";
import Grid from "../components/GridLayout";
// import { MIN_CLIP, MAX_CLIP } from "../components/GridLayout";
import * as math from "mathjs";
import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";
import "../components/Slider.css";
import { sendStoreFinalStepCommand, sendSetDeviceGainButtonCommand } from "../Command";
import { MAX_DB_HF, MAX_DB_LF, MIN_DB, gridMatrixFormatter, matrixFormatter } from "../components/ButtonLayout";

type Props = {};


export default function GridFitting({}: Props) {
  const [fitted, setFitted] = useState(false);

  let gAverage = new math.Matrix();
  // fititng page
  const [gMatrix, setGMatrix] = useState<number[][]>([]);
  sendSetDeviceGainButtonCommand(matrixFormatter([[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [6, 6, 6],
    [10, 10, 10]]))
  // volume page
  const [gAvg, setGAvg] = useState<math.Matrix>(new math.Matrix());
  const [finalG, setFinalG] = useState<math.Matrix>(new math.Matrix());

  useEffect(() => {
    if (fitted) {
      // 30 x 6 number[]
      // get row 5-30
      const gMatrix25 = gMatrix.slice(5);
      // convert to math.js matrix
      const gMatrix25Matrix = math.matrix(gMatrix25);
      // take the average of the gMatrix row 5 - 30 axis 1
      const gAvg = math.mean(gMatrix25Matrix, 0);
      setGAvg(gAvg);
  
      setFinalG(gAvg);
      sendSetDeviceGainButtonCommand(gridMatrixFormatter(gAvg));
      console.log(gAvg)
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
          setFitted={setFitted}
        />
      </div>
    </div>
  ) : (
    <>
      <div className="slider-container top-space">
        <ReactSlider
          className="vertical-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          orientation="vertical"
          pearling
          minDistance={10}
          min={-10}
          max={10}
          invert={true}
          onChange={(val) => {
            let finalG = math.add(gAvg, val) as math.Matrix;


              finalG = math.round(finalG) as math.Matrix;

              for(let i = 0; i < 6; i++){
                if(i < 3){
                  var MAX_db = MAX_DB_LF;
                }
                else{
                  var MAX_db = MAX_DB_HF
                }
                finalG.set([i], Math.min(Math.max(finalG.get([i]), MIN_DB), MAX_db))
            
              }
            // finalG = finalG.map((value) => {
            //   if (value > MAX_CLIP) {
            //     return MAX_CLIP;
            //   } else if (value < -MIN_CLIP) {
            //     return -MIN_CLIP;
            //   } else {
            //     return math.round(value);
            //   }
            // });


            let numArr: number[] = [];
            sendSetDeviceGainButtonCommand(gridMatrixFormatter(finalG));
            setFinalG(finalG);
          }}
        />
      </div>
      <p className="adjust-text">
        Well Done! Now one last adjustment please. Move the slider until it
        sounds most comfortable.
      </p>
        
        {console.log(finalG)}
      <NextButton onclick={() => sendStoreFinalStepCommand(gridMatrixFormatter(finalG))} to="/prompt" text="Next" />
    </>
  );
}
