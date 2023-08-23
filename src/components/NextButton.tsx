import { Link } from "react-router-dom";
import "../styles/NextButton.css";

interface Props {
  to: string;
  text: string;
  style?: React.CSSProperties;
  onclick?: () => void;
}

export const NextButton = ({ to, text, onclick, style}: Props) => {
  return (
    <Link style={style} to={to} className="big-button top-space" onClick={onclick}>
      {text}
    </Link>
  );
};
