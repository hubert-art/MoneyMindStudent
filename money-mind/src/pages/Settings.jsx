// import { Input } from "../components/ui/Input";
// import { Button } from "../components/ui/Button";
// const Settings = () => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm">
//        <h1 className="text-2xl font-semibold">Settings</h1>

//      {/* 👤 Profile Settings */}
//      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
//         <h2 className="text-lg font-semibold">Account</h2>

//        <div>
//           <label className="text-sm text-gray-600">Name</label>
//          <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Your name"
//           />
//         </div>
//          </div>
//     </div>
//   );
// };

// export default Settings;


import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const Settings = ({ darkMode, setDarkMode }) => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

//   const [darkMode, setDarkMode] = useState(false);
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
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* 👤 Profile Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Account</h2>

        <div>
          <label className="text-sm text-gray-600">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </div>

        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      {/* ⚙️ Preferences */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Preferences</h2>

        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>
      </div>

    </div>
  );
};
export default Settings;