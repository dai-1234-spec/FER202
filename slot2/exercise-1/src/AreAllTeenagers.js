function AreAllTeenagers() {
  const people = [
    { name: "Alice", age: 25, occupation: "Engineer" },
    { name: "Bob", age: 30, occupation: "Designer" },
    { name: "Charlie", age: 19, occupation: "Student" },
    { name: "David", age: 17, occupation: "Student" },
    { name: "Eve", age: 28, occupation: "Engineer" }
  ];

  const allTeenagers = people.every(person => person.age >= 13 && person.age <= 19);

  return (
    <div>
      <h2>Are All Teenagers?</h2>
      <p>{allTeenagers ? "All are teenagers." : "Not all are teenagers."}</p>
    </div>
  );
}

export default AreAllTeenagers;