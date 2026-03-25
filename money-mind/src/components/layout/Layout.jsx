import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        
        {/* Navbar */}
        <Navbar />
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};