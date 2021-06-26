import React, { useState } from "react";
import "./multiPlayerLobby.scss";
import Login from "./Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function MultiPlayerLobby({
  setGameMode,
  firestore,
  setJoinedServer,
}) {
  //const [gameList, setGameList] = useState(["aaa", "bbb", "ccc", "cccp"]);
  const [createName, setCreateName] = useState("");

  //firestore collection:
  //autoID, servName, open(bool), score[int], ready[bool], shotFired[bool], lastReactTimes[int], lastOnline[timestamp]
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });

  const joinGame = (e) => {
    setJoinedServer(e.target.innerText);
  };

  const typeGameNameHandler = (e) => {
    setCreateName(e.target.value);
  };

  const createGameHandler = async (e) => {
    e.preventDefault();
    console.error(createName);
    //setGameList([...gameList, createName]);
    await gameServersRef.add({
      servName: createName,
      open: true,
      ready: [false, false],
      score: [0, 0],
      shotFired: [false, false],
      lastOnline: Date.now(),
    });
  };

  const backToMenuClick = (e) => {
    e.preventDefault();
    setGameMode("menu");
  };

  return (
    <>
      <main className="lobbyBG">
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
                console.error("gameee:", game);
                return (
                  <li onClick={joinGame} key={game.servName}>
                    {game.open ? "Open" : "Full"}&nbsp;
                    {game.servName}
                  </li>
                );
              })}
          </ul>
        </section>
      </main>
    </>
  );
}
