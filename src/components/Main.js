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
    if (consoleStatus === "play") {
      audio.play();
    } else if (consoleStatus === "pause") {
      audio.pause();
    } else if (
      consoleStatus === "next" &&
      songList.findIndex((el) => el === Number(lastPlayed)) <
        songList.length - 1
    ) {
      playSong(
        songList[songList.findIndex((el) => el === Number(lastPlayed)) + 1]
      );
      setConsoleStatus("play");
    } else if (
      consoleStatus === "prev" &&
      songList.findIndex((el) => el === Number(lastPlayed)) > 0
    ) {
      playSong(
        songList[songList.findIndex((el) => el === Number(lastPlayed)) - 1]
      );

      setConsoleStatus("play");
    } else if (consoleStatus === "stop") {
      audio.pause();
      setCurrentTimer(0);
      audio.currentTime = "0";
    }
  }
  function PlayAllTracks() {
    const allTracks = Library.map((el) => {
      return Number(el.TRACKID);
    });
    setSongList(allTracks);

    playSong(allTracks[0]);
  }
  function PlayAlbum(ID) {
    setAlbumID(ID);
    const currentAlbumTrackIDS = AlbumLib[ID - 1].TRACKIDS.split(",");
    const newAlbumTracks = [];
    for (let i = 0; i < currentAlbumTrackIDS.length; i++) {
      newAlbumTracks.push(Number(currentAlbumTrackIDS[i]));
    }
    console.log(newAlbumTracks);
    playSong(newAlbumTracks[0]);
    setSongList(newAlbumTracks);
  }
  function playSong(ID) {
    audio.pause();
    onChangeLastPlayed(ID);
    setCurrentNavi("player");
    // setSongList(AlbumLib[Number(Library[ID].ALBUMID)].TRACKIDS);
    // setAlbumID(Library[ID].ALBUMID);
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
      const likedTracks = localStorage.getItem("liked");
      if (likedTracks) {
        const likedArray = likedTracks.split(",");
        for (let i = 0; i < likedArray.length; i++) {
          likedArray[i] = Number(likedArray[i]);
        }
        setLikedTracks(likedArray);
        console.log("liked", likedArray);
      }
    }, []);
  }

  function onChangeLastPlayed(ID) {
    setLastPlayed(ID);
    localStorage.setItem("LastPlayed", ID);
  }
  audio.addEventListener("timeupdate", (event) => {
    setCurrentTimer(event.target.currentTime);
  });
  audio.addEventListener("timeupdate", (event) => {
    if (currentDuration === isNaN) {
      setCurrentDuration("0:00");
    }
    setCurrentDuration(event.target.duration);
  });

  return (
    <>
      <Header navi={currentNavi} header={Library[lastPlayed - 1].TRACK} />
      <Cover Library={Library} navi={currentNavi} track={lastPlayed} />
      <Playlist
        setSongList={setSongList}
        navi={currentNavi}
        Albumlist={AlbumLib}
        PlayAlbum={PlayAlbum}
        playSong={playSong}
        songList={songList}
        Library={Library}
        lastPlayed={lastPlayed}
        likedTracks={likedTracks}
        setLikedTracks={setLikedTracks}
        setCurrentNavi={setCurrentNavi}
        PlayAllTracks={PlayAllTracks}
      />
      <Info trackID={lastPlayed} Library={Library} navi={currentNavi} />
      <Console
        setConsoleStatus={setConsoleStatus}
        handle={handleConsole}
        navi={currentNavi}
        consoleStatus={consoleStatus}
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
