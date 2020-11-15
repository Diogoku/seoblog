import Layout from "../../../components/Layout";

// NEXT LINK
import Link from "next/link";

// ADMIN PRIVATE ROUTE
import Admin from "../../../components/auth/Admin";

// COMPONENTS
import ReadBlog from "../../../components/crud/ReadBlog";

function Blogs() {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <ReadBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
}

export default Blogs;
