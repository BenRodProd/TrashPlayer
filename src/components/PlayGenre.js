import { v4 as uuidv4 } from "uuid";
export default function PlayGenre({
  Library,
  OnPlayAlbum,
  songList,
  setSongList,
  playSong,
}) {
  const genres = Library.map((el) => {
    return el.GENRE;
  });

  const allGenres = Array.from(new Set(genres));

  const genreCover = [];
  for (let i = 0; i < allGenres.length; i++) {
    genreCover.push(
      Library.filter((el) => {
        return el.GENRE === allGenres[i];
      })
    );
  }

  function getCovers(i) {
    let CoverNow;
    let html = [];

    for (let j = 0; j < genreCover[i].length; j++) {
      CoverNow = genreCover[i][j].COVERURL;

      html.push(
        <img
          onClick={() => OnPlayAlbum(genreCover[i][j].ALBUMID)}
          className="genreImage"
          alt="Cover"
          src={CoverNow}
          key={uuidv4()}
          id={CoverNow}
        ></img>
      );
    }

    html.push(
      <div key={uuidv4()}>
        <p
          key={uuidv4()}
          className="genreText"
          onClick={() => playTheGenre(allGenres[i])}
        >
          {allGenres[i]}
        </p>
        <p>_____________________________</p>
      </div>
    );

    return html;
  }
  function playTheGenre(genre) {
    const playGenre = Library.filter((el) => {
      return el.GENRE === genre;
    });
    const genreSongList = playGenre
      .map((el) => el.TRACKIDS)
      .join(",")
      .split(",")
      .map(Number);
    setSongList(genreSongList);

    playSong(genreSongList[0]);
  }
  return (
    <ul key={uuidv4()} className="genreDiv">
      {allGenres.map((el) => getCovers(allGenres.indexOf(el)))}
    </ul>
  );
}
