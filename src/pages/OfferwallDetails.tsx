
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { ArrowLeft, Search } from "lucide-react";
import { Task } from "../types/tasks";
import TaskCard from "../components/TaskCard";
import BottomNav from "../components/layout/BottomNav";
import { getOfferwallTasks } from "../services/offerwallService";
import { offerwallProviders } from "../services/offerwallService";
import { useQuery } from "@tanstack/react-query";
import TasksByType from "../components/TasksByType";

const OfferwallDetails = () => {
  const { offerwallId } = useParams<{ offerwallId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  
  const offerwall = offerwallProviders.find(p => p.id === offerwallId);
  
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['offerwallTasks', offerwallId],
    queryFn: () => getOfferwallTasks(offerwallId || ''),
    enabled: !!offerwallId
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Filter tasks based on search query
  const filteredTasks = searchQuery && tasks 
    ? tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks || [];
    
  // Group tasks by type
  const tasksByType = {
    app_install: filteredTasks.filter(task => task.type === 'app_install'),
    survey: filteredTasks.filter(task => task.type === 'survey'),
    video_ad: filteredTasks.filter(task => task.type === 'video_ad'),
    game: filteredTasks.filter(task => task.type === 'game'),
    affiliate: filteredTasks.filter(task => task.type === 'affiliate')
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className={`p-6 ${offerwall?.backgroundColor || 'bg-white'}`}>
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate("/offerwalls")}
            className="p-2 rounded-full bg-white/80 mr-4"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold">{offerwall?.name || 'Offerwall'}</h1>
            <p className="text-sm text-gray-600">{offerwall?.description}</p>
          </div>
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
      
      {/* Tasks by Type */}
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
          <>
            {tasksByType.app_install.length > 0 && (
              <TasksByType 
                tasks={filteredTasks} 
                title="App Installs" 
                type="app_install"
              />
            )}
            
            {tasksByType.survey.length > 0 && (
              <TasksByType 
                tasks={filteredTasks} 
                title="Surveys" 
                type="survey"
              />
            )}
            
            {tasksByType.video_ad.length > 0 && (
              <TasksByType 
                tasks={filteredTasks} 
                title="Video Ads" 
                type="video_ad"
              />
            )}
            
            {tasksByType.game.length > 0 && (
              <TasksByType 
                tasks={filteredTasks} 
                title="Games" 
                type="game"
              />
            )}
            
            {tasksByType.affiliate.length > 0 && (
              <TasksByType 
                tasks={filteredTasks} 
                title="Affiliate Offers" 
                type="affiliate"
              />
            )}
          </>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">No tasks available from this offerwall</p>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default OfferwallDetails;
