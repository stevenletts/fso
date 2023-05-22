import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { CoursePart, courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const coursePartsList: CoursePart[] = courseParts;

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={coursePartsList} />
      <Total parts={coursePartsList} />
    </div>
  );
};

export default App;
