import React from "react";

export default function Settings({
  setTheme,
  setMenuMusic,
  menuMusic,
  difficulty,
  setDifficulty,
  showSettings,
}) {
  return (
    <div
      className={
        showSettings ? "settingsContainerShow" : "settingsContainerHide"
      }
    >
      <div className="graphicsTitle">Graphics</div>
      <button className="btn theme2Button" onClick={() => setTheme("sepia")}>
        Oldie
      </button>
      <button className="btn theme1Button" onClick={() => setTheme("normal")}>
        Hyper Realistic
      </button>
      <button
        className="btn musicToggle"
        onClick={() => setMenuMusic(!menuMusic)}
      >
        Music
      </button>
      <div className="difficultyInfo">
        <p>{difficulty / 1000}s fatalities</p>{" "}
        {(() => {
          switch (difficulty) {
            case "200":
              return <>Lucky Luke</>;
            case "220":
              return <>Do you feel lucky punk?</>;
            case "240":
              return (
                <>
                  Ranger,<br></br> Texas Ranger.
                </>
              );
            case "300":
              return <>Hold my hand.</>;
            default:
              return <>Ranger. Texas Ranger.</>;
          }
        })()}
      </div>
      <div></div>
      <div className="difficultyContainer">
        <button
          className={difficulty === "200" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("200")}
        >
          Insane
        </button>
        <button
          className={difficulty === "220" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("220")}
        >
          Hard
        </button>
        <button
          className={difficulty === "240" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("240")}
        >
          Normal
        </button>
        <button
          className={difficulty === "300" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("300")}
        >
          Easy
        </button>
      </div>
    </div>
  );
}
