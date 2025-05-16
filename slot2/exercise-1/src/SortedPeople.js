function SortedPeople() {
  const people = [
    { name: "Alice", age: 25, occupation: "Engineer" },
    { name: "Bob", age: 30, occupation: "Designer" },
    { name: "Charlie", age: 19, occupation: "Student" },
    { name: "David", age: 17, occupation: "Student" },
    { name: "Eve", age: 28, occupation: "Engineer" }
  ];

  const sortedPeople = [...people].sort((a, b) => {
    if (a.occupation < b.occupation) return -1;
    if (a.occupation > b.occupation) return 1;
    return a.age - b.age;
  });

  return (
    <div>
      <h2>Sorted People by Occupation and Age</h2>
      <ul>
        {sortedPeople.map((person, index) => (
          <li key={index}>
            Name: {person.name}, Age: {person.age}, Occupation: {person.occupation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortedPeople;