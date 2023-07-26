import "../styles/SplashScreen.css";

type SplashScreenProps = {
  fadeOut: boolean;
};

const SplashScreen = ({ fadeOut }: SplashScreenProps) => {
  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <h1>Self Fitting Application</h1>
      <h3>Shen Lab 2023</h3>
    </div>
  );
};

export default SplashScreen;
