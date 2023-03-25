export default function FetchAudioData(setCurrentDuration, setCurrentTimer) {
  const audio = document.querySelector('[data-js="mp3"]');
  audio.addEventListener("loadedmetadata", () => {
    let currentDuration = Number(audio.duration);
    let currentTimer = Number(audio.currentTime);
    console.log("curent", currentTimer);
    setCurrentTimer(currentTimer);
    setCurrentDuration(currentDuration);
  });
}
