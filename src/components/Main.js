import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Cover from "./Cover";
import Console from "./Console";
import Playlist from "./Playlist";
import FetchLib from "./FetchLib";
import Navigation from "./Navigation.js";
import Info from "./Info";
import TimeDisplay from "./TimeDisplay";
import FetchAlbumLib from "./FetchAlbumLib";

export default function Main() {
  const [lastPlayed, setLastPlayed] = useState(1);
  const [currentNavi, setCurrentNavi] = useState("albums");
  const [likedTracks, setLikedTracks] = useState([]);
  const [consoleStatus, setConsoleStatus] = useState("pause");
  // const [handleConsoleTrigger, setHandleConsoleTrigger] = useState("pause");
  const [albumID, setAlbumID] = useState("1");
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [songList, setSongList] = useState([]);
  const Library = FetchLib();
  const AlbumLib = FetchAlbumLib();

  const audio = document.querySelector('[data-js="mp3"]');
  //   const local = FetchLocal();

  FetchLocal();

  function handleCurrentNavi(navi) {
    setCurrentNavi(navi);
  }
  function LikeTrack(ID) {
    if (likedTracks.includes(ID)) {
      const newlikedTracks = likedTracks.filter((el) => {
        return el !== ID;
      });
      setLikedTracks(newlikedTracks);
      localStorage.setItem("liked", newlikedTracks);
    } else {
      const newlikedTracks = [...likedTracks, ID];
      setLikedTracks(newlikedTracks);
      localStorage.setItem("liked", likedTracks);
    }
  }
  function handleSongList(list) {
    setSongList(list);
  }
  function handleConsole(consoleStatus) {
    if (consoleStatus === "play") {
      audio.play();
      setConsoleStatus(consoleStatus);
    } else if (consoleStatus === "pause") {
      audio.pause();
      setConsoleStatus(consoleStatus);
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

    playSong(newAlbumTracks[0]);
    setSongList(newAlbumTracks);
    setConsoleStatus("play");
  }
  const playSong = useCallback(
    (ID) => {
      audio.pause();
      onChangeLastPlayed(ID);
      setCurrentNavi("player");
      setConsoleStatus("play");

      audio.src = Library[ID - 1].URL;
    },
    [audio, Library, setCurrentNavi]
  );

  function FetchLocal() {
    useEffect(() => {
      const lastPlayed = JSON.parse(localStorage.getItem("LastPlayed"));
      if (lastPlayed) {
        setLastPlayed(lastPlayed);
      }
      if (!lastPlayed) {
        onChangeLastPlayed(1);
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
        setSongList={handleSongList}
        navi={currentNavi}
        Albumlist={AlbumLib}
        PlayAlbum={PlayAlbum}
        playSong={playSong}
        songList={songList}
        Library={Library}
        lastPlayed={lastPlayed}
        likedTracks={likedTracks}
        LikeTrack={LikeTrack}
        setCurrentNavi={handleCurrentNavi}
        PlayAllTracks={PlayAllTracks}
        setConsoleStatus={handleConsole}
      />
      <Info trackID={lastPlayed} Library={Library} navi={currentNavi} />
      <Console
        setConsoleStatus={handleConsole}
        handle={handleConsole}
        navi={currentNavi}
        consoleStatus={consoleStatus}
        currentTimer={currentTimer}
        currentDuration={currentDuration}
        audio={audio}
        setCurrentDuration={setCurrentDuration}
      />

      <TimeDisplay navi={currentNavi} />
      <Navigation setCurrentNavi={handleCurrentNavi} />
    </>
  );
}
