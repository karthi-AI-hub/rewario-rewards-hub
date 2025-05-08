
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useTask } from "../contexts/TaskContext";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/layout/BottomNav";
import TaskCard from "../components/TaskCard";
import CoinAmount from "../components/ui/CoinAmount";
import { Search, ChevronRight, User } from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useUser();
  const { tasks, filterTasks } = useTask();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All" },
    { id: "apps", name: "Apps" },
    { id: "surveys", name: "Surveys" },
    { id: "ads", name: "Ads" },
    { id: "games", name: "Games" },
    { id: "offers", name: "Offers" },
    { id: "referrals", name: "Referrals" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const filtered = filterTasks(selectedCategory === "all" ? undefined : selectedCategory);
    
    if (searchQuery) {
      setFilteredTasks(filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredTasks(filtered);
    }
  }, [selectedCategory, tasks, filterTasks, searchQuery]);

  if (!user) {
    return null; // Redirect happens in useEffect
  }

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

      {/* Categories */}
      <div className="px-4 py-3 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2">
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

      {/* Tasks List */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Available Tasks</h2>
          <button className="text-sm text-rewario-purple flex items-center">
            View All
            <ChevronRight size={16} />
          </button>
        </div>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
