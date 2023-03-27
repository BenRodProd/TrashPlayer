export default function TimeDisplay({ currentTimer, currentDuration, navi }) {
  if (isNaN(currentDuration)) {
    currentDuration = 0;
  }
  let DurationShow;
  let DurationFixed = currentDuration / 60;
  let TimerSeconds = Math.floor(currentTimer);
  let ZeitDisplay;

  if (currentDuration > 600) {
    DurationShow = DurationFixed.toFixed(2);
  } else {
    DurationShow = "0" + DurationFixed.toFixed(2);
  }
  if (TimerSeconds < 10) {
    ZeitDisplay = (
      <p>
        00.0{TimerSeconds} {DurationShow}{" "}
      </p>
    );
  } else if (TimerSeconds < 60) {
    ZeitDisplay = (
      <p>
        00.{TimerSeconds} {DurationShow}{" "}
      </p>
    );
  } else if (TimerSeconds >= 60 && TimerSeconds < 600) {
    ZeitDisplay = (
      <p>
        0{(TimerSeconds / 60).toFixed(2)} {DurationShow}{" "}
      </p>
    );
  } else if (TimerSeconds > 600) {
    ZeitDisplay = (
      <p>
        {(TimerSeconds / 60).toFixed(2)} {DurationShow}
      </p>
    );
  }

  if (navi === "player") {
    return <div className="timeDisplay">{ZeitDisplay}</div>;
  }
}
