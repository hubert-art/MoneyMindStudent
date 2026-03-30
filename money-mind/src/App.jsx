import { useState, useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import LoadingScreen from "./pages/LoadingScreen";

function App() {
  // 🌙 Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  // ⏳ Loading screen
  const [loading, setLoading] = useState(true);

  // 🎨 Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // ⏱️ Loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 🔄 Show loading first
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <FinanceProvider>
        <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
      </FinanceProvider>
    </AuthProvider>
  );
}

export default App;