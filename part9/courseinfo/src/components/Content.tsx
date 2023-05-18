import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {parts.map((coursePart, i) => (
        <Part part={coursePart} key={i} />
      ))}
    </div>
  );
};

export default Content;
