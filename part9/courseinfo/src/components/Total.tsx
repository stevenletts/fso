import { CoursePart } from "../types";

const Total = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <p>
      Number of Exercises:{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
