import fetch from "isomorphic-fetch";

// CONFIG
import { API } from "../config";

// AUTH
import { handleResponse } from "./auth";

// create tag
export const create = (tag, token) => {
  return fetch(`${API}/tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((error) => console.log(error));
};

// get tags
export const getTags = () => {
  return fetch(`${API}/tags`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// get single tag
export const getSingleTag = (tagSlug) => {
  return fetch(`${API}/tag/${tagSlug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// remove tag
export const removeTag = (tagSlug, token) => {
  return fetch(`${API}/tag/${tagSlug}`, {
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
