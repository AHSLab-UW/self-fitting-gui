import { useState } from "react";

import left from "../assets/videos/Left-side-w-subtitles_compressed.mp4"
import right from "../assets/videos/Right side w subtitles (1).mp4"

import "../styles/Intro1.css";
import { NextButton } from "../components/NextButton";
import VideoPlayer from "../components/VideoPlayer";

export default function Intro1() {
  const [isLeft, setLeft] = useState(true);

  return (
    <>
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
