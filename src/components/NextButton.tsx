import React from "react";
import { Link } from "react-router-dom";
import "./NextButton.css";

interface Props {
  to: string;
  text: string;
}

export const NextButton = ({ to, text }: Props) => {
  return (
    <Link to={to} className="next-button">
      {text} &gt;
    </Link>
  );
};
