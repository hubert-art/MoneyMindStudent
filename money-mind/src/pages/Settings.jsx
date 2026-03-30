import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const Settings = ({ darkMode, setDarkMode }) => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 rounded-lg">

      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h1>

        {/* 👤 ACCOUNT */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Account
          </h2>

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

        {/* ⚙️ PREFERENCES */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Preferences
          </h2>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Dark Mode
            </span>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="accent-green-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Notifications
            </span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="accent-green-500"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;