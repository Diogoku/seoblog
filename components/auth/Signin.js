import React, { Fragment, useState, useEffect } from "react";

// NEXT
import Router from "next/router";
import Link from "next/link";

// AUTH
import { signin, authenticate, isAuth } from "../../actions/auth";

// COMPONENTS
import LoginGoogle from "./LoginGoogle";

function Signin() {
  const [values, setValues] = useState({
    email: "diogomnribeiro@gmail.com",
    password: "Didi14598",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localStorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) Router.push("/admin");
          else Router.push("/user");
        });
      }
    });

    //console.table({ name, email, password, error, loading, message, showForm });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            className="form-control"
            placeholder="Type your email"
            onChange={handleChange("email")}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Type your password"
            onChange={handleChange("password")}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Signin
          </button>
        </div>
      </form>
    );
  };

  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      <LoginGoogle />
      {showForm && signinForm()}
      <br />
      <Link href={`/auth/password/forgot`}>
        <a className="btn btn-outline-danger btn-sm">Forgot Password</a>
      </Link>
    </Fragment>
  );
}

export default Signin;
