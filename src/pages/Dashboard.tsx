
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/layout/BottomNav";
import TaskCard from "../components/TaskCard";
import CoinAmount from "../components/ui/CoinAmount";
import { Search, ChevronRight, User, LayoutGrid, Newspaper, TrendingUp } from "lucide-react";
import { Task } from "../types/tasks";
import { fetchTasks } from "../services/taskService";
import { getOfferwallProviders } from "../services/offerwallService";
import OfferwallProvidersList from "../components/OfferwallProvidersList";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All" },
    { id: "apps", name: "App Installs" },
    { id: "surveys", name: "Surveys" },
    { id: "ads", name: "Video Ads" },
    { id: "games", name: "Games" },
    { id: "offers", name: "Affiliate" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Use React Query to fetch tasks
  const { data: tasksResponse, isLoading: tasksLoading, error: tasksError } = useQuery({
    queryKey: ['tasks', selectedCategory],
    queryFn: () => fetchTasks(selectedCategory === 'all' ? undefined : selectedCategory),
  });

  // Use React Query to fetch offerwall providers
  const { data: offerwallProviders, isLoading: offerwallsLoading } = useQuery({
    queryKey: ['offerwallProviders'],
    queryFn: () => getOfferwallProviders()
  });

  // Filter tasks based on search query
  const filteredTasks = searchQuery && tasksResponse?.tasks 
    ? tasksResponse.tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasksResponse?.tasks || [];

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  const handleOfferwallSelect = (providerId: string) => {
    navigate(`/offerwall/${providerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with user info */}
      <div className="bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold rewario-gradient-text">Rewario</h1>
            <p className="text-sm text-gray-500">Hello, {user.name}</p>
          </div>
          <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
            <User size={20} />
          </div>
        </div>

        {/* User stats */}
        <div className="bg-rewario-lightPurple rounded-xl p-4 mb-5">
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500">Today's Earnings</p>
              <CoinAmount amount={user.dailyEarnings} size="lg" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Balance</p>
              <CoinAmount amount={user.coins} size="lg" />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Level {user.level}</p>
            <div className="h-2 bg-white rounded-full mt-1">
              <div 
                className="h-full bg-rewario-purple rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rewario-input pl-10 w-full"
          />
        </div>
      </div>

      {/* Offerwall Providers Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <LayoutGrid size={18} className="text-rewario-purple mr-2" />
            <h2 className="text-lg font-semibold">Offerwalls</h2>
          </div>
          <button 
            className="text-sm text-rewario-purple flex items-center"
            onClick={() => navigate('/offerwalls')}
          >
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        
        {offerwallsLoading ? (
          <div className="text-center py-4 bg-white rounded-xl mb-6">
            <p className="text-gray-500">Loading offerwalls...</p>
          </div>
        ) : offerwallProviders && offerwallProviders.length > 0 ? (
          <div className="mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-3 pb-2">
              {offerwallProviders.slice(0, 5).map(provider => (
                <div
                  key={provider.id}
                  className={`flex-shrink-0 w-32 rewario-card p-3 cursor-pointer ${provider.backgroundColor} transition-transform duration-200 hover:scale-[1.05]`}
                  onClick={() => handleOfferwallSelect(provider.id)}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                      {provider.logo ? (
                        <img 
                          src={provider.logo} 
                          alt={provider.name} 
                          className="w-6 h-6 object-contain" 
                        />
                      ) : (
                        <span className="font-bold text-sm">{provider.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${provider.textColor}`}>{provider.name}</span>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {provider.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 bg-white rounded-xl mb-6">
            <p className="text-gray-500">No offerwalls available</p>
          </div>
        )}

        {/* Categories */}
        <div className="mb-4 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                  selectedCategory === category.id
                    ? "bg-rewario-purple text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Tasks Section */}
        <div>
          <div className="flex items-center mb-4">
            <TrendingUp size={18} className="text-rewario-green mr-2" />
            <h2 className="text-lg font-semibold">Featured Tasks</h2>
          </div>

          {tasksLoading ? (
            <div className="text-center py-8 bg-white rounded-xl">
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : tasksError ? (
            <div className="text-center py-8 bg-white rounded-xl">
              <p className="text-gray-500">Error loading tasks. Please try again.</p>
            </div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-xl">
              <p className="text-gray-500">No tasks found</p>
            </div>
          )}
        </div>

        {/* Daily News/Updates Section */}
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <Newspaper size={18} className="text-rewario-blue mr-2" />
            <h2 className="text-lg font-semibold">Latest Updates</h2>
          </div>

          <div className="rewario-card bg-rewario-lightGray">
            <h3 className="font-medium text-sm mb-2">New Offerwalls Added!</h3>
            <p className="text-xs text-gray-600">
              We've added 5 new offerwalls with better rewards and more task options. Check them out now!
            </p>
            <div className="mt-3 pt-2 border-t border-gray-200 flex justify-end">
              <button className="text-xs font-medium text-rewario-purple">Read More</button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
