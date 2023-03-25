export default function Playlist({
  navi,
  list,
  PlayAlbum,
  playSong,
  songList,
  Library,
}) {
  if (navi === "albums") {
    return (
      <div className="cover">
        {list.map((album) => (
          <img
            key={album.ALBUMID}
            id={album.ALBUMID}
            onClick={() => PlayAlbum(album.ALBUMID)}
            className="coverImage"
            src={"http://" + album.COVERURL}
            alt="Cover"
          ></img>
        ))}
      </div>
    );
  } else if (navi === "player") {
    return (
      <div className="playlist">
        <ul className="list">
          {/* {songList.map((track) => (
            <li
              key={Library[track].ID}
              id={Library[track].ID}
              onClick={() => playSong(track.ID)}
              className="coverImage"
              alt="Cover"
            >
              {track.TRACK}
            </li>
          ))} */}
        </ul>
      </div>
    );
  }
}
