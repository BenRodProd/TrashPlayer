export default function PlayGenre({ Library, OnPlayAlbum }) {
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
    function playTheGenre() {}
    for (let j = 0; j < genreCover[i].length; j++) {
      CoverNow = genreCover[i][j].COVERURL;

      html.push(
        <>
          <img
            onClick={() => OnPlayAlbum(genreCover[i][j].ALBUMID)}
            className="genreImage"
            alt="Cover"
            src={"http://" + CoverNow}
            key={CoverNow}
            id={CoverNow}
          ></img>
        </>
      );
    }
    html.push(<p onClick={playTheGenre()}>{allGenres[i]}</p>);
    return html;
  }
  return (
    <div className="genrelist">
      <ul className="genreDiv">
        {allGenres.map((el) => getCovers(allGenres.indexOf(el)))}
        {/* {allGenres.map((el) => (
         
        ))} */}
      </ul>
    </div>
  );
}
