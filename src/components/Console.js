export default function Console({ setConsoleStatus, handle, navi }) {
  if (navi === "player") {
    return (
      <>
        <div className="interface">
          <button
            onClick={() => {
              setConsoleStatus("play");
              handle("play");
            }}
            type="button"
          >
            PLAY
          </button>
          <button
            onClick={() => {
              setConsoleStatus("pause");
              handle("pause");
            }}
            type="button"
          >
            PAUSE
          </button>
          <button
            onClick={() => {
              setConsoleStatus("prev");
              handle("prev");
            }}
            type="button"
          >
            PREV
          </button>
          <button
            onClick={() => {
              setConsoleStatus("next");
              handle("next");
            }}
            type="button"
          >
            NEXT
          </button>
        </div>
      </>
    );
  }
}
