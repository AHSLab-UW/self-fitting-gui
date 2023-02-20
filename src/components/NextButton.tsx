import { Link } from "react-router-dom";
import "./NextButton.css";

interface Props {
  to: string;
  text: string;
  style?: React.CSSProperties;
  onclick?: () => void;
}

export const NextButton = ({ to, text, onclick, style}: Props) => {
  return (
    <Link style={style} to={to} className="big-button" onClick={onclick}>
      {text} &gt;
    </Link>
  );
};
