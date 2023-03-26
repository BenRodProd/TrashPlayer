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
    count = 1;
    const allTracks = Library.map((el) => {
      return el.TRACKID;
    });
    setSongList(allTracks);
    return (
      <div className="tracklist">
        <ul className="list">
          {Library.map((track) => (
            <>
              <li
                key={track}
                id={track.TRACKID}
                onClick={() => playSong(track.TRACKID)}
                alt="Cover"
                className={` ${
                  track.TRACKID === lastPlayed ? "track active" : "track"
                }`}
              >
                {count}. {track.TRACK}
                <button
                  type="button"
                  key={likedTracks[track]}
                  className={
                    likedTracks.includes(track.TRACKID)
                      ? "likeButton liked"
                      : "likeButton"
                  }
                  onClick={() => LikeTrack(track.TRACKID)}
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
  }
}
