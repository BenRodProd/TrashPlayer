export default function Info({ trackID, Library, navi }) {
  if (navi === "player") {
    return (
      <div className="info">
        <p className="InfoText"> Artist: {Library[trackID - 1].ARTIST}</p>
        <p className="InfoText">Title: {Library[trackID - 1].TRACK}</p>
        <p className="InfoText">Released: {Library[trackID - 1].YEAR}</p>
        <p className="InfoText">Genre: {Library[trackID - 1].GENRE}</p>
      </div>
    );
  } else if (navi === "liked") {
    return (
      <div className="info">
        <p className="InfoText">Artist: {Library[trackID - 1].ARTIST}</p>
        <p className="InfoText">Title: {Library[trackID - 1].TRACK}</p>
        <p className="InfoText">Released: {Library[trackID - 1].YEAR}</p>
        <p className="InfoText">Genre: {Library[trackID - 1].GENRE}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
