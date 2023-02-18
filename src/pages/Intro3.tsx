import { useEffect, useState } from "react";
import { sendCommand } from "../Command";
import { AudioMeter } from "../components/AudioMeter";

export default function Intro3() {
  const [vol, setVol] = useState([0, 0]);
  // get volumn passively every 100ms

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

      console.log(match);

      if (match) {
        const arr = JSON.parse("[" + match[1].replace(/\s/g, ",") + "]");
        setVol(arr);
      } else {
        console.log("No array found in the string.");
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>{vol[0] + "," + vol[1]}</h1>
      <div>
        <AudioMeter val={40} max={40} />
      </div>
    </div>
  );
}
