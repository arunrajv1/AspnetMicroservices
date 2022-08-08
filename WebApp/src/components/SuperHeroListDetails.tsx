import { Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { getAllData } from "../services/SuperHeroServices";
import DataTable from "./common/ElementsUI/DataTable";

const column = [
  { field: "id", headerName: "ID", type: "number", width: 100 },
  { field: "name", headerName: "Name", width: 140 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "place", headerName: "Place", width: 200 },
];

const SuperHeroListDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let response = getAllData().then((res) => {
      if (res.status == 200) {
        setData(res.data);
      }
    });
    console.log("API response", response, data);
  }, []);

  return (
    <>
      <p>This is list page</p>
      <div style={{ height: 400}}>
        <DataTable rows={data} columns={column}></DataTable>
      </div>
    </>
  );
};

export default SuperHeroListDetails;
