import Layout from "../components/Layout";

// COMPONENTS
import Signup from "../components/auth/Signup";

function signup() {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Signup />
        </div>
      </div>
    </Layout>
  );
}

export default signup;
