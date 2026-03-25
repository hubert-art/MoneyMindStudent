// import { AppRoutes } from "./routes/AppRoutes";
// import { AuthProvider } from "./context/AuthContext";
// import { FinanceProvider } from "./context/FinanceContext";

// function App() {
//   return (
//     <AuthProvider>
//       <FinanceProvider>
//         <AppRoutes />
//       </FinanceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";

function App() {
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem("darkMode");
  return saved === "true";
});

  // 🎨 Appliquer le thème au body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <FinanceProvider>
        <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
      </FinanceProvider>
    </AuthProvider>
  );
}

export default App;