function OldestAndYoungest() {
  const people = [
    { name: "Alice", age: 25, occupation: "Engineer" },
    { name: "Bob", age: 30, occupation: "Designer" },
    { name: "Charlie", age: 19, occupation: "Student" },
    { name: "David", age: 17, occupation: "Student" },
    { name: "Eve", age: 28, occupation: "Engineer" }
  ];

  const oldest = people.reduce((max, person) => (person.age > max.age ? person : max), people[0]);
  const youngest = people.reduce((min, person) => (person.age < min.age ? person : min), people[0]);

  return (
    <div>
      <h2>Oldest and Youngest Person</h2>
      <p>
        Oldest: Name: {oldest.name}, Age: {oldest.age}, Occupation: {oldest.occupation}
      </p>
      <p>
        Youngest: Name: {youngest.name}, Age: {youngest.age}, Occupation: {youngest.occupation}
      </p>
    </div>
  );
}

export default OldestAndYoungest;