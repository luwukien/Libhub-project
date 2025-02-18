import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    
    setError("");
    
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      
      console.log(response);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black overflow-hidden relative flex items-center justify-center">
      <div className="w-2/4 h-[75vh] bg-white rounded-lg relative p-16 shadow-cyan-200/20">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl font-semibold mb-7 text-yellow-500 text-center">
            Login
          </h4>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {/* Input Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="input-box w-full"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="input-box w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button Login */}
          <div className="mb-6">
            <button
              type="submit"
              className="btn-primary w-full text-yellow-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </div>

          <p className="text-yellow-500 text-center mb-4">Or</p>

          {/* Button Create Account */}
          <div>
            <button
              type="button"
              className="w-full text-yellow-500"
              onClick={() => navigate("/signup")}
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