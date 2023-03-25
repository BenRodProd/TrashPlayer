import { useState, useEffect } from "react";
import Header from "./Header";
import Cover from "./Cover";
import Console from "./Console";
import Playlist from "./Playlist";
import FetchLib from "./FetchLib";
import Navigation from "./Navigation.js";
import Info from "./Info";
import TimeDisplay from "./TimeDisplay";
import FetchAlbumLib from "./FetchAlbumLib";
import FetchAudioData from "./FetchAudioData";
export default function Main() {
  const [lastPlayed, setLastPlayed] = useState(1);
  const [currentNavi, setCurrentNavi] = useState("albums");
  const [likedTracks, setLikedTracks] = useState([]);
  const [consoleStatus, setConsoleStatus] = useState("pause");
  const [handleConsoleTrigger, setHandleConsoleTrigger] = useState("pause");
  const [albumID, setAlbumID] = useState("1");
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [currentTimer, setCurrentTimer] = useState("00:00");
  const [songList, setSongList] = useState([]);
  const Library = FetchLib();
  const AlbumLib = FetchAlbumLib();

  const audio = document.querySelector('[data-js="mp3"]');
  //   const local = FetchLocal();
  FetchLocal();

  function handleConsole(consoleStatus) {
    console.log(Library[lastPlayed - 1].NUMBER, songList[0]);
    if (consoleStatus === "play") {
      audio.play();
    } else if (consoleStatus === "pause") {
      audio.pause();
    } else if (
      consoleStatus === "next" &&
      Library[lastPlayed - 1].NUMBER < songList.length
    ) {
      playSong(Number(lastPlayed) + 1);
    } else if (consoleStatus === "prev" && Library[lastPlayed - 1].NUMBER > 1) {
      console.log("songlist", songList[0]);
      playSong(lastPlayed - 1);
    }
  }

  function PlayAlbum(ID) {
    setAlbumID(ID);
    const currentAlbumTrackIDS = AlbumLib[ID - 1].TRACKIDS.split(",");
    playSong(currentAlbumTrackIDS[0]);
    setSongList(currentAlbumTrackIDS);
  }
  function playSong(ID) {
    audio.pause();
    onChangeLastPlayed(ID);
    setCurrentNavi("player");

    audio.src = "http://" + Library[ID - 1].URL;
  }

  function FetchLocal() {
    useEffect(() => {
      const lastPlayed = JSON.parse(localStorage.getItem("LastPlayed"));
      if (lastPlayed) {
        setLastPlayed(lastPlayed);
      }
      if (!lastPlayed) {
        onChangeLastPlayed(1);
        console.log("nottin");
      }
    }, []);

    useEffect(() => {
      const likedTracks = JSON.parse(localStorage.getItem("liked"));
      if (likedTracks) {
        setLikedTracks(likedTracks);
      }
    }, []);
  }
  function onChangeLastPlayed(ID) {
    setLastPlayed(ID);
    localStorage.setItem("LastPlayed", ID);
  }
  return (
    <>
      <Header navi={currentNavi} header={Library[lastPlayed - 1].TRACK} />
      <Cover Library={Library} navi={currentNavi} track={lastPlayed} />
      <Playlist
        navi={currentNavi}
        Albumlist={AlbumLib}
        PlayAlbum={PlayAlbum}
        playSong={playSong}
        songList={songList}
        Library={Library}
        lastPlayed={lastPlayed}
      />
      <Info trackID={lastPlayed} Library={Library} navi={currentNavi} />
      <Console
        setConsoleStatus={setConsoleStatus}
        handle={handleConsole}
        navi={currentNavi}
      />

      <TimeDisplay
        currentDuration={currentDuration}
        currentTimer={currentTimer}
        navi={currentNavi}
      />
      <Navigation setCurrentNavi={setCurrentNavi} />
    </>
  );
}
// IMPORTET FUNCTIONS
// function zeitDisplayFunction() {
// let timerNow = currentMp3.currentTime;

//   let currentDuration = currentMp3.duration;

//   let TimerSeconds = Math.floor(timerNow);
//   let DurationFixed = currentDuration / 60;
//   if (currentDuration > 600) {
//     DurationShow = DurationFixed.toFixed(2);
//   } else {
//     DurationShow = "0" + DurationFixed.toFixed(2);
//   }
//   if (TimerSeconds < 10) {
//     ZeitDisplay.innerText = "00." + "0" + TimerSeconds + " " + DurationShow;
//   } else if (TimerSeconds < 60) {
//     ZeitDisplay.innerText = "00." + TimerSeconds + " " + DurationShow;
//   } else if (TimerSeconds >= 60 && TimerSeconds < 600) {
//     ZeitDisplay.innerText =
//       "0" + (TimerSeconds / 60).toFixed(2) + " " + DurationShow;
//   } else if (TimerSeconds > 600) {
//     ZeitDisplay.innerText = (TimerSeconds / 60).toFixed(2) + " " + DurationShow;
//   }
// }
//   function ShowTimer() {
//     const timer = document.querySelector('[data-js="timer"]');

//     let timerNow = currentMp3.currentTime;

//     let currentDuration = currentMp3.duration;
//     let DurationPercent = (timerNow / currentDuration) * 100;

//     timer.value = DurationPercent;
//     let TimerSeconds = Math.floor(timerNow);

//     timer.addEventListener("input", (event) => {
//       newtimer = event.target.value;
//       timer.value = Number(event.target.value);

//       currentMp3.currentTime = (currentDuration / 100) * newtimer;

//       TimerSeconds = Math.floor(currentMp3.currentTime);
//       zeitDisplayFunction();
//     });
//   }
//
