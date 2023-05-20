import axios from "axios";
import React, { useEffect, useState } from "react";

import { DiaryEntry } from "./types";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/diaries/").then((response) => {
      setDiaries(response.data as DiaryEntry[]);
    });
  }, []);

  const addEntry = (entry: object): null => {
    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries/", entry)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
      })
      .catch((error) => {
        setError(error.response.data);
        setTimeout(() => setError(""), 5000);
      });

    return null;
  };

  return (
    <div>
      {error ? <h1>{error}</h1> : null}
      <NewDiary addEntry={addEntry} />
      <Diaries diaries={diaries} />
    </div>
  );
}
export default App;
