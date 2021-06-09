import React, { useState } from "react";
import "./multiPlayerLobby.scss";

export default function MultiPlayerLobby({ setGameMode, auth, firestore }) {
  const [gameList, setGameList] = useState(["aaa", "bbb", "ccc", "cccp"]);
  const [createName, setCreateName] = useState("");

  const clicki = (e) => {
    console.log(e.target.innerText, "click toimii");
  };

  const typeGameNameHandler = (e) => {
    setCreateName(e.target.value);
  };

  const backToMenuClick = () => {
    setGameMode("menu");
  };

  return (
    <main className="lobbyBG">
      <header className="createGame">
        <button className="btn backToMenu" onClick={backToMenuClick}>
          Back
        </button>
        <input
          type="text"
          onChange={typeGameNameHandler}
          value={createName}
        ></input>
        <button className="btn">Create</button>
      </header>
      <section className="gameList">
        <ul>
          {gameList.map((game) => {
            return <li onClick={clicki}>{game}</li>;
          })}
        </ul>
      </section>
    </main>
  );
}
