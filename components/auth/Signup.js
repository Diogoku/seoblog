import React, { Fragment, useState, useEffect } from "react";

// NEXT
import Router from "next/router";

// AUTH
import { preSignup, isAuth } from "../../actions/auth";

function Signup() {
  const [values, setValues] = useState({
    name: "Diogo Ribeiro",
    email: "diogomnribeiro@gmail.com",
    password: "Didi14598",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            className="form-control"
            placeholder="Type your name"
            onChange={handleChange("name")}
          />
        </div>

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
            Signup
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
      {showForm && signupForm()}
    </Fragment>
  );
}

export default Signup;
