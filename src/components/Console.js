import { useState } from "react";
export default function Console({
  consoleStatus,
  setConsoleStatus,
  handle,
  navi,
}) {
  const [playButton, setPlayButton] = useState("⏸");

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

  if (navi === "player") {
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
        </div>
      </>
    );
  }
}
