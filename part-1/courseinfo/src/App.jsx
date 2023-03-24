const App = () => {
  const course = "Half Stack application development";

  const parts = [
    { x: "Fundamentals of React", y: 10 },
    { x: "Using props to pass data", y: 7 },
    { x: "State of a component", y: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content part={parts} />
      <Total part={parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  console.log(props.part[0]);
  return (
    <div>
      <Part part={props.part[0].x} exercises={props.part[0].y} />
      <Part part={props.part[1].x} exercises={props.part[1].y} />
      <Part part={props.part[2].x} exercises={props.part[2].y} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.part[0].y + props.part[1].y + props.part[2].y}
    </p>
  );
};

export default App;
