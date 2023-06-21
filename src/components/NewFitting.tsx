import { useEffect, useState } from "react";
import AudioButton from "../components/AudioButton";
import { AudioMeter } from "../components/AudioMeter";
import Grid from "../components/Grid";

import * as math from "mathjs";
import { PCA } from "ml-pca";

import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";

import "../styles/Fitting.css";
import "../components/Slider.css";

import stim from "../assets/audio/stimulus.wav";
import { sendFinalG, sendG } from "../Command";

type Props = { grid5: boolean };

const MIN_VOLUME = -15;
const MAX_VOLUME = 15;

export default function Fitting({ grid5 }: Props) {
  const [fitted, setFitted] = useState(false);

  // fititng page
  const [volume, setVolume] = useState(0);
  const [gMatrix, setGMatrix] = useState<number[][]>([]);

  // volume page

  const [finalG, setFinalG] = useState<math.Matrix>(math.matrix([]));

  useEffect(() => {
    if (fitted) {
      // 14 x 6 number[]
      console.log("gMatrix", gMatrix);

      // convert to math.js matrix
      const gMatrixMatrix = math.matrix(gMatrix);
      console.log("gMatrixMatrix", gMatrixMatrix);


      setFinalG(gMatrixMatrix);

      // convert math.js matrix to javascript array
      const gArr = gMatrixMatrix.toArray() as number[][];
      console.log("gArr", gArr);

    }
  }, [fitted]);

  return !fitted ? (
    <div className="flex-column">
      <div>
        <Grid
          grid5={grid5}
          gainDelta={volume}
          setNewG={(currG) => {
            // append new g to existing gMatrix
            setGMatrix([...gMatrix, currG.toArray() as number[]]);
          }}
          setFitted={setFitted}
        />
      </div>
    </div>
  ) : (
    <>
      <div className="slider-container top-space" style={{marginTop: 160}}>
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
            // const finalG = math.add(gAvg, math.multiply(a, val)) as math.Matrix;

            let finalG = math.add(gMatrix, val) as math.Matrix;
            finalG = finalG.map((value) => {
              if (value > 20) {
                return 20;
              } else if (value < -15) {
                return -15;
              } else {
                return value;
              }
            });

            sendG(finalG);
            setFinalG(finalG);
            console.log("finalG", finalG);
          }}
        />
      </div>
      <p className="adjust-text" style={{color: "beige"}}>
        Well Done! Now one last adjustment please. Move the slider until it
        sounds most comfortable.
      </p>

      <NextButton onclick={() => sendFinalG(finalG)} to="/prompt" text="Next" />
    </>
  );
}
