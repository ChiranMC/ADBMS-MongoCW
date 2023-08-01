import React, { Component } from 'react';

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      userType: "",
      secretKey: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { userType, secretKey, fname, lname, email, password } = this.state;

    if (userType === "Admin" && secretKey !== "Adeesha") {
        alert("Invalid Admin");
        return; // Stop further execution
    }

    console.log(fname, lname, email, password);
    fetch("http://localhost:8000/updateUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        userType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userUpdate");
        if (data.status === "ok") {
          alert("User Updated Successful");
        } else {
          alert("Something went wrong");
        }
      });
  }

  render() {
    const { userType } = this.state; // Add this line to access userType from state
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Update User</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => this.setState({ fname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => this.setState({ lname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>

        {/* You can include additional input fields if needed */}
      </form>
    );
  }
}