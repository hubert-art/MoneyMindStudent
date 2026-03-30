import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false); // optional

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-2">
      
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl shadow-md w-[90%] sm:w-96 space-y-4"
        style={{ backgroundColor: "rgba(230, 235, 248, 0.53)" }}
      >

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Welcome back to MoneyMind Student!
        </h1>

        {/* EMAIL */}
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl2 px-4 py-3 outline-none"
            style={{ backgroundColor: "rgba(225, 229, 248, 0.57)" }}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl2 px-4 py-3 pr-12 outline-none"
              style={{ backgroundColor: "rgba(225, 229, 248, 0.57)" }}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between text-sm w-full">
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>

          <Link to="/forgot-password" className="text-green-300">
            Forgot password?
          </Link>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-primaryGreen text-lightText rounded-xl2 px-4 py-3 w-full"
        >
          Login
        </button>

        {/* LINK */}
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-300">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;