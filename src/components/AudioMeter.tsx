import { useState, useEffect } from "react";
import "./AudioMeter.css";

interface Props {
  val: number;
  max: number;
}
export const AudioMeter = ({ val, max }: Props) => {
  const [bars, setBars] = useState<string[]>(Array(10));
  useEffect(() => {
    let newBars = [];

    for (var i = 0; i < bars.length; i++) {
      if (val / (max / bars.length) > i) {
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
