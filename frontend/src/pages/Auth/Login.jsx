import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black overflow-hidden relative flex items-center justify-center">
      <div className="w-2/4 h-[75vh] bg-white rounded-lg relative p-16 shadow-cyan-200/20">
        <form onSubmit={() => {}}>
          <h4 className="text-2xl font-semibold mb-7 text-yellow-500 text-center">
            Login
          </h4>

          {/* Input Email */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              className="input-box w-full"
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="input-box w-full"
            />
          </div>

          {/* Button Login */}
          <div className="mb-6">
            <button type="submit" className="btn-primary w-full text-yellow-500">
              LOGIN
            </button>
          </div>

          <p className="text-yellow-500 text-center mb-4">Or</p>

          {/* Button Create Account */}
          <div>
            <button
              type="button"
              className="w-full text-yellow-500"
              onClick={() => {
                navigate("/signup");
              }}
            >
              CREATE ACCOUNT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;