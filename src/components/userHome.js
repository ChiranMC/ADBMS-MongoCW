import React from "react";

export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  return (
    <div>
      <h1>Welcome User</h1><br/>
      <h2>First Name: {userData.fname}</h2>
      <h2>Last Name: {userData.lname}</h2>
      <h2>Email: {userData.email}</h2>
      <h2>UserType: {userData.userType}</h2><br/>
      <button onClick={logOut} className="btn btn-primary">Log Out</button>
    </div>
  );
}
