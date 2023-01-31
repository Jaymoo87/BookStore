import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stringify } from "uuid";
import { POST, TOKEN_KEY } from "../services/api-service";
import { SwalSuccess } from "../services/swal-error-handler";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const nav = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    POST<{ token: string; message: string }>("/auth/login", { email, password }).then((data) => {
      const token = data!.token;
      SwalSuccess("Logged in");
      localStorage.setItem(TOKEN_KEY, token);
      nav("/books");
    });
  };

  return (
    <main className="container">
      <section className="row justify-content-center mt-4">
        <div className="col-12 col-md-4">
          <form action="" className="form-group p-4 rounded-lg bg-primary rounded shadow-lg">
            <h1 className="text-center text-dark">Log In</h1>
            <label htmlFor="email" className="text-dark">
              Email:
            </label>
            <input
              autoComplete="email"
              type="email"
              className="form-control mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="text-dark">
              Password:
            </label>
            <input
              autoComplete="password"
              type="password"
              className="form-control mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
