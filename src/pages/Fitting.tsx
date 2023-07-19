import { useEffect, useState } from "react";
import AudioButton from "../components/AudioButton";
import { AudioMeter } from "../components/AudioMeter";
import Grid, { matrixFormatter, setInitial } from "../components/Grid";

import * as math from "mathjs";
import { PCA } from "ml-pca";

import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";

import "../styles/Fitting.css";
import "../components/Slider.css";

import stim from "../assets/audio/stimulus.wav";
import { sendFinalG, sendG } from "../Command";


const MIN_VOLUME = -15;
const MAX_VOLUME = 15;
const blank_table = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[6, 6, 6],
[10, 10, 10]]
let last_arr: number[][] = [];

export function getLast(arr: number[][]) {
  last_arr = arr;
}

export default function Fitting() {
  const [gAvg, setGAvg] = useState<math.Matrix>(math.matrix([]));
  const [fitted, setFitted] = useState<number>(0);
  const [finalG, setFinalG] = useState<math.Matrix>(math.matrix([]));

  useEffect(() => {
    setInitial(blank_table);
  }, blank_table // Empty dependency array to execute the effect only once
  )

  return (
    <>
      {fitted == 0 && (
        <div>
        <h1>First, slide to a comfortable sound level</h1>
          <div className="slider-container top-space" style={{marginTop: 0}}>
            <ReactSlider
              className="vertical-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              orientation="vertical"
              pearling
              minDistance={15}
              min={-15}
              max={15}
              invert={true}
              onChange={(val) => {
                let gain_table: number[][] = JSON.parse(JSON.stringify(blank_table));
                for(let i = 0; i < gain_table.length; i++){
                  for(let j = 0; j < 3; j++){
                    gain_table[i][j] = Math.min(Math.max(gain_table[i][0] + val, -15), 15);
                  }
                }
                console.log("Initial Slider: " + gain_table)
                setInitial(gain_table)
              }}
            />
             <button className={'big-button'}onClick={() => setFitted(1)}>Continue</button>
          </div>
        </div>
      )}
      {fitted === 1 && (
        <div className="flex-column">
          <div>
            <Grid setFitted={setFitted} />
          </div>
        </div>
      )}
      {fitted === 2 && (
        <>
          <div className="slider-container top-space" style={{ marginTop: 160 }}>
            <ReactSlider
              className="vertical-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              orientation="vertical"
              pearling
              minDistance={15}
              min={-15}
              max={15}
              invert={true}
              onChange={(val) => {
                let gain_table: number[][] = JSON.parse(JSON.stringify(last_arr));
                for(let i = 0; i < blank_table.length; i++){
                  gain_table[i][0] = Math.min(Math.max(last_arr[i][0] + val, -15), 15)
                  gain_table[i][1] = Math.min(Math.max(last_arr[i][1] + val, -15), 15)
                  gain_table[i][2] = Math.min(Math.max(last_arr[i][2] + val, -15), 15)
                }
                console.log("Final Slider: " + gain_table)
                sendG(matrixFormatter(gain_table));
              }}
            />
          </div>
          <p className="adjust-text" style={{ color: "beige" }}>
            Well Done! Now one last adjustment please. Move the slider until it sounds most comfortable.
          </p>
          <NextButton onclick={() => sendFinalG(finalG)} to="/prompt" text="Next" />
        </>
      )}
    </>
  );
  
}
