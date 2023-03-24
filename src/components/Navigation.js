// const [navi, setNavi] = useState(1);
export default function Navigation({ setCurrentNavi }) {
  function clicked(event) {
    console.log("nav id", event.target.id);
    setCurrentNavi(event.target.id);
  }
  return (
    <div className="navigation">
      <button type="button" id="1" onClick={clicked}>
        Albums
      </button>
      <button type="button" id="2" onClick={clicked}>
        Liked
      </button>
      <button type="button" id="3" onClick={clicked}>
        Playlist
      </button>
      <button type="button" id="4" onClick={clicked}>
        All Tracks
      </button>
    </div>
  );
}
