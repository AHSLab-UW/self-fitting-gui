import { FaBatteryFull, FaQuestion } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import "./BottomMenu.css";

interface Props {
  menuCallback: () => void;
  batteryCallback: () => void;
  helpCallback: () => void;
  settingCallback: () => void;
}

function BottomMenu({
  menuCallback,
  batteryCallback,
  helpCallback,
  settingCallback,
}: Props) {
  // if location is "buttons" or "grid", then don't show the bottom menu
  const location = useLocation();
  if (
    location.pathname === "/" ||
    location.pathname === "/buttons" ||
    location.pathname === "/grid"
  ) {
    return null;
  }

  return (
    <div className="bottom-menu">
      <button onClick={() => menuCallback()}>
        <div className="button-icon">
          <BiMenu style={{ marginBottom: 10 }} />
          <div>Menu</div>
        </div>
      </button>
      <button onClick={() => batteryCallback()}>
        <div className="button-icon">
          <FaBatteryFull style={{ marginBottom: 10 }} />
          <div>Battery</div>
        </div>
      </button>
      <button onClick={() => helpCallback()}>
        <div className="button-icon">
          <FaQuestion style={{ marginBottom: 10 }} />
          <div>Help</div>
        </div>
      </button>
      <button onClick={() => settingCallback()}>
        <div className="button-icon">
          <BsGear style={{ marginBottom: 10 }} />
          <div>Setting</div>
        </div>
      </button>
    </div>
  );
}

export default BottomMenu;
