function EmployeeList() {
    const employees = [
  { id: 1, name: "Anna", department: "HR", age: 50 },
  { id: 2, name: "Brian", department: "IT", age: 40 },
  { id: 3, name: "Clara", department: "Finance", age: 19 },
  { name: "Ann", department: "Finance", age: 22 },
  { name: "Elisabeth", department: "HR", age: 16 }
];

return (
    <div>
        <h2>List of Employees</h2>
        <ul>
            {employees.map((employee, index) => (
                <li key={employees.id || index}>
                    Name: {employee.name}, Department: {employee.department}
                </li>
            ))}
        </ul>
    </div>
);
}
export default EmployeeList;