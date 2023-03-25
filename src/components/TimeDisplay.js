export default function TimeDisplay({ currentTimer, currentDuration, navi }) {
  let DurationFixed = currentDuration / 60;

  console.log(currentDuration);
  if (navi === "player") {
    return (
      <div className="time">
        <p>
          {currentTimer} 0{DurationFixed.toFixed(2)}
        </p>
      </div>
    );
  }
}
