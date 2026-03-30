import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams(); // 🔐 récupère le token
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    setError("");

    // 👉 ici tu connecteras ton backend
    console.log("Token:", token);
    console.log("New password:", password);

    // redirection après succès
    navigate("/login");
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
          Reset Password
        </h1>

        {/* SUBTITLE */}
        <p className="text-sm text-gray-600 text-center">
          Enter your new password and confirm it to regain access to your account
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        {/* PASSWORD */}
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
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

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <div className="relative w-full">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl2 px-4 py-3 pr-12 outline-none"
              style={{ backgroundColor: "rgba(225, 229, 248, 0.57)" }}
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-primaryGreen text-lightText rounded-xl2 px-4 py-3 w-full"
        >
          Reset Password
        </button>

        {/* BACK */}
        <p className="text-sm text-center">
          Back to{" "}
          <Link to="/login" className="text-green-5=300">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default ResetPassword;