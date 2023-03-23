import Data from "../ressource/Library.json";
export default function FetchLib() {
  //   //   fetcher();
  //   await fetch("../ressource/Library.json")
  //     .then((response) => response.json())
  //     .then((Data) => console.log(Data));
  //   const exporter = JSON.parse(Data);
  return Data;
}
// function fetcher() {
//   fetch("/Users/benrodprod/react-player/trashplayer/src/ressource/Library.json")
//     .then((response) => response.json())
//     .then((Librarystring) => {
//       //   const LibraryArray = Librarystring.split(",");

//       //   const LibraryEntries = LibraryArray.map((str) => str.split(":"));
//       //   const LibraryObj = Object.fromEntries(LibraryEntries);
//       console.log("Yeah", Librarystring);
//       return Librarystring;
//     });
// }
