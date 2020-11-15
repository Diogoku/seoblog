import { useState, useEffect, Fragment } from "react";

// NEXT LINK
import Link from "next/link";

// NEXT ROUTER
import Router from "next/router";

// AUTH
import { getCookie } from "../../actions/auth";

// CATEGORY ACTIONS
import { create, getTags, removeTag } from "../../actions/tag";

function Tag() {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if ("error" in data) console.log(data.error);
      else setValues({ ...values, tags: data });
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

  const deleteConfirm = (tagSlug) => {
    let answer = window.confirm("Are you sure you want to delete this tag");
    if (answer) {
      deleteTag(tagSlug);
    }
  };

  const deleteTag = (tagSlug) => {
    removeTag(tagSlug, token).then((data) => {
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

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="tag-name" className="text-muted">
          Name
        </label>
        <input
          type="text"
          id="tag-name"
          name="name"
          className="form-control"
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

  const showSubTags = () => {
    return tags.map((tag, index) => {
      return (
        <button
          title="Double click to delete"
          key={index}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          onDoubleClick={() => deleteConfirm(tag.slug)}
        >
          {tag.name}
        </button>
      );
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed</p>;
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
        {newTagForm()}
        {showSubTags()}
      </div>
    </Fragment>
  );
}

export default Tag;
