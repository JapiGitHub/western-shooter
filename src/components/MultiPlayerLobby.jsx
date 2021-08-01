import React, { useState } from "react";
import "./multiPlayerLobby.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LobbyServerListItem from "./LobbyServerListItem";
import { nanoid } from "nanoid";

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
  stop,
}) {
  //const [gameList, setGameList] = useState(["aaa", "bbb", "ccc", "cccp"]);
  const [createName, setCreateName] = useState("");

  const [SwooshFromLeftPlay] = useSound(SwooshFromLeft);
  const [SwooshFromRightPlay] = useSound(SwooshFromRight);

  //firestore collection:
  //autoID, servName, open(bool), score[int], ready[bool], shotFired[bool], lastReactTimes[int], lastOnline[timestamp]
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });

  //kuinka kauan serveri näkyy viimeisimmästä toiminnasta (lastOnline kenttä)
  const HangOutTimeWithoutPing = 500000;

  const typeGameNameHandler = (e) => {
    setCreateName(e.target.value);
  };

  const createGameHandler = async (e) => {
    e.preventDefault();
    setGameCreatorP1(true);
    stop();

    console.log("gameList: ", gameList);

    const serverIDconst = nanoid();

    await gameServersRef.add({
      //en käytä autoID:tä tässä koska creatorin pitää päästä määrittämään toi serverin ID minkä se created, jotta se tietää mihin se päivittää gamedataa
      //pakko laittaa erikseen noi creator ja joined, jotta ne ei päivitä herkästi toisten päälle jos kumpikin tekee about samaan aikaan updaten esim ready tai shot
      serverId: serverIDconst,
      servName: createName,
      open: true,
      readyCreator: false,
      readyJoined: false,
      score: [0, 0],
      shotFiredCreator: false,
      shotFiredJoined: false,
      lastOnline: Date.now(),
      lastReactionTimeCreator: 88888,
      lastReactionTimeJoined: 88888,
      lastRandomTime: 3500 + Math.floor(Math.random() * 6000),
      FatalityDifficulty: difficulty,
      tooEarlyRicochetCreator: false,
      tooEarlyRicochetJoined: false,
      heroCreator: "cowboy",
      heroJoined: "sheriff",
      onlineCreator: true,
      onlineJoined: false,
    });

    setScreenSlide("multiplayer");

    //tähän ID, namen sijasta
    setJoinedServer(serverIDconst);
    SwooshFromRightPlay();
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
            {gameList
              ? gameList.map((server) => {
                  if (server.lastOnline > Date.now() - HangOutTimeWithoutPing) {
                    return (
                      <LobbyServerListItem
                        id={server.serverId}
                        open={server.open}
                        serverName={server.servName}
                        setJoinedServer={setJoinedServer}
                        setGameCreatorP1={setGameCreatorP1}
                        setScreenSlide={setScreenSlide}
                        stop={stop}
                        SwooshFromRightPlay={SwooshFromRightPlay}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              : "Loading ..."}
          </ul>
        </section>
      </main>
    </>
  );
}
