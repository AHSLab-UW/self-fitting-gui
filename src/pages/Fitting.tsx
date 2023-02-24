import { useState } from "react";
import { AudioMeter } from "../components/AudioMeter";
import Grid from "../components/Grid";
import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";

type Props = {};

const MIN_VOLUME = -25;
const MAX_VOLUME = 25;

export default function Fitting({}: Props) {
  const [volume, setVolume] = useState(MIN_VOLUME);

  return (
    <>
      <div>
        <Grid gainDelta={volume}/>
      </div>

      <div>
        <h3>Adjust Volume</h3>
        <button onClick={() => setVolume(Math.min(MAX_VOLUME, volume - 5))}>Decrease</button>
        <div>
          <AudioMeter val={volume} min={MIN_VOLUME} max={MAX_VOLUME} />
        </div>
        <button onClick={() => setVolume(Math.max(MIN_VOLUME, volume + 5))}>Increase</button>
      </div>

      <NextButton to="/adjust" text="Next" />
    </>
  );
}
