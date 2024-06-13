import React from "react";
import "./Logo.css";
import ai from "./ai.png";
import Tilt from "react-parallax-tilt";

const Logo = () => {
  return (
    <div>
      <Tilt>
        <div
          className="Tilt ma4 mt0 br2 shadow-2 pa3"
          style={{
            height: "150px",
            width: "150px",
          }}
        >
          <img src={ai} alt="logo" style={{ paddingTop: "5px" }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
