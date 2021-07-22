import React, { useState } from "react";
import "./multiPlayerLobby.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";

import useSound from "use-sound";
import SwooshFromLeft from "../sounds/swoosh.left.mp3";
import SwooshFromRight from "../sounds/swoosh.right.mp3";

export default function MultiPlayerLobby({
  setGameMode,
  firestore,
  setJoinedServer,
  setGameCreatorP1,
  setScreenSlide,
  screenSlide,
  menuMusic,
  setMenuMusic,
  difficulty,
}) {
  //const [gameList, setGameList] = useState(["aaa", "bbb", "ccc", "cccp"]);
  const [createName, setCreateName] = useState("");

  const [SwooshFromLeftPlay] = useSound(SwooshFromLeft);

  //firestore collection:
  //autoID, servName, open(bool), score[int], ready[bool], shotFired[bool], lastReactTimes[int], lastOnline[timestamp]
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });

  const HangOutTimeWithoutPing = 500000;

  const typeGameNameHandler = (e) => {
    setCreateName(e.target.value);
  };

  const joinGame = (e) => {
    setJoinedServer(e.target.innerText);
    setGameCreatorP1(false);
    setScreenSlide("multiplayer");
    SwooshFromLeftPlay();
  };

  const createGameHandler = async (e) => {
    e.preventDefault();
    setGameCreatorP1(true);
    //CHECK ETTEI OLE JO SAMANNIMISTÄ SERVERIÄ OLEMASSA!
    await gameServersRef.add({
      servName: createName,
      open: true,
      ready: [false, false],
      score: [0, 0],
      shotFiredCreator: false,
      shotFiredJoined: false,
      lastOnline: Date.now(),
      lastReactionTimeCreator: 88888,
      lastReactionTimeJoined: 88888,
      lastRandomTime: 3500 + Math.floor(Math.random() * 6000),
      FatalityDifficulty: difficulty,
      tooEarlyRicochet: [false, false],
      heroCreator: "sheriff",
      heroJoined: "cowboy",
    });

    setScreenSlide("multiplayer");
    setJoinedServer(createName);
    SwooshFromLeftPlay();
  };

  const backToMenuClick = (e) => {
    e.preventDefault();
    setGameMode("menu");
    setScreenSlide("menu");
    SwooshFromLeftPlay();
  };

  return (
    <>
      <main>
        <header className="createGame">
          <button className="btn backToMenu" onClick={backToMenuClick}>
            Back
          </button>
          <form onSubmit={createGameHandler}>
            <input
              type="text"
              onChange={typeGameNameHandler}
              value={createName}
              required
              autoFocus
              maxLength="32"
              autoComplete="off"
              placeholder="type server name"
              className="serverInput"
            ></input>
            <button className="btn" type="submit">
              Create
            </button>
          </form>
        </header>
        <section className="gameList">
          <ul>
            {gameList &&
              gameList.map((game) => {
                if (game.lastOnline > Date.now() - HangOutTimeWithoutPing) {
                  return (
                    <li
                      onClick={joinGame}
                      key={game.servName}
                      className={game.open ? "serv openServ" : "serv fullServ"}
                    >
                      {game.servName}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
          </ul>
        </section>
      </main>
    </>
  );
}
