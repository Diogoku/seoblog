import fetch from "isomorphic-fetch";

// CONFIG
import { API } from "../config";

// email contact form
export const emailContactForm = (data) => {
  let emailEndpoint;
  if (data.authorEmail) emailEndpoint = `${API}/contact-blog-author`;
  else emailEndpoint = `${API}/contact`;

  return fetch(emailEndpoint, {
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
