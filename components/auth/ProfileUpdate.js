import { useState, useEffect, Fragment } from "react";

import Layout from "../../components/Layout";

// NEXT LINK
import Link from "next/link";
import Router from "next/router";

// USER PRIVATE ROUTE
import Private from "../../components/auth/Private";

// AACTIONS
import { getCookie, isAuth, updateUserLS } from "../../actions/auth";
import { getProfile, updateProfile } from "../../actions/user";

// CONFIG
import { API } from "../../config";

function ProfileUpdate() {
  const [values, setValues] = useState({
    username: "",
    username_for_photo: "",
    name: "",
    email: "",
    about: "",
    password: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: process.browser && new FormData(),
  });
  const token = getCookie("token");

  const {
    username,
    username_for_photo,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  useEffect(() => {
    init();
    setValues({ ...values, userData: new FormData() });
  }, []);

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else {
        setValues({
          ...values,
          username: data.username,
          username_for_photo: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    userData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    updateProfile(userData, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        updateUserLS(data, () => {
          const { user } = data;
          setValues({
            ...values,
            username: user.username,
            name: user.name,
            email: user.email,
            about: user.about,
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <small className="text-muted">Max size: 1mb </small>
        <br />
        <label className="btn btn-outline-info">
          Profile photo
          <input
            type="file"
            onChange={handleChange("photo")}
            accept="image/*"
            hidden={true}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={handleChange("username")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={handleChange("email")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          About
        </label>
        <textarea
          type="text"
          value={about}
          onChange={handleChange("about")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      All fields are required
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Profile updated
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${API}/user/photo/${username_for_photo}`}
              className="img img-fluid img-thumbnail mb-3"
              style={{ maxHeight: "auto", maxWidth: "100%" }}
              alt="user profile"
            />
          </div>
          <div className="col-md-8 mb-5">
            {showError()}
            {showSuccess()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProfileUpdate;
