import { useState } from "react";
export default function Console({
  consoleStatus,
  setConsoleStatus,
  handle,
  navi,
  currentTimer,
  currentDuration,
}) {
  const [playButton, setPlayButton] = useState("⏸");
  const audio = document.querySelector('[data-js="mp3"]');
  function handlePlayButton() {
    if (consoleStatus === "play") {
      setConsoleStatus("pause");
      handle("pause");
      setPlayButton("▶");
    } else if (consoleStatus === "stop ") {
    } else {
      setConsoleStatus("play");
      handle("play");
      setPlayButton("⏸");
    }
  }
  if (isNaN(audio.currentTime)) {
    audio.currentTime = 0;
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
              setPlayButton("▶");
            }}
            type="button"
          >
            ⏹
          </button>
          <button
            className="consoleButton"
            onClick={() => {
              setConsoleStatus("prev");
              handle("prev");
              setPlayButton("⏸");
            }}
            type="button"
          >
            ⏮
          </button>
          <button
            className="consoleButton"
            onClick={() => {
              setConsoleStatus("next");
              handle("next");
              setPlayButton("⏸");
            }}
            type="button"
          >
            ⏭
          </button>
          <input
            value={(currentTimer * 100) / currentDuration}
            className="range"
            type="range"
            onInput={(event) =>
              (audio.currentTime = (currentDuration / 100) * event.target.value)
            }
          ></input>
        </div>
      </>
    );
  }
}
