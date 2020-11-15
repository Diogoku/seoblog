import Layout from "../../../components/Layout";

// ADMIN PRIVATE ROUTE
import Admin from "../../../components/auth/Admin";

// COMPONENTS
import UpdateBlog from "../../../components/crud/UpdateBlog";

function Blog() {
  return (
    <Layout>
      <Admin>
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
      </Admin>
    </Layout>
  );
}

export default Blog;
