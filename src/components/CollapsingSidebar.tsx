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
        <Link to="/intro1">Intro 1</Link>
        <div></div>
        <Link to="/intro2">Intro 2</Link>
        <div></div>
        <Link to="/intro3">Intro 3</Link>
        <div></div>
        <Link to="/select">Select</Link>
        <div></div>
        <Link to="/fit">Fitting</Link>
        <div></div>
        <Link to="/adjust">Adjust</Link>
        <div></div>
        <Link to="/prompt">Prompt</Link>
        <div></div>
        <Link to="/finish">Finish</Link>
      </div>
      <div className="sidebar-footer" style={{ marginBottom: 100 }}>
        <p>UW Applied Hearing Science Lab</p>
      </div>
    </div>
  );
};

export default CollapsingSidebar;
