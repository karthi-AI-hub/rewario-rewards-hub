
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: "apps" | "surveys" | "ads" | "games" | "offers" | "referrals";
  reward: number;
  timeRequired: string; // e.g., "5 min", "10 min"
  partner: {
    name: string;
    logo?: string;
  };
  instructions: string[];
  status: "available" | "completed" | "in_progress";
  expiresAt?: string;
}

interface TaskContextType {
  tasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  completeTask: (id: string) => void;
  startTask: (id: string) => void;
  filterTasks: (category?: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Install and register on Coinbase",
    description: "Download Coinbase app, create an account, and verify your email",
    category: "apps",
    reward: 50,
    timeRequired: "10 min",
    partner: {
      name: "Coinbase",
      logo: "/coinbase-logo.png"
    },
    instructions: [
      "Download the Coinbase app from App Store or Play Store",
      "Create a new account with your email",
      "Verify your email address",
      "Return to Rewario and click 'Mark as Completed'"
    ],
    status: "available"
  },
  {
    id: "task-2",
    title: "Complete quick marketing survey",
    description: "Answer 10 questions about your shopping habits",
    category: "surveys",
    reward: 25,
    timeRequired: "5 min",
    partner: {
      name: "Pollfish",
      logo: "/pollfish-logo.png"
    },
    instructions: [
      "Click 'Start Task' to open the survey",
      "Answer all questions honestly",
      "Complete the entire survey",
      "You'll be redirected back to Rewario automatically"
    ],
    status: "available"
  },
  {
    id: "task-3",
    title: "Watch 3 short video ads",
    description: "Watch product advertisement videos to earn coins",
    category: "ads",
    reward: 15,
    timeRequired: "3 min",
    partner: {
      name: "AdMob",
      logo: "/admob-logo.png"
    },
    instructions: [
      "Click 'Start Task' to begin watching ads",
      "Watch all 3 videos completely",
      "Don't skip any ads",
      "Coins will be credited automatically after the last video"
    ],
    status: "available"
  },
  {
    id: "task-4",
    title: "Reach level 5 in Candy Crush",
    description: "Download and play Candy Crush Saga game",
    category: "games",
    reward: 75,
    timeRequired: "15 min",
    partner: {
      name: "King",
      logo: "/king-logo.png"
    },
    instructions: [
      "Download Candy Crush Saga",
      "Create a new account or play as guest",
      "Reach level 5 in the game",
      "Return to Rewario and click 'Mark as Completed'"
    ],
    status: "available"
  },
  {
    id: "task-5",
    title: "Sign up for Amazon Prime trial",
    description: "Register for a 30-day free trial of Amazon Prime",
    category: "offers",
    reward: 100,
    timeRequired: "8 min",
    partner: {
      name: "Amazon",
      logo: "/amazon-logo.png"
    },
    instructions: [
      "Click 'Start Task' to visit Amazon",
      "Create an Amazon account or sign in",
      "Sign up for the Amazon Prime 30-day free trial",
      "Enter your payment details (you won't be charged during trial)",
      "Return to Rewario and click 'Mark as Completed'"
    ],
    status: "available"
  },
  {
    id: "task-6",
    title: "Invite 3 friends to Rewario",
    description: "Share your referral link with friends and family",
    category: "referrals",
    reward: 150,
    timeRequired: "5 min",
    partner: {
      name: "Rewario",
      logo: "/rewario-logo.png"
    },
    instructions: [
      "Copy your unique referral link",
      "Share it with at least 3 friends via WhatsApp, Facebook, or other platforms",
      "Your friends need to sign up and complete at least one task",
      "Coins will be credited automatically for each successful referral"
    ],
    status: "available"
  }
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load tasks from localStorage or use mock data
    const storedTasks = localStorage.getItem("rewarioTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(mockTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("rewarioTasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const completeTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, status: "completed" } : task
      )
    );
  };

  const startTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, status: "in_progress" } : task
      )
    );
  };

  const filterTasks = (category?: string) => {
    if (!category || category === "all") {
      return tasks;
    }
    return tasks.filter(task => task.category === category);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTaskById,
        completeTask,
        startTask,
        filterTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
