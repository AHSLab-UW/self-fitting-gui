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
  const [gAvg, setGAvg] = useState<math.Matrix>(math.matrix([]));
  const [a, setA] = useState<number[]>([]);
  const [finalG, setFinalG] = useState<math.Matrix>(math.matrix([]));

  useEffect(() => {
    if (fitted) {
      // 30 x 6 number[]
      console.log("gMatrix", gMatrix);

      // get row 5-30
      const gMatrix25 = gMatrix.slice(5);
      console.log("gMatrix25", gMatrix25);

      // convert to math.js matrix
      const gMatrix25Matrix = math.matrix(gMatrix25);
      console.log("gMatrix25Matrix", gMatrix25Matrix);

      // take the average of the gMatrix row 5 - 30 axis 1
      const gAvg = math.mean(gMatrix25Matrix, 0);
      console.log("gAvg", gAvg);

      setGAvg(gAvg);
      setFinalG(gAvg);
      sendG(gAvg);

      // convert math.js matrix to javascript array
      const g25Arr = gMatrix25Matrix.toArray() as number[][];
      console.log("g25Arr", g25Arr);

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
          grid5={grid5}
          gainDelta={volume}
          setNewG={(currG) => {
            // append new g to existing gMatrix
            setGMatrix([...gMatrix, currG.toArray() as number[]]);
          }}
          setFitted={setFitted}
        />
      </div>

      <h3 className="top-space">Press To Adjust Volume</h3>
      <div className="flex-row">
        <button
          className="volume-button"
          onClick={() => setVolume(Math.min(MAX_VOLUME, volume - 2))}
        >
          -
        </button>

        <div className="top-space">
          <AudioMeter val={volume} min={MIN_VOLUME} max={MAX_VOLUME} />
        </div>
        <button
          className="volume-button"
          onClick={() => setVolume(Math.max(MIN_VOLUME, volume + 2))}
        >
          +
        </button>
      </div>
      {/* <div className="top-space"></div>
      <AudioButton stim={stim} /> */}
    </div>
  ) : (
    <>
      <div className="slider-container">
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
          onChange={(val) => {
            // const finalG = math.add(gAvg, math.multiply(a, val)) as math.Matrix;

            const finalG = math.add(gAvg, val) as math.Matrix;
            sendG(finalG);
            setFinalG(finalG);
            console.log("finalG", finalG);
          }}
        />
      </div>
      <p className="adjust-text">
        Well Done! Now one last adjustment please. Move the slider until it
        sounds most comfortable.
      </p>

      <NextButton onclick={() => sendFinalG(finalG)} to="/prompt" text="Next" />
    </>
  );
}
