function FirstTeenager() {
  const people = [
  { name: "Alice", age: 25, occupation: "Engineer" },
  { name: "Bob", age: 30, occupation: "Designer" },
  { name: "Charlie", age: 19, occupation: "Student" },
  { name: "David", age: 17, occupation: "Student" },
  { name: "Eve", age: 28, occupation: "Engineer" }
];

  const teenager = people.find(person => person.age >= 13 && person.age <= 19);

  return (
    <div>
      <h2>First Teenager</h2>
      {teenager ? (
        <p>
          Name: {teenager.name}, Age: {teenager.age}, Occupation: {teenager.occupation}
        </p>
      ) : (
        <p>No teenager found.</p>
      )}
    </div>
  );
}

export default FirstTeenager;