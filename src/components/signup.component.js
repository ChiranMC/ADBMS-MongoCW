import React, { Component } from 'react';

export default class SignUp extends Component {
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
    fetch("http://localhost:8000/register", {
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
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
        } else {
          alert("Something went wrong");
        }
      });
  }

  render() {
    const { userType } = this.state; // Add this line to access userType from state
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          Register As
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e) => this.setState({ userType: e.target.value })}
          />
          User
          <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(e) => this.setState({ userType: e.target.value })}
          />
          Admin
        </div>

        {userType === "Admin" ? ( // Use userType from state
          <div className="mb-3">
            <label>Secret Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Secret Key"
              onChange={(e) => this.setState({ secretKey: e.target.value })}
            />
          </div>
        ) : null}

        {/* Rest of the code remains the same */}
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
            Sign Up
          </button>
        </div>

        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}
