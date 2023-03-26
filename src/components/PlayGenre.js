export default function PlayGenre(Library) {
  const genres = Library.Library.map((el) => {
    return el.GENRE;
  });

  const allGenres = Array.from(new Set(genres));
  console.log("allGenres", allGenres);
  const genreCover = [];
  for (let i = 0; i < allGenres.length; i++) {
    genreCover.push(
      Library.Library.filter((el) => {
        return el.GENRE === allGenres[i];
      })
    );
  }
  console.log("genreCover", genreCover);

  return (
    <div className="genrelist">
      <ul className="list">
        {allGenres.map((el) =>
          genreCover.map((element) => (
            <img
              alt="Cover"
              src={"http://" + element.COVERURL}
              key={element.ID}
              id={element.ID}
            ></img>
          ))
        )}
      </ul>
    </div>
  );
}
