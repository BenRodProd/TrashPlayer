export default function Cover({ imageSrc }) {
  console.log("image", imageSrc);
  return (
    <div className="container-m cover">
      <img class="coverImage" src={imageSrc} alt="CoverPicture"></img>
    </div>
  );
}
