import { DiaryEntry } from "../types";

const Diary = ({ diary }: { diary: DiaryEntry }): JSX.Element => {
  return (
    <div>
      <strong>{diary.date}</strong>
      <ul>
        <li>{diary.weather}</li>
        <li>{diary.visibility}</li>
      </ul>{" "}
    </div>
  );
};

export default Diary;
