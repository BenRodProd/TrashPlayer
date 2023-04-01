import { v4 as uuidv4 } from "uuid";

import PlayGenre from "./PlayGenre";
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
  setConsoleStatus,
  PlayAllTracks,
}) {
  let count = 1;
  function handleCounter() {
    count++;
  }
  function HandlePlayAlbum(id) {
    PlayAlbum(id);
  }

  count = 1;
  function isPlaying(Number) {
    if (lastPlayed == Number) {
      return "track active";
    } else {
      return "track";
    }
  }
  if (navi === "albums") {
    // setConsoleStatus("pause");
    return (
      <div key={uuidv4()} className="AlbumList">
        {Albumlist.map((album, index) => (
          <>
            <span key={uuidv4()}>
              <img
                key={uuidv4()}
                id={album.ALBUMID}
                onClick={() => PlayAlbum(album.ALBUMID)}
                className="AlbumImage"
                src={"http://" + album.COVERURL}
                alt="Cover"
              ></img>
              <p key={uuidv4()}>{album.TITLE}</p>
              <p key={uuidv4()}>{album.GENRE}</p>
              <p key={uuidv4()} className="release">
                {album.RELEASE}
              </p>
            </span>
          </>
        ))}
      </div>
    );
  } else if (navi === "player") {
    count = 1;
    return (
      <div key={uuidv4()} className="tracklist">
        <ul key={uuidv4()} className="list">
          {songList.map((track) => (
            <>
              <li
                key={uuidv4()}
                id={Library[Number(track) - 1].TRACKID}
                onClick={() => playSong(Library[Number(track) - 1].TRACKID)}
                alt="Cover"
                className={isPlaying(Library[Number(track) - 1].TRACKID)}
              >
                {count}. {Library[Number(track) - 1].TRACK}
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
              </li>
              {handleCounter()}
            </>
          ))}
        </ul>
      </div>
    );
  } else if (navi === "liked") {
    // setConsoleStatus("pause");
    count = 1;
    setSongList(likedTracks);
    return (
      <div key={uuidv4()} className="tracklist">
        <ul key={uuidv4()} className="list">
          {likedTracks.map((track) => (
            <>
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
                {count}. {Library[Number(track) - 1].TRACK}
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
              </li>
              {handleCounter()}
            </>
          ))}
        </ul>
      </div>
    );
  } else if (navi === "all") {
    PlayAllTracks();
  } else if (navi === "genre") {
    return <PlayGenre Library={Albumlist} OnPlayAlbum={HandlePlayAlbum} />;
  }
}
