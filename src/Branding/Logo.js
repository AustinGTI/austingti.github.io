import React from "react";
import "./Logo.scss";
import { ReactComponent as LogoIcon } from "../data/icons/Logo/Logo.svg";

export default function Logo() {
  return (
    <div className="logo">
      <LogoIcon />
    </div>
  );
}
