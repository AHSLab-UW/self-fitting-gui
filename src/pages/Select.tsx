import driving from "../assets/imgs/outdoor.png";
import restaurant from "../assets/imgs/indoor.png";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/Select.css";

export default function Select(this: any) {
  return (
    <>
      <h3 className= "selection" style={{ marginTop: 90, marginLeft: -30, marginRight: -30 }}>
        Swipe and select the scene for which you want to fit your hearing aid </h3>
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
