import { useState } from "react";

import left from "../assets/videos/left.mp4";
import right from "../assets/videos/right.mp4";

import "../styles/Intro1.css";
import { NextButton } from "../components/NextButton";
import VideoPlayer from "../components/VideoPlayer";

export default function Intro1() {
  const [isLeft, setLeft] = useState(true);

  return (
    <>
      <h3>Select which ear you’d like to start with. Put the hearing aid on your ear and switch it on</h3>
      <div className="player-button-container bottom-space">
        <button className="big-button" style={{ marginRight: 20 }} onClick={() => setLeft(true)}>
          Left Ear
        </button>
        <button className="big-button" onClick={() => setLeft(false)}>Right Ear</button>
      </div>
      
      <VideoPlayer url={isLeft ? left : right} />

      <NextButton style={{ marginTop: 30 }} to="/intro2" text="Next" />
    </>
  );
}
