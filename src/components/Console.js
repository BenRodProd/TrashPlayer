import play from "../play.png";
import next from "../next.png";
import prev from "../prev.png";
import pause from "../pause.png";
import stop from "../stop.png";
import { useState, useEffect } from "react";

export default function Console({
  consoleStatus,
  setConsoleStatus,
  handle,
  navi,
}) {
  const [currentTimer, setCurrentTimer] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const audio = document.querySelector('[data-js="mp3"]');
  audio.addEventListener("timeupdate", (event) => {
    if (isNaN(currentTimer)) {
      setCurrentTimer(0);
    }
    setCurrentTimer(event.target.currentTime);
  });
  audio.addEventListener("timeupdate", (event) => {
    if (isNaN(currentDuration)) {
      setCurrentDuration(0);
    }
    setCurrentDuration(event.target.duration);
  });
  if (isNaN(currentDuration)) {
    setCurrentDuration(10);
  }
  const [playButton, setPlayButton] = useState(
    <img alt="pause" src={pause} className="ConsoleButtonImage"></img>
  );
  // const audio = document.querySelector('[data-js="mp3"]');
  function handlePlayButton() {
    if (consoleStatus === "play") {
      setConsoleStatus("pause");
      handle("pause");
      setPlayButton(
        <img className="ConsoleButtonImage" alt="play" src={play}></img>
      );
    } else if (consoleStatus === "stop ") {
    } else {
      setConsoleStatus("play");
      handle("play");
      setPlayButton(
        <img className="ConsoleButtonImage" alt="next" src={pause}></img>
      );
    }
  }
  useEffect(() => {
    if (consoleStatus === "play") {
      setPlayButton(
        <img className="ConsoleButtonImage" alt="play" src={pause}></img>
      );
    }
  }, [consoleStatus]);
  function handleValue() {
    if (
      typeof currentTimer !== "number" ||
      typeof currentDuration !== "number" ||
      isNaN(currentTimer) ||
      isNaN(currentDuration)
    ) {
      return 0;
    } else {
      return (currentTimer * 100) / currentDuration;
    }
  }
  if (isNaN(handleValue())) {
    return <div></div>;
  }
  if (navi !== "albums" && navi !== "genre" && navi !== "liked") {
    return (
      <>
        <div className="interface">
          <button
            className="consoleButton"
            onClick={() => handlePlayButton()}
            type="button"
          >
            {playButton}
          </button>
          <button
            className="consoleButton"
            onClick={() => {
              setConsoleStatus("stop");
              handle("stop");
              setPlayButton(
                <img className="ConsoleButtonImage" alt="play" src={play}></img>
              );
            }}
            type="button"
          >
            <img className="ConsoleButtonImage" alt="next" src={stop}></img>
          </button>
          <button
            className="consoleButton"
            onClick={() => {
              setConsoleStatus("prev");
              handle("prev");
              setPlayButton(
                <img
                  alt="pause"
                  src={pause}
                  className="ConsoleButtonImage"
                ></img>
              );
            }}
            type="button"
          >
            <img alt="prev" src={prev} className="ConsoleButtonImage"></img>
          </button>
          <button
            className="consoleButton"
            onClick={() => {
              setConsoleStatus("next");
              handle("next");
              setPlayButton(
                <img
                  alt="pause"
                  src={pause}
                  className="ConsoleButtonImage"
                ></img>
              );
            }}
            type="button"
          >
            <img alt="next" className="ConsoleButtonImage" src={next}></img>
          </button>
        </div>
        <input
          value={handleValue()}
          className="range"
          type="range"
          onInput={(event) =>
            (audio.currentTime = (currentDuration / 100) * event.target.value)
          }
        ></input>
      </>
    );
  }
}
