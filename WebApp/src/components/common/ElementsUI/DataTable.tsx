import React from "react";
import { DataGrid } from "@mui/x-data-grid";


const DataTable: React.FC<any> = (row) => {
  return (
    <>
      <DataGrid rows={row.rows} columns={row.columns} pageSize={5} rowsPerPageOptions={[5]}/>
    </>
  );
};

export default DataTable;
