
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { ArrowLeft, Search } from "lucide-react";
import { fetchTasks } from "../services/taskService";
import { Task } from "../types/tasks";
import TaskCard from "../components/TaskCard";
import BottomNav from "../components/layout/BottomNav";
import { useQuery } from "@tanstack/react-query";

const TaskCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  
  const categoryLabels: Record<string, string> = {
    apps: "App Installs",
    surveys: "Surveys",
    ads: "Video Ads",
    games: "Games",
    offers: "Affiliate Offers",
  };
  
  const { data: tasksResponse, isLoading, error } = useQuery({
    queryKey: ['tasks', category],
    queryFn: () => fetchTasks(category),
    enabled: !!category
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Filter tasks based on search query
  const filteredTasks = searchQuery && tasksResponse?.tasks 
    ? tasksResponse.tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasksResponse?.tasks || [];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-full bg-gray-100 mr-4"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold">{category ? categoryLabels[category] || "Tasks" : "Tasks"}</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
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
      
      {/* Tasks List */}
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        ) : error ? (
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
      
      <BottomNav />
    </div>
  );
};

export default TaskCategory;
