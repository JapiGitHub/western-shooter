import React from "react";

export default function LobbyServerListItem({
  id,
  open,
  serverName,
  setJoinedServer,
  setGameCreatorP1,
  setScreenSlide,
  stop,
  SwooshFromRightPlay,
}) {
  const joinGame = (e) => {
    setJoinedServer(id);
    setGameCreatorP1(false);
    setScreenSlide("multiplayer");
    SwooshFromRightPlay();
    stop();
  };

  return (
    <li
      onClick={open ? joinGame : null}
      key={id}
      className={open ? "serv openServ" : "serv fullServ"}
    >
      {serverName}
    </li>
  );
}
