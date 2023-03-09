import React from "react";
import { Container } from "react-bootstrap";
import classes from "./AuthForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./auth-context";

const Login = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    localStorage.setItem("email", enteredEmail);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCO_5MwtpO6aijlQv3QHhntme1iMxUYmzs",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = "Authrntication filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        //   const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
        console.log(data);
        authCtx.login(data.idToken, enteredEmail);
        //   authCtx.login(data.idToken,expirationTime.toISOString());
        history.replace("/store");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Container className="mt-3">
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
