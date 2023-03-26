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
  setLikedTracks,
  setSongList,
  setCurrentNavi,
  PlayAllTracks,
  playGenre,
  genreHtml,
}) {
  let count = 1;
  function handleCounter() {
    count++;
  }
  function LikeTrack(ID) {
    if (likedTracks.includes(ID)) {
      const newlikedTracks = likedTracks.filter((el) => {
        return el !== ID;
      });
      setLikedTracks(newlikedTracks);
      localStorage.setItem("liked", newlikedTracks);
    } else {
      likedTracks.push(ID);
      setLikedTracks(likedTracks);
      localStorage.setItem("liked", likedTracks);
    }
  }
  count = 1;

  if (navi === "albums") {
    return (
      <div className="AlbumList">
        {Albumlist.map((album) => (
          <>
            <span>
              <img
                key={album}
                id={album.ALBUMID}
                onClick={() => PlayAlbum(album.ALBUMID)}
                className="AlbumImage"
                src={"http://" + album.COVERURL}
                alt="Cover"
              ></img>
              <p>{album.TITLE}</p>
              <p>{album.GENRE}</p>
              <p className="release">{album.RELEASE}</p>
            </span>
          </>
        ))}
      </div>
    );
  } else if (navi === "player") {
    count = 1;
    return (
      <div className="tracklist">
        <ul className="list">
          {songList.map((track) => (
            <>
              <li
                key={track}
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
                  key={track}
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
    count = 1;
    setSongList(likedTracks);
    return (
      <div className="tracklist">
        <ul className="list">
          {likedTracks.map((track) => (
            <>
              <li
                key={track}
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
                  key={likedTracks[track]}
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
    return <PlayGenre Library={Library} />;
  }
}
