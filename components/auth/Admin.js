import React, { useEffect, Fragment } from "react";

// NEXT ROUTER
import Router from "next/router";

// AUTH
import { isAuth } from "../../actions/auth.js";

function Admin({ children }) {
  useEffect(() => {
    if (!isAuth()) Router.push("/signin");
    else if (isAuth().role !== 1) Router.push("/");
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default Admin;
