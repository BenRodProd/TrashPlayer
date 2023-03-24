import { useState, useEffect } from "react";
import Header from "./Header";
import Cover from "./Cover";
import Console from "./Console";
import Playlist from "./Playlist";
import FetchLib from "./FetchLib";
import Navigation from "./Navigation.js";

export default function Main() {
  const Library = FetchLib();
  // console.log(Library[1].TITLE);
  //   const local = FetchLocal();
  FetchLocal();
  const [currentNavi, setCurrentNavi] = useState("1");
  console.log("main id ", currentNavi);
  return (
    <>
      <Header id={currentNavi} />
      <Cover />
      <Playlist />
      <Console />
      <Navigation setCurrentNavi={setCurrentNavi} />
    </>
  );
  function FetchLocal() {
    const [lastPlayed, setLastPlayed] = useState([]);

    useEffect(() => {
      const lastPlayed = JSON.parse(localStorage.getItem("LastPlayed"));
      if (lastPlayed) {
        setLastPlayed(lastPlayed);
      }
    }, []);
    const [likedTracks, setLikedTracks] = useState([]);

    useEffect(() => {
      const likedTracks = JSON.parse(localStorage.getItem("liked"));
      if (likedTracks) {
        setLikedTracks(likedTracks);
      }
    }, []);
    if (lastPlayed === "") {
      setLastPlayed(1);
      console.log(lastPlayed);
    }
  }
}
