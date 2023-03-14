import { useState } from "react";
import AudioButton from "../components/AudioButton";
import { AudioMeter } from "../components/AudioMeter";
import Grid from "../components/Grid";
import Grid5 from "../components/Grid";
import * as math from "mathjs";
import ReactSlider from "react-slider";
import { NextButton } from "../components/NextButton";

import "../styles/Fitting.css";
import "../components/Slider.css";

import stim from "../assets/audio/stimulus.wav";

type Props = { grid5: boolean };

const MIN_VOLUME = -25;
const MAX_VOLUME = 25;

export default function Fitting({ grid5 }: Props) {
  const [volume, setVolume] = useState(MIN_VOLUME);
  const [gMatrix, setGMatrix] = useState<math.Matrix>(math.matrix([]));
  const [fitted, setFitted] = useState(false);

  return !fitted ? (
    <div className="flex-column">
      <div>
        <Grid grid5={grid5} gainDelta={volume} setFitted={setFitted} />
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
        />
      </div>
      <p className="adjust-text">
        Well Done! Now one last adjustment please. Move the slider until it
        sounds most comfortable.
      </p>

      <NextButton to="/prompt" text="Next" />
    </>
  );
}
