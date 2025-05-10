
import { Link } from "react-router-dom";
import { Task } from "../types/tasks";
import CoinAmount from "./ui/CoinAmount";
import { ExternalLink, Clock, Star, DollarSign } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  // Define category styles
  const categoryIcons: Record<string, string> = {
    apps: "bg-rewario-lightBlue",
    surveys: "bg-rewario-lightGreen",
    ads: "bg-rewario-lightYellow",
    games: "bg-rewario-lightPurple",
    offers: "bg-rewario-lightPeach",
    referrals: "bg-rewario-lightPink",
  };
  
  const cardBg = categoryIcons[task.category] || "bg-white";

  return (
    <Link to={`/task/${task.id}`} className="block">
      <div className={`rewario-card mb-3 ${cardBg} transition-transform duration-200 hover:scale-[1.02]`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span>{task.partner.name}</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full mx-2"></div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{task.timeRequired}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <CoinAmount amount={task.coinValue} size="md" />
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <DollarSign size={10} className="mr-0.5" /> 
              <span>₹{task.rewardInr}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <span className="text-xs px-3 py-1 bg-white rounded-full text-gray-600 border border-gray-200">
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
            
            {task.minLevel && task.minLevel > 1 && (
              <span className="text-xs px-2 py-1 ml-2 bg-white rounded-full text-gray-600 border border-gray-200 flex items-center">
                <Star size={10} className="mr-1 text-rewario-yellow" fill="#FFCC4D" />
                {task.minLevel}+
              </span>
            )}
          </div>
          
          <button className="flex items-center text-xs font-medium text-rewario-purple">
            <span>View Task</span>
            <ExternalLink size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
