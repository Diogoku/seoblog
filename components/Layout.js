import React from "react";

// COMPONENTS
import Header from "./Header";

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
}

export default Layout;
