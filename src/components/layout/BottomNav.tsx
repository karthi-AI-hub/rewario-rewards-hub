
import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Users, Award, Settings } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-10">
      <Link 
        to="/dashboard" 
        className={`flex flex-col items-center ${path === "/dashboard" ? "text-rewario-purple" : "text-gray-500"}`}
      >
        <Home size={24} className={path === "/dashboard" ? "text-rewario-purple" : "text-gray-500"} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link 
        to="/wallet" 
        className={`flex flex-col items-center ${path === "/wallet" ? "text-rewario-purple" : "text-gray-500"}`}
      >
        <Wallet size={24} className={path === "/wallet" ? "text-rewario-purple" : "text-gray-500"} />
        <span className="text-xs mt-1">Wallet</span>
      </Link>
      
      <Link 
        to="/referral" 
        className={`flex flex-col items-center ${path === "/referral" ? "text-rewario-purple" : "text-gray-500"}`}
      >
        <Users size={24} className={path === "/referral" ? "text-rewario-purple" : "text-gray-500"} />
        <span className="text-xs mt-1">Refer</span>
      </Link>
      
      <Link 
        to="/levels" 
        className={`flex flex-col items-center ${path === "/levels" ? "text-rewario-purple" : "text-gray-500"}`}
      >
        <Award size={24} className={path === "/levels" ? "text-rewario-purple" : "text-gray-500"} />
        <span className="text-xs mt-1">Levels</span>
      </Link>
      
      <Link 
        to="/settings" 
        className={`flex flex-col items-center ${path === "/settings" ? "text-rewario-purple" : "text-gray-500"}`}
      >
        <Settings size={24} className={path === "/settings" ? "text-rewario-purple" : "text-gray-500"} />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default BottomNav;
