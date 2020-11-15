import Layout from "../../../components/Layout";

// NEXT LINK
import Link from "next/link";

// USER PRIVATE ROUTE
import Private from "../../../components/auth/Private";

// COMPONENTS
import UpdateBlog from "../../../components/crud/UpdateBlog";

function Blog() {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update blog</h2>
            </div>
            <div className="col-md-12">
              <UpdateBlog />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default Blog;
