import React from "react";
import "./heroSelector.scss";

export default function HeroSelector() {
  return (
    <>
      <div className="heroes-box-keyboard">
        <div className="hero-avatar-keyboard">
          <img src="./assets/cowboy.avatar.gif"></img>
        </div>
        <div className="hero-avatar-keyboard">
          <img src="./assets/sheriff.avatar.gif"></img>
        </div>
      </div>
      <div className="heroes-box-mouse">
        <div className="hero-avatar-mouse">
          <img src="./assets/cowboy.avatar.gif"></img>
        </div>
        <div className="hero-avatar-mouse">
          <img src="./assets/sheriff.avatar.gif"></img>
        </div>
      </div>
    </>
  );
}
