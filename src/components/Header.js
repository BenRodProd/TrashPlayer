export default function Header({ navi, header }) {
  if (navi === "albums") {
    return (
      <div className="main_content">
        <h1>ALBUMS</h1>
      </div>
    );
  } else if (navi === "liked") {
    return (
      <div className="main_content">
        <h1>YOUR LIKED TRACKS</h1>
      </div>
    );
  } else if (navi === "playlist") {
    return (
      <div className="main_content">
        <h1>YOUR PLAYLIST</h1>
      </div>
    );
  } else if (navi === "all") {
    return (
      <div className="main_content">
        <h1>PLAY ALL TRACKS</h1>
      </div>
    );
  } else if (navi === "player") {
    return (
      <div className="main_content">
        <h1>{header}</h1>
      </div>
    );
  }
}
