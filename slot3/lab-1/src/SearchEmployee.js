import { useState } from "react";

function SearchEmployee() {
  const employees = [
    { id: 1, name: "Anna", department: "HR", age: 50 },
    { id: 2, name: "Brian", department: "IT", age: 40 },
    { id: 3, name: "Clara", department: "Finance", age: 19 },
    { name: "Ann", department: "Finance", age: 22 },
    { name: "Elisabeth", department: "HR", age: 16 }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Search Employee by Name</h2>
      <input
        type="text"
        placeholder="Enter name to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredEmployees.map((employee, index) => (
          <li key={employee.id || index}>
            Name: {employee.name}, Department: {employee.department}, Age: {employee.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchEmployee;