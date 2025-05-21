function ITemployees () {
    const employees = [
    { id: 1, name: "Anna", department: "HR", age: 50 },
    { id: 2, name: "Brian", department: "IT", age: 40 },
    { id: 3, name: "Clara", department: "Finance", age: 19 },
    { name: "Ann", department: "Finance", age: 22 },
    { name: "Elisabeth", department: "HR", age: 16 }
  ];

  const itEmployees = employees.filter(employee => employee.department === "IT")

  return (
    <div>
        <h2> IT Department Employees</h2>
        <ul>
            {itEmployees.map((employee, index) => (
                <li key={employee.id || index}>
                    Name: {employee.name}, Age:{employee.age}
                </li>
            ))}
        </ul>
    </div>
  );
}
export default ITemployees;