import driving from "../assets/imgs/outdoor.png";
import restaurant from "../assets/imgs/indoor.png";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/Select.css";

export default function Select(this: any) {
  return (
    <>
      <h3 className= "selection" style={{ marginTop: 115, marginLeft: -30, marginRight: -30 }}> Swipe and select the scene that best fits </h3>
      <div style={{ position: "relative" }}>
        <ImageCarousel
          images={[
            { src: driving, alt: "outdoor" },
            { src: restaurant, alt: "indoor" }
          ]}
        />
      </div>
    </>
  );
}
