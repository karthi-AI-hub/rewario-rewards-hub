
import { createContext, useContext, useState, ReactNode } from "react";

interface UserType {
  id?: string;
  name?: string;
  email?: string;
  level: number;
  coins: number;
  dailyEarnings: number;
  referralCode?: string;
  avatar?: string;
  joinDate?: string;
  completedTasks: number;
}

interface UserContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<UserType>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Check if user is already logged in (from localStorage)
  useState(() => {
    const storedUser = localStorage.getItem("rewarioUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock login for now - will be replaced with actual authentication
      const mockUser: UserType = {
        id: "user-123",
        name: "John Doe",
        email: email,
        level: 1,
        coins: 250,
        dailyEarnings: 50,
        referralCode: "JOHN123",
        avatar: "/avatar.png",
        joinDate: new Date().toISOString(),
        completedTasks: 3
      };
      
      setUser(mockUser);
      localStorage.setItem("rewarioUser", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Mock registration
      const mockUser: UserType = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        level: 1,
        coins: 100, // Signup bonus
        dailyEarnings: 0,
        referralCode: name.toUpperCase().substring(0, 4) + Math.floor(Math.random() * 100),
        avatar: "/avatar.png",
        joinDate: new Date().toISOString(),
        completedTasks: 0
      };
      
      setUser(mockUser);
      localStorage.setItem("rewarioUser", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rewarioUser");
  };

  const updateUser = (data: Partial<UserType>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("rewarioUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
