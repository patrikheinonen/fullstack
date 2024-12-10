const Header = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
