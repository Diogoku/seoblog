import Layout from "../../components/Layout";

// NEXT LINK
import Link from "next/link";

// USER PRIVATE ROUTE
import Private from "../../components/auth/Private";

function index() {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/user/crud/blog">Create Blog</a>
                </li>

                <li className="list-group-item">
                  <Link href="/user/crud/blogs">
                    <a>Update/Delete Blogs</a>
                  </Link>
                </li>

                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">
              <p>Right</p>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default index;
