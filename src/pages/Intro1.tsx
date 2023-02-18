import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Slider from "../components/ImageSlider";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrRotateRight } from "react-icons/gr";
import shen from "../assets/imgs/shen.jpeg";
import demo from "../assets/videos/demo.mp4";

import "../styles/Intro1.css";

export default function Intro1() {
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <h1>Intro1</h1>
      <Slider
        images={[
          { src: shen, alt: "shen" },
          { src: shen, alt: "shen" },
        ]}
      />
      <div className="player-container">
        <ReactPlayer ref={playerRef} url={demo} playing={playing} />
        <button className="big-button" onClick={togglePlaying}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>

        <button className="big-button" onClick={() => playerRef.current ? playerRef.current?.seekTo(0, "seconds") : undefined}>
          <GrRotateRight />
        </button>
      </div>
    </div>
  );
}
