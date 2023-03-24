import { useState, useEffect } from "react";
import Header from "./Header";
import Cover from "./Cover";
import Console from "./Console";
import Playlist from "./Playlist";
import FetchLib from "./FetchLib";
import Navigation from "./Navigation.js";
import Info from "./Info";
import TimeDisplay from "./TimeDisplay";

export default function Main() {
  const [lastPlayed, setLastPlayed] = useState(1);
  const [currentNavi, setCurrentNavi] = useState("1");
  const [likedTracks, setLikedTracks] = useState([]);
  const [consoleStatus, setConsoleStatus] = useState("pause");

  const Library = FetchLib();

  const [imageSrc, setImageSrc] = useState("http://" + Library[1][1].COVERURL);
  const [trackSrc, setTrackSrc] = useState("http://" + Library[1][1].URL);
  console.log(trackSrc);
  //   const local = FetchLocal();
  FetchLocal();
  console.log("lastplaxed", lastPlayed);

  return (
    <>
      <Header id={currentNavi} />
      <Cover imageSrc={imageSrc} />
      <Playlist />
      <Info />
      <Console consoleStatus={consoleStatus} />
      <TimeDisplay />
      <Navigation setCurrentNavi={setCurrentNavi} />
      <audio autoplay data-js="mp3" preload="metadata" id="mp3"></audio>
    </>
  );
  function FetchLocal() {
    useEffect(() => {
      const lastPlayed = JSON.parse(localStorage.getItem("LastPlayed"));
      if (lastPlayed) {
        setLastPlayed(lastPlayed);
        console.log("last", lastPlayed);
      }
    }, []);

    useEffect(() => {
      const likedTracks = JSON.parse(localStorage.getItem("liked"));
      if (likedTracks) {
        setLikedTracks(likedTracks);
      }
    }, []);
    if (!lastPlayed) {
      setLastPlayed(1);
      console.log("lastplayed", lastPlayed);
    }
  }
}
