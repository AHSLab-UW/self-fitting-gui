import Grid from "../components/Grid";
import "../styles/Fitting.css";
import AudioButton from "../components/AudioButton";
import { NextButton } from "../components/NextButton";

type Props = {};

export default function Fitting({}: Props) {
  return (
    <div>
      <Grid />
      <AudioButton />
      <NextButton to="/adjust" text="Next" />
    </div>
  );
}
