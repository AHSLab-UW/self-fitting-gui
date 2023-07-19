import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";
import { useState } from "react";
import math from "mathjs";
import { sendFirstUpdateG } from "../Command";
import React from "react";
import { setInitial } from "../components/Grid";
const blank_table = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
[6, 6, 6],
[10, 10, 10]]

export default function InitialAdjustment() {
  setInitial(blank_table)
  return (
    <div>
      <h1>First, slide to a comfortable sound level</h1>
        <div className="slider-container top-space" style={{marginTop: 0, marginRight: 200}}>
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
              let gain_table: number[][] = []
              for(let i = 0; i < blank_table.length; i++){
                gain_table[i] = []; // Initialize each row as an empty array
                for(let j = 0; j < 3; j++){
                  gain_table[i][j] = Math.min(Math.max(blank_table[i][j] + val, -15), 15);
                }
              }
              console.log(gain_table)
              setInitial(gain_table)
            }}
          />
        </div>
      </div>
    );
  }
