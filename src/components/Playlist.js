export default function Playlist({
  navi,
  Albumlist,
  PlayAlbum,
  playSong,
  songList,
  Library,
  lastPlayed,
}) {
  if (navi === "albums") {
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
            </span>
          </>
        ))}
      </div>
    );
  } else if (navi === "player") {
    // console.log("playlist", songList[0], Library[songList[0]].TRACKID);
    console.log("last", lastPlayed);
    return (
      <div className="tracklist">
        <ul className="list">
          {songList.map((track) => (
            <li
              key={Library[Number(track) - 1].TRACKID}
              id={Library[Number(track) - 1].TRACKID}
              onClick={() => playSong(Library[Number(track) - 1].TRACKID)}
              alt="Cover"
              className={` ${
                Library[Number(track) - 1].TRACKID === lastPlayed
                  ? "track active"
                  : "track"
              }`}
            >
              {track}. {Library[Number(track) - 1].TRACK}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
