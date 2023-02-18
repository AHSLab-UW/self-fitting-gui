import Slider from "../components/ImageSlider";
import shen from "../assets/imgs/shen.jpeg";

import "../styles/Intro1.css";

export default function Intro1() {
  return (
    <div>
      <h1>Intro1</h1>
      <Slider
        images={[
          { src: shen, alt: "shen" },
          { src: shen, alt: "shen" },
        ]}
      />
    </div>
  );
}
