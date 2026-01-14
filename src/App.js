import { useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { data } from './Data';

ModuleRegistry.registerModules([AllCommunityModule]);


function App() {
  const [searchText, setSearchText] = useState("");

  const columnDefs = useMemo(() => [
    { field: "id", width: 45 },
    {
      headerName: "Name",
      valueGetter: (params) =>
        `${params.data.firstName} ${params.data.lastName}`,
      filter: true,
      width: 140,
    },

    { field: "email", filter: true },
    { field: "department", filter: true },
    { field: "position", filter: true },
    {
      field: "salary",
      filter: "agNumberColumnFilter",
      valueFormatter: (p) => `$${p.value.toLocaleString()}`
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      filter: "agDateColumnFilter",
      valueFormatter: (p) =>
        new Date(p.value).toLocaleDateString()
    },
    { field: "age", filter: "agNumberColumnFilter" },
    { field: "location", filter: true },
    {
      field: "performanceRating",
      headerName: "Rating",
      filter: "agNumberColumnFilter"
    },
    { field: "projectsCompleted" },
    {
      field: "isActive",
      headerName: "Active",
      valueFormatter: (p) => (p.value ? "Yes" : "No"),
      filter: true
    },
    {
      field: "skills",
      valueFormatter: (p) => p.value.join(", ")
    },
    { field: "manager" }
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }), []);

  return (
    <div style={{ padding: 20 }}>
      <h2>AG Grid Dashboard</h2>

      <>
        <input
          type="text"
          placeholder="Search employees..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 10, padding: 8, width: 300 }}
        />

        <div
          className=""
          style={{ height: 500, width: "100%" }}
        >
          <AgGridReact
            rowData={data.employees}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            quickFilterText={searchText}
            pagination={true}
            paginationPageSize={10}
            animateRows={true}
          />
        </div>
      </>
    </div>
  );
}

export default App;
