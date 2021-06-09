import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import "./login.scss";

export default function Login({ auth }) {
  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="signInContainer">
      <button onClick={googleLogin} className="googleSignButt btn">
        Sign in with Google ✍
      </button>
    </div>
  );
}
