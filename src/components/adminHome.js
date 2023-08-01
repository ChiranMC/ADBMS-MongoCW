import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:8000/getAllUser")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are You Sure you want to delete ${name}`)) {
      fetch("http://localhost:8000/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert(data.data);
          getAllUsers(); // Update the table after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };
  //const updtUserData = {id : ""};//object which use to fetch id to the update user page
  const updateUser = () => {
    if (window.confirm(`Are You Sure you want to update`)) {
      //updtUserData.id = id;                                                [REF.NOTE - NOT WORKING ] 
      window.location.href = "./updateUser";
    }
  };
  
  return (
    <div>
      <div style={{ width: 400 }}>
        <h1>Welcome Admin</h1>
        <br />
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Name</th>
                <th style={{ border: "1px solid black" }}>Email</th>
                <th style={{ border: "1px solid black" }}>User Type</th>
                <th style={{ border: "1px solid black" }}>Delete</th>
                <th style={{ border: "1px solid black" }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => {
                return (
                  <tr key={i._id}>
                    <td style={{ border: "1px solid black" }}>{i.fname}</td>
                    <td style={{ border: "1px solid black" }}>{i.email}</td>
                    <td style={{ border: "1px solid black" }}>{i.userType}</td>
                    <td style={{ border: "1px solid black" }}>
                      <FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(i._id, i.fname)} />
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      <FontAwesomeIcon icon={faPen} onClick={() => updateUser()} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br></br>
        <button style={{ paddingRight: 20 }} onClick={logOut} className="btn btn-primary">
          Log Out
        </button>
      </div>
    </div>
  );
}

