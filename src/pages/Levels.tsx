
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import BottomNav from "../components/layout/BottomNav";
import { Award, Check, Lock } from "lucide-react";

const levelData = [
  { 
    level: 1, 
    tasksRequired: 0, 
    maxTasksPerDay: 5, 
    benefits: ["Access to basic tasks", "Up to $1 per task", "Referral program access"]
  },
  { 
    level: 2, 
    tasksRequired: 10, 
    maxTasksPerDay: 10, 
    benefits: ["Access to medium tasks", "Up to $3 per task", "Bonus coins on weekends"]
  },
  { 
    level: 3, 
    tasksRequired: 25, 
    maxTasksPerDay: 15, 
    benefits: ["Access to premium tasks", "Up to $5 per task", "Weekly bonus rewards"]
  },
  { 
    level: 4, 
    tasksRequired: 50, 
    maxTasksPerDay: 20, 
    benefits: ["Access to all tasks", "Up to $10 per task", "Priority support", "Early access to new features"]
  },
  { 
    level: 5, 
    tasksRequired: 100, 
    maxTasksPerDay: 30, 
    benefits: ["VIP tasks", "Up to $20 per task", "Lower withdrawal threshold", "Personal account manager"]
  }
];

const Levels = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  // Calculate progress to next level
  const currentLevelData = levelData.find(l => l.level === user.level);
  const nextLevelData = levelData.find(l => l.level === user.level + 1);
  
  let progress = 0;
  if (currentLevelData && nextLevelData && user.completedTasks >= currentLevelData.tasksRequired) {
    progress = ((user.completedTasks - currentLevelData.tasksRequired) / 
      (nextLevelData.tasksRequired - currentLevelData.tasksRequired)) * 100;
  }
  
  // Ensure progress doesn't exceed 100%
  progress = Math.min(progress, 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold mb-6">Levels & Benefits</h1>
        
        {/* Current Level Card */}
        <div className="rewario-card bg-rewario-lightBlue mb-6">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-rewario-purple text-white flex items-center justify-center mr-3">
              <Award size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Level {user.level}</h2>
              <p className="text-sm text-gray-600">
                {user.completedTasks} / {nextLevelData?.tasksRequired || "∞"} tasks completed
              </p>
            </div>
          </div>
          
          {nextLevelData && (
            <>
              <div className="h-2 bg-white rounded-full mb-2">
                <div 
                  className="h-full bg-rewario-purple rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-right text-gray-600">
                {Math.ceil(nextLevelData.tasksRequired - user.completedTasks)} tasks to Level {user.level + 1}
              </p>
            </>
          )}
          
          <div className="mt-4 p-3 bg-white rounded-lg">
            <h3 className="font-medium mb-2">Current Benefits</h3>
            <ul className="space-y-2">
              {currentLevelData?.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* All Levels */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">All Levels</h2>
        
        <div className="space-y-4">
          {levelData.map((level) => {
            const isCurrentLevel = level.level === user.level;
            const isUnlocked = level.level <= user.level;
            
            return (
              <div 
                key={level.level} 
                className={`rewario-card ${
                  isCurrentLevel 
                    ? "border-2 border-rewario-purple" 
                    : isUnlocked 
                      ? "bg-white" 
                      : "bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      isUnlocked 
                        ? "bg-rewario-purple text-white" 
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {isUnlocked ? (
                        <Award size={20} />
                      ) : (
                        <Lock size={20} />
                      )}
                    </div>
                    <h3 className={`font-bold ${!isUnlocked && "text-gray-500"}`}>
                      Level {level.level}
                    </h3>
                  </div>
                  
                  {isCurrentLevel && (
                    <span className="text-xs bg-rewario-purple text-white px-3 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                
                <div className={`grid grid-cols-2 gap-3 mb-3 ${!isUnlocked && "text-gray-500"}`}>
                  <div className="bg-gray-50 p-2 rounded-lg text-center">
                    <p className="text-xs mb-1">Required Tasks</p>
                    <p className="font-semibold">{level.tasksRequired}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center">
                    <p className="text-xs mb-1">Tasks Per Day</p>
                    <p className="font-semibold">{level.maxTasksPerDay}</p>
                  </div>
                </div>
                
                <h4 className={`text-sm font-medium mb-2 ${!isUnlocked && "text-gray-500"}`}>Benefits:</h4>
                <ul className="space-y-2">
                  {level.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check size={16} className={`mr-2 flex-shrink-0 ${
                        isUnlocked ? "text-green-500" : "text-gray-400"
                      }`} />
                      <span className={!isUnlocked ? "text-gray-500" : ""}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Levels;
