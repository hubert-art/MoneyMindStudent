// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Input } from "../components/ui/Input";
// import { Button } from "../components/ui/Button";

// const Settings = ({ darkMode, setDarkMode }) => {
//   const { user, setUser } = useContext(AuthContext);

//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [notifications, setNotifications] = useState(true);

//   const handleSave = () => {
//     const updatedUser = {
//       ...user,
//       name,
//       email,
//     };

//     setUser(updatedUser);
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 rounded-lg">

//       <div className="max-w-3xl mx-auto space-y-6">

//         {/* HEADER */}
//         <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
//           Settings
//         </h1>

//         {/* ACCOUNT */}
//         <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">

//           <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//             Account
//           </h2>

//           <div>
//             <label className="text-sm text-gray-600 dark:text-gray-400">
//               Name
//             </label>

//             <Input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your name"
//               className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600 dark:text-gray-400">
//               Email
//             </label>

//             <Input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Your email"
//               className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
//             />
//           </div>

//           <Button className="w-full" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </div>

//         {/* ⚙️ PREFERENCES */}
//         <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">

//           <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//             Preferences
//           </h2>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 dark:text-gray-300">
//               Dark Mode
//             </span>

//             <input
//               type="checkbox"
//               checked={darkMode}
//               onChange={() => setDarkMode(!darkMode)}
//               className="accent-green-500"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 dark:text-gray-300">
//               Notifications
//             </span>

//             <input
//               type="checkbox"
//               checked={notifications}
//               onChange={() => setNotifications(!notifications)}
//               className="accent-green-500"
//             />
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Settings;

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { User, Lock, Moon, Bell, Trash2 } from "lucide-react";

const Settings = ({ darkMode, setDarkMode }) => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : true;
  });

  const [currency, setCurrency] = useState("KES");

  // PASSWORD STATE
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //  SUCCESS STATES
  const [saved, setSaved] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  //  SAVE USER
  {saved && (
  <p className="text-green-500 text-sm text-center">
     Profile updated successfully
  </p>
)}
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      currency,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // CHANGE PASSWORD
  const handlePasswordChange = () => {
    if (!password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("password", password);

    setPassword("");
    setConfirmPassword("");

    setPasswordChanged(true);
    setTimeout(() => setPasswordChanged(false), 2000);
  };

  // RESET DATA
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to delete all data?"
    );

    if (!confirmReset) return;

    localStorage.removeItem("transactions");

    alert("All data has been reset!");
    window.location.reload();
  };

  //  SAVE NOTIFICATIONS
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 rounded-3xl">

      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white items-center justify-center gap-2">
          Settings 
        </h1>

      {/* PROFILE */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-5">

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Profile
          </h2>

          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <User size={16} /> Personal Information
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Name
            </label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Email
            </label>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </div>


        {/* SECURITY */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Security
          </h2>

          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            onClick={handlePasswordChange}
            className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            Change Password
          </Button>

          {passwordChanged && (
            <p className="text-green-500 text-sm text-center">
               Password updated
            </p>
          )}
        </div>
        <div>
  <label className="text-sm text-gray-600 dark:text-gray-400">
    Currency
  </label>

  <select
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
    className="w-full mt-1 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
  >
    <option value="KES">KES (Kenyan Shilling)</option>
    <option value="USD">USD ($)</option>
    <option value="EUR">EUR (€)</option>
  </select>
</div>

        {/* PREFERENCES */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Preferences
          </h2>

          <div className="flex justify-between">
            <span className="dark:text-white">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="accent-green-500"
            />
          </div>

          <div className="flex justify-between">
            <span className="dark:text-white">Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="accent-green-500"
            />
          </div>
        </div>

        {/* APP SETTINGS */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            App Settings
          </h2>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
          >
            <Trash2 size={16} />
            Reset All Data
          </button>

          <p className="text-xs text-gray-400 text-center">
            This will delete all your transactions permanently
          </p>
        </div>

      </div>
    </div>
  );
};

export default Settings;