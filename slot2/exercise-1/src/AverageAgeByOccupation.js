function AverageAgeByOccupation() {
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
      acc[occupation] = { totalAge: 0, count: 0 };
    }
    acc[occupation].totalAge += person.age;
    acc[occupation].count += 1;
    return acc;
  }, {});

  const averageAges = Object.keys(groupedByOccupation).map(occupation => ({
    occupation,
    averageAge: (groupedByOccupation[occupation].totalAge / groupedByOccupation[occupation].count).toFixed(2)
  }));

  return (
    <div>
      <h2>Average Age by Occupation</h2>
      <ul>
        {averageAges.map((item, index) => (
          <li key={index}>
            {item.occupation}: {item.averageAge} years
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AverageAgeByOccupation;