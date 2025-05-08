
import { Link } from "react-router-dom";
import { Task } from "../contexts/TaskContext";
import CoinAmount from "./ui/CoinAmount";
import { ExternalLink, Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
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
        <div className="flex justify-between items-start mb-2">
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
          <CoinAmount amount={task.reward} size="md" />
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs px-3 py-1 bg-white rounded-full text-gray-600 border border-gray-200">
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </span>
          
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
