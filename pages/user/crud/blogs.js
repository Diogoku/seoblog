import Layout from "../../../components/Layout";

// NEXT LINK
import Link from "next/link";

// User PRIVATE ROUTE
import Private from "../../../components/auth/Private";

// COMPONENTS
import ReadBlog from "../../../components/crud/ReadBlog";

// AUTH
import { isAuth } from "../../../actions/auth";

function Blogs() {
  const username = isAuth() && isAuth().username;

  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <ReadBlog username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default Blogs;
