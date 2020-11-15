import { useState, useEffect, Fragment } from "react";

// NEXT
import Router from "next/router";

// ACTIONS
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";

// CONFIG
import { GOOGLE_CLIENT_ID } from "../../config";

// GOOGLE LOGIN
import GoogleLogin from "react-google-login";

function LoginGoogle() {
  const responseGoogle = (response) => {
    const { tokenId } = response;
    const user = { tokenId };

    loginWithGoogle(user).then((data) => {
      if (data.error) console.log(err);
      else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) Router.push("/admin");
          else Router.push("/user");
        });
      }
    });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
}

export default LoginGoogle;
