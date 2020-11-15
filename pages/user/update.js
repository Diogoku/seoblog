import Layout from "../../components/Layout";

// NEXT LINK
import Link from "next/link";

// USER PRIVATE ROUTE
import Private from "../../components/auth/Private";

// COMPONENTS
import ProfileUpdate from "../../components/auth/ProfileUpdate";

function UserProfileUpdate() {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default UserProfileUpdate;
