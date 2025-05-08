
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import BottomNav from "../components/layout/BottomNav";
import { 
  User, Mail, Bell, Shield, HelpCircle, LogOut, 
  ChevronRight, ExternalLink, Moon, Sun
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${!darkMode ? "Dark" : "Light"} mode enabled`,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        {/* Profile Card */}
        <div className="rewario-card mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <User size={28} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center mt-1">
                <div className="bg-rewario-lightPurple text-rewario-purple text-xs px-2 py-0.5 rounded-full">
                  Level {user.level}
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full mx-2"></div>
                <p className="text-xs text-gray-500">
                  Joined {new Date(user.joinDate || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => toast({
              title: "Profile edit coming soon",
              description: "This feature will be available in the next update"
            })}
            className="mt-4 py-2 w-full border border-gray-200 rounded-lg text-sm font-medium"
          >
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Settings */}
      <div className="p-4">
        <div className="space-y-4">
          {/* Account */}
          <div className="rewario-card">
            <h2 className="font-semibold mb-3">Account</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightGreen flex items-center justify-center mr-3">
                    <User size={16} className="text-rewario-green" />
                  </div>
                  <span>Personal Information</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightBlue flex items-center justify-center mr-3">
                    <Mail size={16} className="text-rewario-blue" />
                  </div>
                  <span>Email Settings</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightOrange flex items-center justify-center mr-3">
                    <Bell size={16} className="text-orange-500" />
                  </div>
                  <span>Notifications</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </li>
            </ul>
          </div>
          
          {/* App Settings */}
          <div className="rewario-card">
            <h2 className="font-semibold mb-3">App Settings</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightYellow flex items-center justify-center mr-3">
                    {darkMode ? (
                      <Moon size={16} className="text-rewario-yellow" />
                    ) : (
                      <Sun size={16} className="text-rewario-yellow" />
                    )}
                  </div>
                  <span>Dark Mode</span>
                </div>
                <div 
                  onClick={handleToggleDarkMode}
                  className={`w-12 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
                    darkMode ? "bg-rewario-purple" : "bg-gray-300"
                  }`}
                >
                  <div 
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      darkMode ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightPink flex items-center justify-center mr-3">
                    <Shield size={16} className="text-rewario-pink" />
                  </div>
                  <span>Privacy Settings</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="rewario-card">
            <h2 className="font-semibold mb-3">Support & Legal</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightGreen flex items-center justify-center mr-3">
                    <HelpCircle size={16} className="text-rewario-green" />
                  </div>
                  <span>Help Center</span>
                </div>
                <ExternalLink size={18} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightBlue flex items-center justify-center mr-3">
                    <Shield size={16} className="text-rewario-blue" />
                  </div>
                  <span>Privacy Policy</span>
                </div>
                <ExternalLink size={18} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rewario-lightPurple flex items-center justify-center mr-3">
                    <Shield size={16} className="text-rewario-purple" />
                  </div>
                  <span>Terms of Service</span>
                </div>
                <ExternalLink size={18} className="text-gray-400" />
              </li>
            </ul>
          </div>
          
          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="rewario-card w-full flex items-center justify-center text-red-600 py-3"
          >
            <LogOut size={18} className="mr-2" />
            <span>Log Out</span>
          </button>
          
          <div className="text-center text-xs text-gray-500 mt-4">
            <p>Rewario v1.0.0</p>
            <p className="mt-1">© 2023 Rewario. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Settings;
