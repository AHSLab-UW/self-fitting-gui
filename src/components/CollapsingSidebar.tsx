import "./CollapsingSidebar.css";
import closeIcon from "../assets/imgs/close.png";
import ear from "../assets/imgs/ear-03.png";

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
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
          <li>
            <a href="#">Link 4</a>
          </li>
          <li>
            <a href="#">Link 5</a>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer" style={{ marginBottom: 100 }}>
        <p>UW Applied Hearing Science Lab</p>
      </div>
    </div>
  );
};

export default CollapsingSidebar;
