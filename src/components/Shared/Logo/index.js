import React from "react";
import Animate from "rc-animate";
import LogoSVG from "../../../assets/logo.svg";
import "./index.css";

export default function Logo() {
  return (
    <div className="logo">
      <Animate component="" transitionName="fade">
        <img src={LogoSVG} alt={"Phone-Number Logo"} />
      </Animate>
    </div>
  );
}
