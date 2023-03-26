import { useState } from "react";
export default function Console({
  consoleStatus,
  setConsoleStatus,
  handle,
  navi,
  currentTimer,
  currentDuration,
  setCurrentTimer,
}) {
  const [playButton, setPlayButton] = useState("⏸");
  const audio = document.querySelector('[data-js="mp3"]');
  function handlePlayButton() {
    if (consoleStatus === "play") {
      setConsoleStatus("pause");
      handle("pause");
      setPlayButton("▶");
    } else {
      setConsoleStatus("play");
      handle("play");
      setPlayButton("⏸");
    }
  }

  if (navi !== "albums") {
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
