import { useState, useEffect } from "react";
import { FaBatteryFull, FaQuestion } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

import "./BottomMenu.css";

// menu callbacks
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
  return (
    <div className={"bottom-menu"}>
      <button onClick={() => menuCallback()}>
        <div className="button-icon">
          <BiMenu size={20} style={{ marginBottom: 10 }} />
          <div>Menu</div>
        </div>
      </button>
      <button onClick={() => batteryCallback()}>
        <div className="button-icon">
          <FaBatteryFull size={20} style={{ marginBottom: 10 }} />
          <div>Battery</div>
        </div>
      </button>
      <button onClick={() => helpCallback()}>
        <div className="button-icon">
          <FaQuestion size={20} style={{ marginBottom: 10 }} />
          <div>Help</div>
        </div>
      </button>
      <button onClick={() => settingCallback()}>
        <div className="button-icon">
          <BsGear size={20} style={{ marginBottom: 10 }} />
          <div>Setting</div>
        </div>
      </button>
    </div>
  );
}

export default BottomMenu;
