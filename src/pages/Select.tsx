import driving from "../assets/imgs/New Driving.jpg";
import restaurant from "../assets/imgs/New Restaurant.jpg";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/Select.css";

export default function Select(this: any) {
  return (
    <>
      <h3 className= "selection" style={{ marginTop: 115, marginLeft: -30, marginRight: -30 }}> Swipe and select the scene that best fits </h3>
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
