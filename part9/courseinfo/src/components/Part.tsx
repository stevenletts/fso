import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};

export default Part;
