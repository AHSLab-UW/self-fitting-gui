import Grid from "../components/Grid";
import { NextButton } from "../components/NextButton";
import "../styles/Fitting.css";

type Props = {};

export default function Fitting({}: Props) {
  return (
    <>
      <div>
        <Grid />
      </div>

      <NextButton to="/adjust" text="Next" />
    </>
  );
}
