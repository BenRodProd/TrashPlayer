export default function Header({ id }) {
  console.log(id);
  if (id === "1") {
    return (
      <div className="main_content">
        <h1>ALBUMS</h1>
      </div>
    );
  } else if (id === "2") {
    return (
      <div className="main_content">
        <h1>YOUR LIKED TRACKS</h1>
      </div>
    );
  } else if (id === "3") {
    return (
      <div className="main_content">
        <h1>YOUR PLAYLIST</h1>
      </div>
    );
  } else if (id === "4") {
    return (
      <div className="main_content">
        <h1>PLAY ALL TRACKS</h1>
      </div>
    );
  }
}
