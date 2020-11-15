import React, { useState, useEffect } from "react";

// NEXT
import Link from "next/link";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";

// AUTH
import { getCookie, isAuth } from "../../actions/auth";

// CATEGORIES
import { getCategories } from "../../actions/category";
// TAGS
import { getTags } from "../../actions/tag";
// BLOG
import { createBlog } from "../../actions/blog";

// REACT QUILL
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill";
import "../../node_modules/react-quill/dist/quill.snow.css";

function CreateBlog({ router }) {
  const blogFromLS = () => {
    if (typeof window === "undefined") return false;
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hiddePublishButton: false,
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hiddePublishButton,
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if ("error" in data) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    setValues({ ...values, formData: formData, error: "" });
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggleCategories = (category) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedCategoryIndex = checked.indexOf(category);
    const all = [...checked];

    if (clickedCategoryIndex === -1) all.push(category);
    else all.splice(clickedCategoryIndex, 1);

    setChecked(all);
    formData.set("categories", all);
  };

  const handleToggleTags = (tag) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedTagIndex = checkedTag.indexOf(tag);
    const all = [...checkedTag];

    if (clickedTagIndex === -1) all.push(tag);
    else all.splice(clickedTagIndex, 1);

    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((category) => (
        <li key={category._id} className="list-unstyled">
          <input
            type="checkbox"
            onChange={handleToggleCategories(category._id)}
            className="mr-2"
          />
          <label htmlFor="" className="form-check-label">
            {category.name}
          </label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((tag) => (
        <li key={tag._id} className="list-unstyled">
          <input
            type="checkbox"
            onChange={handleToggleTags(tag._id)}
            className="mr-2"
          />
          <label htmlFor="" className="form-check-label">
            {tag.name}
          </label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label htmlFor="title" className="text-muted">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="content-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group pb-2">
            <h5>Featured Images</h5>
            <hr />

            <small className="text-muted">Max size: 1mb </small>
            <br />
            <label className="btn btn-outline-info">
              Upload featured image
              <input
                type="file"
                onChange={handleChange("photo")}
                accept="image/*"
                hidden={true}
              />
            </label>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>

          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CreateBlog);
