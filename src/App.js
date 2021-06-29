import "./App.scss";
import { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import Game from "./components/Game";

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

function App() {
  const [gameMode, setGameMode] = useState("menu");

  return (
    <div className="App" style={{ cursor: "url(knife.cur),auto" }}>
      <Game
        gameMode={gameMode}
        setGameMode={setGameMode}
        firestore={firestore}
      />
    </div>
  );
}

export default App;
