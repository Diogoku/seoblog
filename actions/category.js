import fetch from "isomorphic-fetch";

// CONFIG
import { API } from "../config";

// AUTH
import { handleResponse } from "./auth";

// create
export const create = (category, token) => {
  return fetch(`${API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((error) => console.log(error));
};

// get categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// get single category
export const getSingleCategory = (categorySlug) => {
  return fetch(`${API}/category/${categorySlug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// remove category
export const removeCategory = (categorySlug, token) => {
  return fetch(`${API}/category/${categorySlug}`, {
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
