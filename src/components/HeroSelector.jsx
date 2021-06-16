import React from "react";
import "./heroSelector.scss";
import HeroAvatar from "./HeroAvatar";

export default function HeroSelector({ setPlayer1Hero, setPlayer2Hero }) {
  const heroesList = ["sheriff", "cowboy", "pirate"];

  const player2sheriff = () => {
    setPlayer2Hero("sheriff");
  };

  const player2cowboy = () => {
    setPlayer2Hero("cowboy");
  };

  const player1sheriff = () => {
    setPlayer1Hero("sheriff");
  };

  const player1cowboy = () => {
    setPlayer1Hero("cowboy");
  };

  const changePlayer1Hero = (e) => {
    setPlayer1Hero(e.target.name);
  };

  const changePlayer2Hero = (e) => {
    setPlayer2Hero(e.target.name);
  };

  return (
    <>
      <div className="heroes-box-keyboard">
        {heroesList.map((hero) => (
          <div className="hero-avatar-keyboard">
            <img
              src={`./assets/${hero}.avatar.gif`}
              key={hero}
              name={hero}
              onClick={changePlayer2Hero}
              alt="avatar"
            ></img>
          </div>
        ))}
      </div>

      <div className="heroes-box-mouse">
        {heroesList.map((hero) => (
          <div className="hero-avatar-mouse">
            <img
              src={`./assets/${hero}.avatar.gif`}
              key={hero}
              name={hero}
              onClick={changePlayer1Hero}
              alt="avatar"
            ></img>
          </div>
        ))}
      </div>
    </>
  );
}
