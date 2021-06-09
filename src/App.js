import "./App.scss";
import { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Game from "./components/Game";
import Login from "./components/Login";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

const auth = firebase.auth();
const firestore = firebase.firestore();

//DEBUGgia varten
auth.signOut();

function App() {
  const [gameMode, setGameMode] = useState("menu");

  //firebase auth
  const [user] = useAuthState(auth);

  return (
    <div className="App" style={{ cursor: "url(knife.cur),auto" }}>
      {user ? (
        <Game
          gameMode={gameMode}
          setGameMode={setGameMode}
          auth={auth}
          firestore={firestore}
        />
      ) : (
        <Login auth={auth} />
      )}
    </div>
  );
}

export default App;
