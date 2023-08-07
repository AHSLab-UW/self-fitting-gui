import { NextButton } from "./NextButton";
import "./StartMenu.css";

type StartMenuProps = {
  fadeIn: boolean;
};

const StartMenu = ({ fadeIn }: StartMenuProps) => {
  return (
    <div className={`start-menu ${fadeIn ? "fade-in" : ""}`}>
      <h3>Hi there!</h3>
      <h3>Let's set up your hearing aid together !</h3>


      <NextButton to="/name" text="Start" />
    </div>
  );
};

export default StartMenu;
