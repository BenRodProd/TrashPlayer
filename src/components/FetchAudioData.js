export default function FetchAudioData(setCurrentDuration, setCurrentTimer) {
  const audio = document.querySelector('[data-js="mp3"]');
  audio.addEventListener("loadedmetadata", () => {
    let currentDuration = Number(audio.duration);
    let currentTimer = Number(audio.currentTime);

    setCurrentTimer(currentTimer);
    setCurrentDuration(currentDuration);
  });
}
