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

type Props = { grid5: boolean; setFinalG: (finalG: math.Matrix) => void;};

const MIN_VOLUME = -15;
const MAX_VOLUME = 15;

export default function Fitting({ grid5 }: Props) {
  const [fitted, setFitted] = useState(false);

  // fititng page
  const [volume, setVolume] = useState(0);
  const [gMatrix, setGMatrix] = useState<number[][]>([]);

  // volume page
  const [gAvg, setGAvg] = useState<math.Matrix>(math.matrix([]));
  const [a, setA] = useState<number[]>([]);
  const [finalG, setFinalG] = useState<math.Matrix>(math.matrix([]));
  const [step, setStep] = useState<math.Matrix>(math.matrix([]));

  useEffect(() => {
    if (fitted) {
      /*

      // use ml-pca to find the eigenvector
      const pca = new PCA(g25Arr);

      // get the eigenvector
      const eigenvector = pca.getEigenvectors();
      console.log("eigenvector", eigenvector);

      // get the first column of the eigenvector
      const maxEigenVector = eigenvector.getColumn(0);
      console.log("maxEigenVector", maxEigenVector);

      setA(maxEigenVector);

      */
    }
  }, [fitted]);

  return !fitted ? (
    <div className="flex-column">
      <div>
        <Grid
          setFitted={setFitted}
          setFinalG={setFinalG}
        />
      </div>

      {/* <div className="top-space"></div>
      <AudioButton stim={stim} /> */}
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

            let finalG = math.add(gAvg, val) as math.Matrix;
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
