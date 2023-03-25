// const [navi, setNavi] = useState(1);
export default function Navigation({ setCurrentNavi }) {
  function clicked(event) {
    setCurrentNavi(event.target.id);
  }
  return (
    <div className="navigation">
      <button className="Button" type="button" id="albums" onClick={clicked}>
        Albums
      </button>
      <button className="Button" type="button" id="liked" onClick={clicked}>
        Liked
      </button>
      <button className="Button" type="button" id="playlist" onClick={clicked}>
        Playlist
      </button>
      <button className="Button" type="button" id="all" onClick={clicked}>
        All Tracks
      </button>
    </div>
  );
}
