import { useEffect, useState } from "react";
import { sendCommand } from "../Command";
import AudioButton from "../components/AudioButton";
import { AudioMeter } from "../components/AudioMeter";
import { NextButton } from "../components/NextButton";
import stim from "../assets/audio/stimulus.wav";

export default function Intro3() {
  const [vol, setVol] = useState([0, 0]);
  const [runningAverage, setRunningAverage] = useState<number[]>([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    intervalId = setInterval(async () => {
      const raw = await sendCommand("mha.calib_in.rmslevel?");
      if (raw === undefined) {
        return [-1, -1];
      }

      const data = await raw.text();

      const regex = new RegExp(/\[(.*?)\]/);
      const match = regex.exec(data);

      if (match) {
        const arr = JSON.parse("[" + match[1].replace(/\s/g, ",") + "]");

        // Calculate the running average of the past 10 numbers
        const newRunningAverage = [
          ...runningAverage,
          (arr[0] + arr[1]) / 2,
        ].slice(-10);
        const sum = newRunningAverage.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
        const average = sum / newRunningAverage.length;
        setAverage(average);
        setRunningAverage(newRunningAverage);

        setVol(arr);
      } else {
        console.log("No array found in the string.");
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const renderNotif = () => {
    if (average < 40) {
      return <h3>"You are too quiet. Please raise your phone volume."</h3>;
    } else if (average > 80) {
      return <h3>"You are too loud. Please lower your phone volume."</h3>;
    } else {
      return <h3>Perfect! Your volume is at a good level!</h3>;
    }
  };

  return (
    <>
      <h3>{renderNotif()}</h3>
      <h1>{average}</h1>
      <div>
        <AudioMeter
          val={Math.min((vol[0] + vol[1]) / 2, 100)}
          min={20}
          max={100}
        />
      </div>
      <AudioButton stim={stim} />
      <NextButton to="/select" text="Next" />
    </>
  );
}
