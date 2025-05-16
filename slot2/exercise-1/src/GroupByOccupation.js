function GroupByOccupation() {
  const people = [
    { name: "Alice", age: 25, occupation: "Engineer" },
    { name: "Bob", age: 30, occupation: "Designer" },
    { name: "Charlie", age: 19, occupation: "Student" },
    { name: "David", age: 17, occupation: "Student" },
    { name: "Eve", age: 28, occupation: "Engineer" }
  ];

  const groupedByOccupation = people.reduce((acc, person) => {
    const occupation = person.occupation;
    if (!acc[occupation]) {
      acc[occupation] = [];
    }
    acc[occupation].push(person);
    return acc;
  }, {});

  return (
    <div>
      <h2>Group People by Occupation</h2>
      {Object.keys(groupedByOccupation).map((occupation, index) => (
        <div key={index}>
          <h3>{occupation}</h3>
          <ul>
            {groupedByOccupation[occupation].map((person, idx) => (
              <li key={idx}>
                Name: {person.name}, Age: {person.age}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default GroupByOccupation;