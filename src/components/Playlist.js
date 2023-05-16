import { v4 as uuidv4 } from "uuid";
import PlayGenre from "./PlayGenre";
import { useEffect, useRef } from "react";
export default function Playlist({
  navi,
  Albumlist,
  PlayAlbum,
  playSong,
  songList,
  Library,
  lastPlayed,
  likedTracks,
  LikeTrack,
  setSongList,
  PlayAllTracks,
  setConsoleStatus,
}) {
  const songListRef = useRef(null);

  function HandlePlayAlbum(id) {
    PlayAlbum(id);
  }

  function isPlaying(Number) {
    if (+lastPlayed === +Number) {
      return "track active";
    } else {
      return "track";
    }
  }
  useEffect(() => {
    if (songListRef.current && lastPlayed !== null) {
      const activeSongElement =
        songListRef.current.querySelector(".track.active");
      if (activeSongElement) {
        activeSongElement.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }
    }
  }, [lastPlayed]);

  useEffect(() => {
    if (navi === "albums" || navi === "genre" || navi === "liked") {
      setConsoleStatus("pause");
    }
    if (navi === "all") {
      PlayAllTracks();
    }
  }, [navi, setConsoleStatus, PlayAllTracks]);

  useEffect(() => {
    if (navi === "liked") {
      setSongList(likedTracks);
    }
  }, [navi, likedTracks, setSongList]);

  if (navi === "albums") {
    return (
      <div key={uuidv4()} className="AlbumList">
        {Albumlist.map((album) => (
          <div key={uuidv4()}>
            <span key={uuidv4()}>
              <img
                key={uuidv4()}
                id={album.ALBUMID}
                onClick={() => PlayAlbum(album.ALBUMID)}
                className="AlbumImage"
                src={album.COVERURL}
                alt="Cover"
              ></img>
              <p key={uuidv4()}>{album.TITLE}</p>
              <p key={uuidv4()}>{album.GENRE}</p>
              <p key={uuidv4()} className="release">
                {album.RELEASE}
              </p>
            </span>
          </div>
        ))}
      </div>
    );
  } else if (navi === "player") {
    return (
      <div key={uuidv4()} className="tracklist">
        <ul key={uuidv4()} ref={songListRef} className="list">
          {songList.map((track, index) => (
            <div className="listWrapper" key={uuidv4()}>
              <li
                key={uuidv4()}
                id={Library[Number(track) - 1].TRACKID}
                onClick={() => playSong(Library[Number(track) - 1].TRACKID)}
                alt="Cover"
                className={isPlaying(Library[Number(track) - 1].TRACKID)}
              >
                {index + 1}. {Library[Number(track) - 1].TRACK}
              </li>
              <button
                type="button"
                key={uuidv4()}
                className={
                  likedTracks.includes(
                    Number(Library[Number(track) - 1].TRACKID)
                  )
                    ? "likeButton liked"
                    : "likeButton"
                }
                onClick={() =>
                  LikeTrack(Number(Library[Number(track) - 1].TRACKID))
                }
              >
                ❤️
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  } else if (navi === "liked") {
    return (
      <div key={uuidv4()} className="likedlist">
        <ul key={uuidv4()} className="list">
          {likedTracks.map((track, index) => (
            <div key={uuidv4()} className="listWrapper">
              <li
                key={uuidv4()}
                id={Library[Number(track) - 1].TRACKID}
                onClick={() => playSong(Library[Number(track) - 1].TRACKID)}
                alt="Cover"
                className={` ${
                  Library[Number(track) - 1].TRACKID === lastPlayed
                    ? "track active"
                    : "track"
                }`}
              >
                {index + 1}. {Library[Number(track) - 1].TRACK}
              </li>
              <button
                type="button"
                key={uuidv4()}
                className={
                  likedTracks.includes(
                    Number(Library[Number(track) - 1].TRACKID)
                  )
                    ? "likeButton liked"
                    : "likeButton"
                }
                onClick={() =>
                  LikeTrack(Number(Library[Number(track) - 1].TRACKID))
                }
              >
                ❤️
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  } else if (navi === "genre") {
    return (
      <PlayGenre
        setSongList={setSongList}
        Library={Albumlist}
        OnPlayAlbum={HandlePlayAlbum}
        playSong={playSong}
        songList={songList}
      />
    );
  }
}
