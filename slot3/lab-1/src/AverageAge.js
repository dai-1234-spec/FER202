function AverageAge () {
    const employees = [
  { id: 1, name: "Anna", department: "HR", age: 50 },
  { id: 2, name: "Brian", department: "IT", age: 40 },
  { id: 3, name: "Clara", department: "Finance", age: 19 },
  { name: "Ann", department: "Finance", age: 22 },
  { name: "Elisabeth", department: "HR", age: 16 }
];

const AverageAge = (...ages) =>{
    const total = ages.reduce((sum, age) => sum + age,0);
    return (total / ages.length).toFixed(2);
};

const ages = employees.map(employee => employee.age);
const avg = AverageAge(...ages);

return (
    <div>
        <h2>Average Age of Employees</h2>
        <p>Average Age:{avg} years</p>
    </div>
);
}
export default AverageAge;