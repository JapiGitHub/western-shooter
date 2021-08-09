import "./App.scss";
import { useState } from "react";

import Game from "./components/Game";

//fullscreen
import { FullScreen, useFullScreenHandle } from "react-full-screen";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

const firestore = firebase.firestore();

//localhostissa käytä emulaattoria, jotta ne ilmaisen sparkplanin reads/writes ei enää mene yli..
if (window.location.hostname.includes("localhost")) {
  firestore.useEmulator("localhost", 8080);
}

function App() {
  const handle = useFullScreenHandle();
  const [gameMode, setGameMode] = useState("start");

  return (
    <div className="App" style={{ cursor: "url(knife.cur),auto" }}>
      <FullScreen handle={handle}>
        <Game
          gameMode={gameMode}
          setGameMode={setGameMode}
          firestore={firestore}
          handle={handle}
        />
      </FullScreen>
    </div>
  );
}

export default App;
