export default function Cover({ Library, track, navi }) {
  if (navi !== "player") {
    return <></>;
  } else {
    return (
      <div className="container-m cover">
        <img
          className="coverImage"
          src={"http://" + Library[track - 1].COVERURL}
          alt="CoverPicture"
        ></img>
      </div>
    );
  }
}
