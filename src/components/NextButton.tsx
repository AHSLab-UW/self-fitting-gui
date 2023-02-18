import { Link } from "react-router-dom";
import "./NextButton.css";

interface Props {
  to: string;
  text: string;
  onclick?: () => void;
}

export const NextButton = ({ to, text, onclick }: Props) => {
  return (
    <Link to={to} className="big-button" onClick={onclick}>
      {text} &gt;
    </Link>
  );
};
