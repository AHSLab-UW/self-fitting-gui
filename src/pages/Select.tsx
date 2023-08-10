import outdoor from "../assets/imgs/Noisy Outdoor 72%.jpg";
import indoor from "../assets/imgs/Noisy Indoor 75%.jpg";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/Select.css";

export default function Select(this: any) {
  return (
    <>
      <h3 className= "selection" style={{ marginTop: 115, marginLeft: -40, marginRight: -40 }}> Swipe and select the scene that best fits </h3>
      <div style={{ position: "relative" }}>
        <ImageCarousel
          images={[
            { src: outdoor, alt: "people walking outside"},
            { src: indoor, alt: "restaurant" }
          ]}
        />
      </div>
    </>
  );
}
