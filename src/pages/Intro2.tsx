import { NextButton } from "../components/NextButton";
import VideoPlayer from "../components/VideoPlayer";

import position from "../assets/videos/position.mp4";

export default function Intro2() {
  return (
    <>
      <h3>Position yourself for device customization</h3>
      <VideoPlayer url={position} />
      <NextButton style={{ marginTop: 20 }} to="/intro3" text="Next" />
    </>
  );
}
