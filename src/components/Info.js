export default function Info({ trackID, Library, navi }) {
  if (navi === "player") {
    return (
      <div className="info">
        <p>Artist: {Library[trackID - 1].ARTIST}</p>
        <p>Title: {Library[trackID - 1].TRACK}</p>
        <p>Released: {Library[trackID - 1].YEAR}</p>
        <p>Genre: {Library[trackID - 1].GENRE}</p>
      </div>
    );
  } else if (navi === "liked") {
    return (
      <div className="info">
        <p>Artist: {Library[trackID - 1].ARTIST}</p>
        <p>Title: {Library[trackID - 1].TRACK}</p>
        <p>Released: {Library[trackID - 1].YEAR}</p>
        <p>Genre: {Library[trackID - 1].GENRE}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
