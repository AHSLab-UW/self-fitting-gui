import { useState, useEffect } from "react";
import "./AudioMeter.css";

interface Props {
  val: number;
  min: number;
  max: number;
}
export const AudioMeter = ({ val, min = 0, max }: Props) => {
  const [bars, setBars] = useState<string[]>(Array(15));
  useEffect(() => {
    let newBars = [];

    for (var i = 0; i < bars.length; i++) {
      if ((val - min) / ((max - min) / bars.length) > i) {
        newBars.push("on");
      } else {
        newBars.push("off");
      }
    }

    setBars(newBars);
  });

  return (
    <div className="audio-progress">
      {bars.map((bar, index) => {
        return (
          <div key={index} className={`bar-${bar} bar-${bar}-${index}`}></div>
        );
      })}
    </div>
  );
};
