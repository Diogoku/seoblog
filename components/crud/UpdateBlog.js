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
import { singleBlog, updateBlog } from "../../actions/blog";

// REACT QUILL
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill";
import "../../node_modules/react-quill/dist/quill.snow.css";

// CONFIG
import { API } from "../../config";

function UpdateBlog({ router }) {
  const [body, setBody] = useState("");
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
    body: "",
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags

  const token = getCookie("token");

  const { error, success, formData, title } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if ("error" in data) console.log(data.error);
        else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((category) => {
      ca.push(category._id);
    });
    setChecked(ca);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];
    blogTags.map((tag) => {
      ta.push(tag._id);
    });
    setCheckedTag(ta);
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if ("error" in data) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if ("error" in data) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const findOutCategory = (categoryID) => {
    return checked.indexOf(categoryID) !== -1 ? true : false;
  };

  const findOutTag = (tagID) => {
    return checkedTag.indexOf(tagID) !== -1 ? true : false;
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((category) => (
        <li key={category._id} className="list-unstyled">
          <input
            type="checkbox"
            checked={findOutCategory(category._id)}
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
            checked={findOutTag(tag._id)}
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

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const editBlog = (e) => {
    e.preventDefault();
    console.log(formData.getAll("body"), "aqui e agora");
    updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled ${data.title} is successfully updated`,
        });
        if (isAuth() && isAuth().role === 1) {
          //Router.replace(`/admin/crud/${router.query.slug}`);
          Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          //Router.replace(`/user/crud/${router.query.slug}`);
          Router.replace(`/user`);
        }
      }
    });
    console.log("update blog");
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
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
            Update
          </button>
        </div>
      </form>
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

  return (
    <div className="content-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">
            {showSuccess()}
            {showError()}
          </div>

          <div>
            {body && (
              <img
                src={`${API}/blog/photo/${router.query.slug}`}
                alt={`${title}`}
                style={{ width: "100%" }}
              />
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group pb-2">
            <h5>Featured Images</h5>
            <hr />

            <small className="text-muted">Max size: 1mb </small>
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

export default withRouter(UpdateBlog);
