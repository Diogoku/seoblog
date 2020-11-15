import React, { useEffect, Fragment } from "react";

// NEXT ROUTER
import Router from "next/router";

// AUTH
import { isAuth } from "../../actions/auth.js";

function Private({ children }) {
  useEffect(() => {
    if (!isAuth()) Router.push("/signin");
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default Private;
