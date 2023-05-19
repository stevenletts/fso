import { DiaryEntry } from "../types";
import Diary from "./Diary";

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }): JSX.Element => {
  return (
    <div>
      <h2>Diaries</h2>
      {diaries.map((diaryEntry, i) => (
        <Diary diary={diaryEntry} key={i} />
      ))}
    </div>
  );
};

export default Diaries;
