
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white flex flex-col">
      <div className="mb-10 flex items-center">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold ml-4">Log In</h1>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold rewario-gradient-text mb-2">Welcome to Rewario</h2>
        <p className="text-gray-600">Log in and start earning rewards</p>
      </div>

      <form onSubmit={handleLogin} className="flex-grow flex flex-col">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="rewario-input pl-10 w-full"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rewario-input pl-10 pr-10 w-full"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button
            type="submit"
            className={`rewario-button-primary w-full ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-rewario-purple font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
