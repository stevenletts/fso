import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.backgroundMaterial}{" "}
          {part.description}
        </p>
      );
    case "special":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}{" "}
          {part.requirements.map((requirement) => requirement + " ")}
        </p>
      );
    default:
      return assertNever(part);
  }
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `unhandled discriminsated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
