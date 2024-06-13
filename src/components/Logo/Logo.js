import React from "react";
import "./Logo.css";
import ai from "./ai.png";
import Tilt from "react-parallax-tilt";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        style={{
          height: "150px",
          width: "150px",
        }}
        className="br2 shadow-2"
      >
        <div className="Tilt pa3">
          <img src={ai} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
