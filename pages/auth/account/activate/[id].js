import { useState, useEffect } from "react";

// LAYOUT
import Layout from "../../../../components/Layout";

// ACTIONS
import { signup } from "../../../../actions/auth";

// NEXT
import { withRouter } from "next/router";

// JWT
import jwt from "jsonwebtoken";

function ActivateAccount({ router }) {
  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    const token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
          error: false,
        });
      }
    });
  };

  const showLoading = () => loading && <h2>Loading...</h2>;

  const passwordResetForm = () => (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            type="password"
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            className="form-control"
            value={newPassword}
            placeholder="Type your new password"
            required={true}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Change password
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Layout>
      <div className="container-fluid">
        <h3 className="pb-4">Hey {name}, Ready to active your account?</h3>
        {showLoading()}
        {error && error}
        {success &&
          "You have successfully activated your account. Please signin."}

        {showButton && (
          <button className="btn btn-outline-primary" onClick={handleSubmit}>
            Activate Account
          </button>
        )}
      </div>
    </Layout>
  );
}

export default withRouter(ActivateAccount);
