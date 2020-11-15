import Layout from "../components/Layout";

// NEXT ROUTER
import { withRouter } from "next/router";

// COMPONENTS
import Signin from "../components/auth/Signin";

function signin({ router }) {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else return;
  };

  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signin</h2>

      <div className="row">
        <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Signin />
        </div>
      </div>
    </Layout>
  );
}

export default withRouter(signin);
