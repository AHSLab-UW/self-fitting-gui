import { useState } from "react";
import { AudioMeter } from "../components/AudioMeter";
import Grid from "../components/Grid5";
import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";

type Props = {};

const MIN_VOLUME = -25;
const MAX_VOLUME = 25;

export default function Fitting({}: Props) {
  const [volume, setVolume] = useState(MIN_VOLUME);

  return (
    <div className="flex-column">
      <div>
        <Grid gainDelta={volume} />
      </div>

      <h3>Press To Adjust Volume</h3>
      <div className="flex-row">
        <button
          className="volume-button"
          onClick={() => setVolume(Math.min(MAX_VOLUME, volume - 5))}
        >
          -
        </button>

        <div>
          <AudioMeter val={volume} min={MIN_VOLUME} max={MAX_VOLUME} />
        </div>
        <button
          className="volume-button"
          onClick={() => setVolume(Math.max(MIN_VOLUME, volume + 5))}
        >
          +
        </button>
      </div>

      <NextButton to="/adjust" text="Next" />
    </div>
  );
}


