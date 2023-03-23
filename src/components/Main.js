import Header from "./Header";
import Cover from "./Cover";
import Console from "./Console";
import Playlist from "./Playlist";
import FetchLib from "./FetchLib";
import FetchLocal from "./FetchLocal";
export default function Main() {
  const Library = FetchLib();
  console.log(Library[1].TITLE);
  //   const local = FetchLocal();
  return (
    <>
      <Header />
      <Cover />
      <Playlist />
      <Console />
    </>
  );
}
