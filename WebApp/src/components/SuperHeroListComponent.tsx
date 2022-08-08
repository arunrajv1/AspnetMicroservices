import React, { useState } from "react";
import { ISuperHero } from "../interface/ISuperHero";
import axios from "axios";
import { baseUrl } from "../constant/api.url";
import { getAllData, deleteDataById } from "../services/SuperHeroServices";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert, ReactConfirmAlertProps } from "react-confirm-alert";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

// Utility and Callback Functions
const getData = async () => {
  const responseData = await getAllData();
  var data: ISuperHero[] = [
    {
      id: 0,
      name: "",
      firstName: "",
      lastName: "",
      place: "",
      gender: "",
      skills: "",
    },
  ];
  if (responseData.status == 200) {
    data = await responseData.data;
  }
  return data;
};

const parseUserData = (user: ISuperHero) => {
  const { id, name, lastName, firstName, place } = user;
  return {
    id,
    name,
    lastName,
    firstName,
    place,
  };
};

const deleteUser = async (id: number) => {
  const responseData = await deleteDataById(id);
  console.log(responseData);
};

const closePopup = () => {};

const handleDelete = (id: number) => {
  confirmAlert({
    title: "Confirm to delete",
    message: "Are you sure to delete this record?",
    buttons: [
      {
        label: "Yes",
        onClick: () => deleteUser(id),
      },
      {
        label: "No",
      },
    ],
  });
};

const SuperHeroListComponent: React.FC = () => {
  const [state, setState] = useState({
    users: [{}],
    pageTitle: "Fetching list of all superheroes",
  });
  state.users = [
    {
      id: 0,
      name: "",
      firstName: "",
      lastName: "",
      place: "",
      gender: "",
      skills: "",
    },
  ];
  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 70 },
    { field: "name", headerName: "Name", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "place", headerName: "Place", width: 90 },
    // { field: "action", headerName: "Action", width: 90 },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const generateUserCard = (user: any, key: number) => {
    const { id, name, firstName, lastName, place } = user;
    return (
      <div key={key} style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      // <tr key={key}>
      //   {id ? (
      //     <>
      //       <td>{id}</td>
      //       <td>{name}</td>
      //       <td>{firstName}</td>
      //       <td>{lastName}</td>
      //       <td>{place}</td>
      //       <td>
      //         <button
      //           type="button"
      //           className="btn btn-danger btn-sm"
      //           onClick={() => handleDelete(id)}
      //         >
      //           Delete
      //         </button>
      //         <button type="button" className="btn btn-primary btn-sm">
      //           Edit
      //         </button>
      //       </td>
      //     </>
      //   ) : (
      //     <>
      //       <td colSpan={6}>No data found!!</td>
      //     </>
      //   )}
      // </tr>
    );
  };

  // const setDelete = () => {
  //   setIsDelete(true);
  // };

  const fetchAllData = async () => {
    const responseData = await getData();
    if (responseData) {
      //<AlertComponent type={"success"} text={"hello"} isShow={true}></AlertComponent>;
    }
    const users = responseData.map(parseUserData);
    return setState({ ...state, users: [...responseData] });
  };

  const { pageTitle, users } = state;
  let hasUsers: boolean = users.length > 0;

  return (
    <div>
      <span>
        <h3>{pageTitle}</h3>
        <a className="nav-link ml-3 my-1" href="/new-superhero">
          Enter New Details
        </a>
      </span>
      <Button variant="contained" onClick={fetchAllData}>
        Fetch Users
      </Button>
      {hasUsers ? users!.map(generateUserCard) : null}
      <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      {/* <button
        type="button"
        className="btn btn-dark"
        onClick={() => fetchAllData()}
      >
        Fetch Users
      </button> */}
      {/* <table className="table table-bordered table-dark table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Place</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{hasUsers ? users!.map(generateUserCard) : null}</tbody>
      </table> */}
      {/* {isDelete && <AlertComponent type={"warning"} text={"Do you want to delete this user?"} isShow={true}></AlertComponent> } */}
    </div>
  );
};

export default SuperHeroListComponent;
