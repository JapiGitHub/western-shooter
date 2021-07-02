import React, { useState } from "react";
import "./multiPlayerLobby.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function MultiPlayerLobby({
  setGameMode,
  firestore,
  setJoinedServer,
  setGameCreatorP1,
}) {
  //const [gameList, setGameList] = useState(["aaa", "bbb", "ccc", "cccp"]);
  const [createName, setCreateName] = useState("");

  //firestore collection:
  //autoID, servName, open(bool), score[int], ready[bool], shotFired[bool], lastReactTimes[int], lastOnline[timestamp]
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });

  const HangOutTimeWithoutPing = 500000;

  const joinGame = (e) => {
    setJoinedServer(e.target.innerText);
    setGameCreatorP1(false);
  };

  const typeGameNameHandler = (e) => {
    setCreateName(e.target.value);
  };

  const createGameHandler = async (e) => {
    e.preventDefault();

    setGameCreatorP1(true);

    //CHECK ETTEI OLE JO SAMANNIMISTÄ SERVERIÄ OLEMASSA!

    await gameServersRef.add({
      servName: createName,
      open: true,
      ready1: false,
      ready2: false,
      score1: 0,
      score2: 0,
      shotFired1: false,
      shotFired2: false,
      lastOnline: Date.now(),
      lastReactionTime1: 888,
      lastReactionTime2: 888,
    });

    setJoinedServer(createName);
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
                if (game.lastOnline > Date.now() - HangOutTimeWithoutPing) {
                  return (
                    <li
                      onClick={joinGame}
                      key={game.servName}
                      className={game.open ? "OpenServ Serv" : "FullServ Serv"}
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
