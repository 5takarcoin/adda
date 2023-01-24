import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { processMessage } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
      setErrorMessage(processMessage(err.message));
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img
            className="logo"
            src="https://cdn.discordapp.com/attachments/913539818246533132/1066120463769665586/image.png"
            alt=""
          />
        </span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {error && <span>{errorMessage}</span>}
        </form>
        <p>
          Don't have an account?{" "}
          <Link class="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
