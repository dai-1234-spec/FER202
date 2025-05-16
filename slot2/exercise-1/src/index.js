import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NamePerson from "./NamePerson";
import PersonDetails from "./PersonDetails";
import PeopleList from "./PeopleList";
import PeopleTable from "./PeopleTable";
import FirstTeenager from "./FirstTeenager";
import AreAllTeenagers from "./AreAllTeenagers";
import SortedPeople from "./SortedPeople";
import GroupByOccupation from "./GroupByOccupation";
import AverageAgeByOccupation from "./AverageAgeByOccupation";
import OldestAndYoungest from "./OldestAndYoungest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <NamePerson />
    <PersonDetails />
    <PeopleList />
    <PeopleTable />
    <FirstTeenager />
    <AreAllTeenagers />
    <SortedPeople />
    <GroupByOccupation />
    <AverageAgeByOccupation />
    <OldestAndYoungest />
  </React.StrictMode>
);

reportWebVitals();