import { useState, useEffect, Fragment } from "react";

// NEXT LINK
import Link from "next/link";

// NEXT ROUTER
import Router from "next/router";

// AUTH
import { getCookie } from "../../actions/auth";

// CATEGORY ACTIONS
import { create, getCategories, removeCategory } from "../../actions/category";

function Category() {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      if ("error" in data) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: false,
          reload: !reload,
        });
      }
    });
  };

  const deleteConfirm = (categorySlug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this category"
    );
    if (answer) {
      deleteCategory(categorySlug);
    }
  };

  const deleteCategory = (categorySlug) => {
    removeCategory(categorySlug, token).then((data) => {
      if ("error" in data) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="category-name" className="text-muted">
          Name
        </label>
        <input
          type="text"
          id="category-name"
          name="name"
          className="form-control "
          onChange={handleChange}
          value={name}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  const showSubCategories = () => {
    return categories.map((category, index) => {
      return (
        <button
          title="Double click to delete"
          key={index}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          onDoubleClick={() => deleteConfirm(category.slug)}
        >
          {category.name}
        </button>
      );
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  return (
    <Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}

      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showSubCategories()}
      </div>
    </Fragment>
  );
}

export default Category;
