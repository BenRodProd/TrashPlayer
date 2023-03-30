export default function Header({ navi, header }) {
  if (navi === "albums") {
    return (
      <div className="title">
        <h1>ALBUMS</h1>
      </div>
    );
  } else if (navi === "liked") {
    return (
      <div className="title">
        <h1>YOUR LIKED TRACKS</h1>
      </div>
    );
  } else if (navi === "genre") {
    return (
      <div className="title">
        <h1>Genres</h1>
      </div>
    );
  } else if (navi === "all") {
    return (
      <div className="title">
        <h1>PLAY ALL TRACKS</h1>
      </div>
    );
  } else if (navi === "player") {
    return (
      <div className="title">
        <h1>{header}</h1>
      </div>
    );
  }
}
