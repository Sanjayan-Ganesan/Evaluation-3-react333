import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [btn, setbtn] = useState({
        email: "eve.holt@reqres.in",
        password: "1234567890",
  });
  const { login } = useContext(AuthContext);
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setbtn({
      ...btn,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (btn.email && btn.password) {
      login(btn.email, btn.password);
    }
  };
  return (
    
    <div>
      <h3>Login Page</h3>
      <form onSubmit={handleSubmit} >
      <input data-cy="login-email"  name="email"
          type="email"
          placeholder="Enter Your Email"
          value={btn.email}
          onChange={hanldeChange} /><br/>
          <p> </p>

      <input data-cy="login-password"  name="password"
          type="password"
          placeholder="Enter Your Password..."
          value={btn.password}
          onChange={hanldeChange}/><br />
          <p></p>
      <button data-cy="login-submit" type="submit" value="Login">Login</button>
      </form>
    </div>
  );
};

export default Login;
