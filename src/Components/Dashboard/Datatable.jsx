// Datatable.jsx

import "./datatable.scss";
import "./Datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Datatable = () => {
  const [data, setData] = useState([]);
  const role = sessionStorage.getItem('role');
  const Navigate = useNavigate();

  useEffect(() => {
    if (!role === 'admin') {
      Navigate('/Home');
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/getUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const jsonData = await response.json();

        setData(jsonData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData(); // Call the function to fetch data on component mount

  }, []); // Empty dependency array ensures useEffect only runs once on component mount

  const handleDelete = async (id) => {
    try {
      // Make an API call to delete the user
      await fetch(`http://localhost:8000/api/deleteUser/${id}`, {
        method: "DELETE",
      });
      // Remove the deleted user from the table
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "full_name", headerName: "User Name", width: 150 },

    {
      field: "pfp",
      headerName: "Image",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.value ? (
              <img className="cellImg" src={`http://localhost:8000/${params.value}`} alt="avatar" />
            ) : (
              <span>No Image</span>
            )}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 230 },
    { field: "bio", headerName: "Bio", width: 230 },
    { field: "role", headerName: "Role", width: 160 },
    { field: "gender", headerName: "Gender", width: 120 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="bigTitle">Welcome to your Dashboard</div> {/* Added big title */}
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
