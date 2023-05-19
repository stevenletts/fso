import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { DiaryEntry } from "./types";
import Diaries from "./components/Diaries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/diaries/").then((response) => {
      setDiaries(response.data as DiaryEntry[]);
    });
  }, []);

  return (
    <div>
      <Diaries diaries={diaries} />
    </div>
  );
}
export default App;
