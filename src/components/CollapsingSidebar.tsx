import "./CollapsingSidebar.css";
import closeIcon from "../assets/imgs/close.png";
import ear from "../assets/imgs/ear-03.png";
import { Link } from "react-router-dom";

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
      <div className="sidebar-header">
        {/* Text on left, close icon on right */}
        <div className="space-between">
          <img src={ear} alt={"logo"} style={{ maxWidth: 50 }}></img>
          <img
            src={closeIcon}
            alt="Close sidebar"
            className="icon"
            onClick={() => props.closeModal()}
          />
        </div>
      </div>
      <div className="sidebar-body">
        <Link className="link" to="/intro1">
          Intro 1
        </Link>
        <Link className="link" to="/intro2">
          Intro 2
        </Link>
        <Link className="link" to="/intro3">
          Intro 3
        </Link>
        <Link className="link" to="/select">
          Select
        </Link>
        <Link className="link" to="/fit">
          Fitting
        </Link>
        <Link className="link" to="/adjust">
          Adjust
        </Link>
        <Link className="link" to="/prompt">
          Prompt
        </Link>
        <Link className="link" to="/finish">
          Finish
        </Link>
      </div>
      <div className="sidebar-footer" style={{ marginBottom: 100 }}>
        <p>UW Applied Hearing Science Lab</p>
      </div>
    </div>
  );
};

export default CollapsingSidebar;
