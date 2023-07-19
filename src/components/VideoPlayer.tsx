import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { GrRotateRight } from "react-icons/gr";
import ReactPlayer from "react-player";

import "./VideoPlayer.css";

type Props = {
  url: string;
};

export default function VideoPlayer({ url }: Props) {
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);

  const togglePlaying = () => {
    setPlaying(!playing);
  };
  return (
    <>
      <div className="player-container react-player">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          height={"56vh"}
        />
        <div className="player-button-container top-space">
          <button
            className="big-button"
            onClick={togglePlaying}
            style={{ marginRight: 20 }}
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="big-button"
            onClick={() =>
              playerRef.current
                ? playerRef.current?.seekTo(0, "seconds")
                : undefined
            }
          >
            <GrRotateRight />
          </button>
        </div>
      </div>
    </>
  );
}
