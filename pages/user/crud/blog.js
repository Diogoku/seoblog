import Layout from "../../../components/Layout";

// NEXT LINK
import Link from "next/link";

// ADMIN PRIVATE ROUTE
import Private from "../../../components/auth/Private";

// COMPONENTS
import CreateBlog from "../../../components/crud/CreateBlog";

function BlogCreate() {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new blog</h2>
            </div>
            <div className="col-md-12">
              <CreateBlog />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default BlogCreate;
