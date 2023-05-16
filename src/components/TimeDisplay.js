import { useState } from "react";
export default function TimeDisplay({ navi }) {
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
  let DurationShow;
  let DurationFixed = currentDuration / 60;
  let TimerSeconds = Math.floor(currentTimer);
  let ZeitDisplay;
  if (isNaN(currentDuration)) {
    setCurrentDuration(0);
  }
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
