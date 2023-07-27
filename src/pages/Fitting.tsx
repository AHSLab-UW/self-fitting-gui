import { useEffect, useState } from "react";
import Grid from "../components/Grid";

import * as math from "mathjs";

import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";

import { MIN_CLIP, MAX_CLIP } from "../components/Grid";

import "../styles/Fitting.css";
import "../components/Slider.css";

import { sendStoreFinalStepCommand, sendSetDeviceGainCommand } from "../Command";

type Props = {};


export default function Fitting({}: Props) {
  const [fitted, setFitted] = useState(false);

  // fititng page
  const [gMatrix, setGMatrix] = useState<number[][]>([]);

  // volume page
  const [gAvg, setGAvg] = useState<math.Matrix>(math.matrix([]));
  const [finalG, setFinalG] = useState<math.Matrix>(math.matrix([]));

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
      
      sendSetDeviceGainCommand(gAvg);
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
            finalG = finalG.map((value) => {
              if (value > MAX_CLIP) {
                return MAX_CLIP;
              } else if (value < -MIN_CLIP) {
                return -MIN_CLIP;
              } else {
                return math.round(value);
              }
            });

            sendSetDeviceGainCommand(finalG);
            setFinalG(finalG);
          }}
        />
      </div>
      <p className="adjust-text">
        Well Done! Now one last adjustment please. Move the slider until it
        sounds most comfortable.
      </p>

      <NextButton onclick={() => sendStoreFinalStepCommand(finalG)} to="/prompt" text="Next" />
    </>
  );
}
