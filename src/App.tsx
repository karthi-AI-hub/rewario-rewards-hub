
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";
import TaskCategory from "./pages/TaskCategory";
import Wallet from "./pages/Wallet";
import Referral from "./pages/Referral";
import Levels from "./pages/Levels";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Offerwalls from "./pages/Offerwalls";
import OfferwallDetails from "./pages/OfferwallDetails";

// Context
import { UserProvider } from "./contexts/UserContext";
import { TaskProvider } from "./contexts/TaskContext";

const queryClient = new QueryClient();

const App = () => {
  // Check if user has seen onboarding
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const onboardingStatus = localStorage.getItem("hasSeenOnboarding");
    if (onboardingStatus === "true") {
      setHasSeenOnboarding(true);
    }
  }, []);

  const markOnboardingAsSeen = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TaskProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route 
                  path="/" 
                  element={hasSeenOnboarding ? <Login /> : <Welcome onComplete={markOnboardingAsSeen} />} 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/task/:id" element={<TaskDetail />} />
                <Route path="/category/:category" element={<TaskCategory />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/levels" element={<Levels />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/offerwalls" element={<Offerwalls />} />
                <Route path="/offerwall/:offerwallId" element={<OfferwallDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TaskProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
