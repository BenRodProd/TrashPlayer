// const [navi, setNavi] = useState(1);
export default function Navigation({ setCurrentNavi }) {
  function clicked(event) {
    setCurrentNavi(event.target.id);
  }
  return (
    <div className="navigation">
      <button type="button" id="albums" onClick={clicked}>
        Albums
      </button>
      <button type="button" id="liked" onClick={clicked}>
        Liked
      </button>
      <button type="button" id="playlist" onClick={clicked}>
        Playlist
      </button>
      <button type="button" id="all" onClick={clicked}>
        All Tracks
      </button>
    </div>
  );
}
