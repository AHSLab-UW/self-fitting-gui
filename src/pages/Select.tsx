
import driving from "../assets/imgs/driving.jpg";
import restaurant from "../assets/imgs/restaurant.jpg";
import ImageCarousel from "../components/ImageCarousel";
import { sendG } from "../Command";
import * as math from "mathjs";
import { send } from "vite";
import { useState } from "react";
import getInitial from "../components/ButtonLayout";
import setAggregateGain from "../components/ButtonLayout";

export default function Select(this: any) {
  return (
    <>
      <h3 style={{marginTop: 100}}>Scroll through the scenes and select the option that best fits</h3>
      <div style={{ position: "relative" }}>
        <ImageCarousel
          images={[
            { src: driving, alt: "driving" },
            { src: restaurant, alt: "restaurant" }
          ]}
        />
      </div>
    </>
  );
}
