import "./CollapsingSidebar.css";
import closeIcon from "../assets/imgs/close.png";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/Blue New Logo.png"

interface Props {
  open: boolean;
  closeModal: Function;
}

const CollapsingSidebar = (props: Props) => {
  let className = "sidebar";
  if (props.open) {
    className += " open";
  }

  return (
    <div className={className}>
      <div className="sidebar-header" style={{ marginTop: 30}}>
        {localStorage.getItem("name") ? localStorage.getItem("name") : "[Name]"}{" "}
        {localStorage.getItem("scene")
          ? localStorage.getItem("scene")
          : "[Scene]"}{" "}
        {localStorage.getItem("fitType") ? localStorage.getItem("fitType") : "[fitType]"}
        <div className="space-between">
          <img src={logo} alt={"logo"} className="logo" style={{ maxWidth: 105, marginBottom: -880}}></img>
          <img
            src={closeIcon}
            alt="Close sidebar"
            className="icon"
            onClick={() => props.closeModal()}
          />
        </div>
      </div>
      <div className={"sidebar-body " + (props.open ? "" : "disabled-link")}>
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/name">
          Name
        </Link>
        <Link className="link" to="/intro1">
          Connect To Your Devices, 1/2
        </Link>
        <Link className="link" to="/intro2">
          Connect To Your Devices, 2/2
        </Link>
        <Link className="link" to="/intro3">
          Audio Play
        </Link>
        <Link className="link" to="/select">
          Select Location
        </Link>
        <Link className="link" to="/fit-instruct">
          Sound Fitting Instruction
        </Link>
        <Link className="link" to="/fit-select">
          Fitting Select
        </Link>
        <Link className="link" to="/prompt">
          Reset Settings
        </Link>
        <Link className="link" to="/finish">
          Finish
        </Link>
      </div>
    </div>
  );
};

export default CollapsingSidebar;
