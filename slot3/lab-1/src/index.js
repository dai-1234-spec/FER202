import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EmployeeDetails from './EmployeeDetail';
import EmployeeList from './EmployeeList';
import EmployeeTable from './EmployeeTable';
import AverageAge from './AverageAge';
import EmployeeDropdown from './EmployeeDropdown';
import ITemployees from './ITEmployees';
import SortedEmployees from "./SortedEmployees";
import GroupByDepartment from "./GroupByDepartment";
import CheckTeenager from "./CheckTeenager";
import SearchEmployee from "./SearchEmployee";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmployeeDetails/>
    <EmployeeList/>
    <EmployeeTable/>
    <AverageAge/>
    <EmployeeDropdown/>
    <ITemployees/>
    <SortedEmployees />
    <GroupByDepartment />
    <CheckTeenager />
    <SearchEmployee />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
