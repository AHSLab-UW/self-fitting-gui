import { useEffect, useState } from "react";
import ButtonLayout, { matrixFormatter, setInitial } from "../components/ButtonLayout";

import * as math from "mathjs";

import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";

import "../styles/Fitting.css";
import "../components/Slider.css";

import { sendStoreFinalStepCommand, sendSetDeviceGainButtonCommand, sendStoreStepCommand } from "../Command";


const MIN_VOLUME = -15;
const MIN_DB = -15;
var MAX_DB = 30;

const MAX_DB_LF = 30;
const MAX_DB_HF = 25;
const blank_table = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[6, 6, 6],
[10, 10, 10]]
let last_arr: number[][] = [];
let final_arr: number[][] = [];
let first_arr: number[][] = [];

export function getLast(arr: number[][]) {
  last_arr = arr;
}

export default function ButtonFitting() {
  const [gAvg, setGAvg] = useState<math.Matrix>(math.matrix([]));
  const [fitted, setFitted] = useState<number>(0);
  const [finalG, setFinalG] = useState<math.Matrix>(math.matrix([]));

  useEffect(() => {
    setInitial(blank_table);
  }, blank_table // Empty dependency array to execute the effect only once
  )

  function firstSlider(){
    sendStoreStepCommand(math.matrix(first_arr), 0)
    setFitted(1);
  }


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
                    if(i < 3){
                      MAX_DB = MAX_DB_LF;
                    }
                    else{
                      MAX_DB = MAX_DB_HF
                    }
                    gain_table[i][j] = Math.min(Math.max(gain_table[i][j] + val, MIN_DB), MAX_DB);
                  }
                }
                console.log("Initial Slider: " + gain_table)
                first_arr = gain_table;
                setInitial(gain_table)
              }}
            />
             <button className={'big-button'}onClick={() => firstSlider()}>Continue</button>
          </div>
        </div>
      )}
      {fitted === 1 && ( 
        <div className="flex-column">
          <div>
            <ButtonLayout setFitted={setFitted} />
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
                  if(i < 3){
                    MAX_DB = MAX_DB_LF;
                  }
                  else{
                    MAX_DB = MAX_DB_HF
                  }
                  gain_table[i][0] = Math.min(Math.max(last_arr[i][0] + val, MIN_DB), MAX_DB)
                  gain_table[i][2] = Math.min(Math.max(last_arr[i][2] + val, MIN_DB), MAX_DB)
                  gain_table[i][1] = Math.min(Math.max((gain_table[i][0] + gain_table[i][2])/2, MIN_DB), MAX_DB)
                }
                console.log("Final Slider: " + gain_table)
                sendSetDeviceGainButtonCommand(matrixFormatter(gain_table));
                final_arr = gain_table
                setFinalG(math.matrix(gain_table))
              }}
            />
          </div>
          <p className="adjust-text" style={{ color: "beige" }}>
            Well Done! Now one last adjustment please. Move the slider until it sounds most comfortable.
          </p>
          <NextButton onclick={() => sendStoreFinalStepCommand(math.matrix(final_arr))} to="/prompt" text="Next" />
        </>
      )}
    </>

  );
  
}