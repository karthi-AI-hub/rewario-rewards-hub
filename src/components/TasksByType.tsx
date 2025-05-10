
import { useState, useEffect } from "react";
import { Task } from "../types/tasks";
import TaskCard from "./TaskCard";
import { AppWindow, ClipboardList, Video, Gamepad, Link as LinkIcon } from "lucide-react";

interface TasksByTypeProps {
  tasks: Task[];
  title: string;
  type: 'app_install' | 'survey' | 'video_ad' | 'game' | 'affiliate';
}

const TasksByType = ({ tasks, title, type }: TasksByTypeProps) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    setFilteredTasks(tasks.filter(task => task.type === type));
  }, [tasks, type]);
  
  const getTypeIcon = () => {
    switch (type) {
      case 'app_install':
        return <AppWindow size={20} className="mr-2 text-rewario-blue" />;
      case 'survey':
        return <ClipboardList size={20} className="mr-2 text-rewario-green" />;
      case 'video_ad':
        return <Video size={20} className="mr-2 text-rewario-yellow" />;
      case 'game':
        return <Gamepad size={20} className="mr-2 text-rewario-purple" />;
      case 'affiliate':
        return <LinkIcon size={20} className="mr-2 text-rewario-pink" />;
    }
  };
  
  if (filteredTasks.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        {getTypeIcon()}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksByType;
