import { useState, Fragment } from "react";

// NEXT ROUTER
import Router from "next/router";

// LINK
import Link from "next/link";

// AUTH
import { isAuth, signout } from "../actions/auth";

// CONFIG
import { APP_NAME } from "../config";

// COMPONENTS
import Search from "./blog/Search";

// NPROGRESS
import NProgress from "nprogress";

// REACTSTRAP
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

// CSS
import ".././node_modules/nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const dashboard = () => (
    <NavItem>
      <Link href={`${isAuth() && isAuth().role === 1 ? "/admin" : "/user"}`}>
        <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
      </Link>
    </NavItem>
  );

  return (
    <Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">
            {APP_NAME || "SEOBLOG"}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link href="/blogs/">
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/contact/">
                <NavLink>Contact</NavLink>
              </Link>
            </NavItem>
            {!isAuth() ? (
              <Fragment>
                <NavItem>
                  <Link href="/signin/">
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup/">
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </Fragment>
            ) : (
              <Fragment>
                {dashboard()}
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => signout(() => Router.replace("/signin"))}
                  >
                    Signout
                  </NavLink>
                </NavItem>
                <NavItem>
                  <a
                    href="/user/crud/blog"
                    className="btn btn-primary text-light"
                  >
                    Write a blog
                  </a>
                </NavItem>
              </Fragment>
            )}
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
      <Search />
    </Fragment>
  );
};

export default Header;
