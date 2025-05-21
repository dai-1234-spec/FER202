function EmployeeDropdown () {
    const employees = [
    { id: 1, name: "Anna", department: "HR", age: 50 },
    { id: 2, name: "Brian", department: "IT", age: 40 },
    { id: 3, name: "Clara", department: "Finance", age: 19 },
    { name: "Ann", department: "Finance", age: 22 },
    { name: "Elisabeth", department: "HR", age: 16 }
  ];

  return (
    <div>
        <h2>Select an Employee</h2>
        <select>
            <option value="">-- Select Employee --</option>
            {employees.map((employee, index) => (
                <option key={employee.id || index} value ={employee.name}>
                    {employee.name}
                </option>
            ))}
        </select>
    </div>
  );
}
export default EmployeeDropdown;