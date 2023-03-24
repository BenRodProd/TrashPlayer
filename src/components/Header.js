export default function Header({ id }) {
  console.log(id);
  if (id === "1") {
    document.body.style.backgroundColor = "black";
  } else if (id === "2") {
    document.body.style.backgroundColor = "yellow";
  } else if (id === "3") {
    document.body.style.backgroundColor = "red";
  } else if (id === "4") {
    document.body.style.backgroundColor = "blue";
  }
}
