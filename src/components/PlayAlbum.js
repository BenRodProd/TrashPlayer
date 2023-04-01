import { v4 as uuidv4 } from "uuid";
export default function PlayAlbum({ albumList }) {
  return (
    <div key={uuidv4()} className="AlbumList">
      {albumList.map((album) => (
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
}
