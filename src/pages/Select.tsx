import driving from "../assets/imgs/driving.jpg";
import resturant from "../assets/imgs/restaurant.jpg";

import { NextButton } from "../components/NextButton";
import ImageCarousel from "../components/ImageCarousel";

export default function Select() {
  return (
    <>
      <h3>Scroll through the scenes and select the option that best fits</h3>
      <ImageCarousel
        images={[
          { src: driving, alt: "driving" },
          { src: resturant, alt: "resturant" },
        ]}
      />
    </>
  );
}
