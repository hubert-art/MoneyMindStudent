// import { createContext, useState, useEffect } from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // ✅ Charger depuis localStorage au démarrage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (data) => {
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data)); // ✅ save
//   };

//   const register = (data) => {
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data)); // ✅ save
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // ✅ clear
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Charger user au refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // 🔐 login
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // 🚪 logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};