
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import CoinAmount from "../components/ui/CoinAmount";
import { toast } from "sonner";
import { fetchTaskById, completeTask } from "../services/taskService";
import { useQuery } from "@tanstack/react-query";

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useUser();

  // Fetch task details
  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => fetchTaskById(id || ""),
    enabled: !!id
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const handleStartTask = () => {
    if (!task) return;
    
    // Open the tracking URL in a new tab/window
    window.open(task.trackingUrl, '_blank');
    
    // Mark task as in progress
    toast.info("Starting task...");
    
    // For demo purposes, we'll mark it as completed after 3 seconds
    // In a real app, this would be handled by callback URLs or manual verification
    setTimeout(() => {
      handleCompleteTask();
    }, 3000);
  };

  const handleCompleteTask = async () => {
    if (!task) return;
    
    try {
      // Call API to mark task as completed
      await completeTask(task.id);
      
      // Update user's coins locally
      updateUser({
        coins: user.coins + task.coinValue,
        dailyEarnings: user.dailyEarnings + task.coinValue,
        completedTasks: user.completedTasks + 1
      });
      
      // Show success message
      toast.success("Task completed! Coins added to your wallet.", {
        description: `+${task.coinValue} coins`,
      });
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error("Failed to complete task. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p>Loading task details...</p>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate("/dashboard")} className="p-2 rounded-full bg-gray-100 mr-4">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold">Error</h1>
        </div>
        <div className="rewario-card">
          <p className="text-center text-gray-500">Task not found or error loading task details.</p>
          <button onClick={() => navigate("/dashboard")} className="rewario-button-primary w-full mt-4">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white p-6">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-full bg-gray-100 mr-4"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold">Task Details</h1>
        </div>
      </div>
      
      {/* Task Info */}
      <div className="p-4">
        <div className="rewario-card mb-5">
          <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
          <p className="text-gray-600 mb-4">{task.description}</p>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Clock size={16} className="text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">{task.timeRequired}</span>
            </div>
            <CoinAmount amount={task.coinValue} size="lg" className="bg-rewario-lightYellow px-3 py-1 rounded-full" />
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-medium mb-2">Partner</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="font-bold">{task.partner.name.charAt(0)}</span>
                </div>
                <span>{task.partner.name}</span>
              </div>
              <div className="text-sm text-gray-500">₹{task.rewardInr}</div>
            </div>
          </div>
          
          <button 
            className="rewario-button-primary w-full"
            onClick={handleStartTask}
          >
            Start Task
          </button>
        </div>
        
        {/* Instructions */}
        <div className="rewario-card">
          <h3 className="font-semibold mb-3">Instructions</h3>
          <ul className="space-y-3">
            {task.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <div className="w-6 h-6 rounded-full bg-rewario-lightPurple flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-3 bg-yellow-50 rounded-lg flex items-start">
            <AlertCircle size={18} className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-700">
              Complete all steps carefully to ensure your reward is credited correctly. Tasks are verified before rewards are issued.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
