import Layout from "../../../components/Layout";

// NEXT LINK
import Link from "next/link";

// ADMIN PRIVATE ROUTE
import Admin from "../../../components/auth/Admin";

// COMPONENTS
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

function CategoryTag() {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Categories and Tags</h2>
            </div>
            <div className="col-md-6">
              <Category />
            </div>
            <div className="col-md-6">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
}

export default CategoryTag;
