function GroupByDepartment() {
  const employees = [
    { id: 1, name: "Anna", department: "HR", age: 50 },
    { id: 2, name: "Brian", department: "IT", age: 40 },
    { id: 3, name: "Clara", department: "Finance", age: 19 },
    { name: "Ann", department: "Finance", age: 22 },
    { name: "Elisabeth", department: "HR", age: 16 }
  ];

  const groupedByDepartment = employees.reduce((acc, employee) => {
    const department = employee.department;
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(employee);
    return acc;
  }, {});

  return (
    <div>
      <h2>Group Employees by Department</h2>
      {Object.keys(groupedByDepartment).map((department, index) => (
        <div key={index}>
          <h3>{department}</h3>
          <ul>
            {groupedByDepartment[department].map((employee, idx) => (
              <li key={employee.id || idx}>
                Name: {employee.name}, Age: {employee.age}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default GroupByDepartment;