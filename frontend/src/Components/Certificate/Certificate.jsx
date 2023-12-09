import './Certificate1.css';

export function Certificate({ name, course, date,instructor }) {
  return (
    <div className="App">
      <p className="byline"></p>
      <div className="content">
        <p>This certificate is presented to</p>
        <h1>{name}</h1>
        <p>for successfully demonstrating exceptional knowledge and proficiency by passing<p>
          </p> the course: {course}. Issued on {date} ,<p>
            </p> this accomplishment signifies [his/her] commitment to excellence, dedication<p>
              </p> to continuous learning, and mastery of the course content. </p>
        <h2>{instructor}</h2>
      </div>
    </div>
  );
}

Certificate.defaultProps = {
  name: 'James Lee',
  course: 'Data Structures and Algorithms',
  date: 'March 15 2021',
  instructor: 'Engr. James Yohan Curises'
}



