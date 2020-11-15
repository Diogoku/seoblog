import fetch from "isomorphic-fetch";

// CONFIG
import { API } from "../config";

// QUERY STRING
import queryString from "query-string";

// AUTH
import { isAuth, handleResponse } from "./auth";

// create blog
export const createBlog = (blog, token) => {
  let createBlogEndpoint;
  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoint = `${API}/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndpoint = `${API}/user/blog`;
  }

  return fetch(createBlogEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((error) => console.log(error));
};

// list blogs
export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = { skip, limit };
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// read blog
export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// list related blogs
export const listRelatedBlogs = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// list
export const list = (username) => {
  let listBlogsEndpoint;
  if (!username) listBlogsEndpoint = `${API}/blogs`;
  else listBlogsEndpoint = `${API}/${username}/blogs`;

  return fetch(listBlogsEndpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// remove blog
export const removeBlog = (slug, token) => {
  let removeBlogEndpoint;
  if (isAuth() && isAuth().role === 1) {
    removeBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    removeBlogEndpoint = `${API}/user/blog/${slug}`;
  }

  return fetch(removeBlogEndpoint, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((error) => console.log(error));
};

// update blog
export const updateBlog = (blog, token, slug) => {
  let updateBlogEndpoint;
  if (isAuth() && isAuth().role === 1) {
    updateBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogEndpoint = `${API}/user/blog/${slug}`;
  }

  return fetch(updateBlogEndpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((error) => console.log(error, "erro aqui"));
};

// search blogs
export const listSearch = (params) => {
  const query = queryString.stringify(params);
  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
