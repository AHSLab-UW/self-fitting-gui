import { useState } from "react";
import AudioButton from "../components/AudioButton";
import { AudioMeter } from "../components/AudioMeter";
import Grid from "../components/Grid";
import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";

import stim from "../assets/audio/stimulus.wav";

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
      <div className="top-space"></div>
      <AudioButton stim={stim} />
    </div>
  );
}
