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

  if (navi === "albums") {
    setConsoleStatus("pause");
    return (
      <div className="AlbumList">
        {Albumlist.map((album) => (
          <>
            <span>
              <img
                key={album.ALBUMID}
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
                key={track.TRACKID}
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
                  key={track.ID}
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
    setConsoleStatus("pause");
    count = 1;
    setSongList(likedTracks);
    return (
      <div className="tracklist">
        <ul className="list">
          {likedTracks.map((track) => (
            <>
              <li
                key={track.TRACKID}
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
                  key={track.TRACKID}
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
