import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const Settings = ({ darkMode, setDarkMode }) => {
  const { user, updateUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saveError, setSaveError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    setSaveError('');

    try {
      const { data } = await updateProfile({ name, email });
      updateUser(data);
      setSaveMsg('Profile updated successfully.');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Failed to save changes.';
      setSaveError(msg);
    } finally {
      setSaving(false);
    }
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

        {saveMsg && (
          <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {saveMsg}
          </p>
        )}
        {saveError && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {saveError}
          </p>
        )}

        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
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