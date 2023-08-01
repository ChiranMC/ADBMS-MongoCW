import React, { useEffect, useState } from "react";
import AdminHome from "./adminHome";
import UserHome from "./userHome"; // Corrected the filename here

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
        if (data.data.userType === "Admin") {
          setAdmin(true);
        }
      });
  }, []);

  return (
    admin ? <AdminHome/> : <UserHome userData={userData} />
  );
}
