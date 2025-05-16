function PeopleList() {
  const people = [
    { name: "Alice", age: 25, occupation: "Engineer" },
    { name: "Bob", age: 30, occupation: "Designer" },
    { name: "Charlie", age: 19, occupation: "Student" }
  ];

  return (
    <div>
      <h2>List of People</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            Name: {person.name}, Age: {person.age}, Occupation: {person.occupation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleList;