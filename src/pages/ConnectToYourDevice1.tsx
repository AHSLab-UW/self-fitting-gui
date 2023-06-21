import { useState } from "react";

import left from "../assets/videos/FreeConvert - 3.70 MB.mp4";
import right from "../assets/videos/FreeConvert - 3.70 MB.mp4";

import "../styles/Intro1.css";
import { NextButton } from "../components/NextButton";
import VideoPlayer from "../components/VideoPlayer";

export default function Intro1() {
  const [isLeft, setLeft] = useState(true);

  return (
    <>
      <h3 style={{ marginTop: 40 }}>Select which ear you’d like to start with. Put the hearing aid on your ear and switch it on</h3>
      <div className="player-button-container bottom-space">
        <button className="big-button" style={{ marginRight: 20, marginTop: 15 }} onClick={() => setLeft(true)}>
          Left Ear
        </button>
        <button className="big-button" style={{ marginTop: 15 }} onClick={() => setLeft(false)}>Right Ear</button>
      </div>
      
      <VideoPlayer url={isLeft ? left : right} />
      <NextButton style={{ marginTop: 20 }} to="/intro2" text="Next" />
    </>
  );
}
