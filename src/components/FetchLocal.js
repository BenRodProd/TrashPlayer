import { useState, useEffect } from "react";
export default function FetchLocal() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const lastPlayed = JSON.parse(localStorage.getItem("LastPlayed"));
    if (lastPlayed) {
      setItems(lastPlayed);
    }
  }, []);
}
