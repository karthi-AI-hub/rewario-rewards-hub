
import { Task, TasksResponse } from "../types/tasks";
import { offerwallProviders } from "./offerwallService";

// Mock task data
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Install Shopping App",
    description: "Download and sign up for the Shopping App to earn coins",
    type: "app_install",
    partner: {
      id: "tapjoy",
      name: "Tapjoy",
      logo: "/icons/tapjoy.png",
      type: "offerwall"
    },
    trackingUrl: "https://example.com/track?offer=123",
    rewardInr: 50,
    coinValue: 40,
    timeRequired: "5 minutes",
    instructions: [
      "Download the app",
      "Create an account",
      "Complete the tutorial",
      "Your reward will be credited within 24 hours"
    ],
    category: "apps",
    status: "available"
  },
  {
    id: "task-2",
    title: "Complete Survey",
    description: "Complete a short survey about your shopping habits",
    type: "survey",
    partner: {
      id: "fyber",
      name: "Fyber",
      logo: "/icons/fyber.png",
      type: "offerwall"
    },
    trackingUrl: "https://example.com/track?offer=456",
    rewardInr: 25,
    coinValue: 20,
    timeRequired: "2 minutes",
    instructions: [
      "Answer all questions honestly",
      "Complete all pages of the survey",
      "Submit the survey when finished"
    ],
    category: "surveys",
    status: "available"
  },
  {
    id: "task-3",
    title: "Watch Video Ad",
    description: "Watch a full video advertisement to earn coins",
    type: "video_ad",
    partner: {
      id: "chartboost",
      name: "Chartboost",
      logo: "/icons/chartboost.png",
      type: "offerwall"
    },
    trackingUrl: "https://example.com/track?offer=789",
    rewardInr: 15,
    coinValue: 12,
    timeRequired: "30 seconds",
    instructions: [
      "Watch the entire video without skipping",
      "Keep the app in foreground while watching",
      "After completion, you will be redirected back"
    ],
    category: "ads",
    status: "available"
  },
  {
    id: "task-4",
    title: "Play Mobile Game",
    description: "Download and reach level 5 in the mobile game",
    type: "game",
    partner: {
      id: "ironsource",
      name: "IronSource",
      logo: "/icons/ironsource.png",
      type: "offerwall"
    },
    trackingUrl: "https://example.com/track?offer=012",
    rewardInr: 100,
    coinValue: 80,
    timeRequired: "20 minutes",
    instructions: [
      "Download and install the game",
      "Create an account or play as guest",
      "Complete the tutorial",
      "Reach level 5 in the game"
    ],
    category: "games",
    status: "available",
    minLevel: 2
  },
  {
    id: "task-5",
    title: "Premium Survey",
    description: "Complete a detailed marketing survey",
    type: "survey",
    partner: {
      id: "offertoro",
      name: "OfferToro",
      logo: "/icons/offertoro.png",
      type: "offerwall"
    },
    trackingUrl: "https://example.com/track?offer=345",
    rewardInr: 75,
    coinValue: 60,
    timeRequired: "5 minutes",
    instructions: [
      "Answer all questions honestly",
      "Complete all pages of the survey",
      "Your reward will be credited once verified"
    ],
    category: "surveys",
    status: "available",
    minLevel: 2
  },
  {
    id: "task-6",
    title: "Refer a Friend",
    description: "Get a friend to sign up using your referral code",
    type: "affiliate",
    partner: {
      id: "monlix",
      name: "Monlix",
      logo: "/icons/monlix.png",
      type: "offerwall"
    },
    trackingUrl: "https://example.com/track?offer=678",
    rewardInr: 150,
    coinValue: 120,
    timeRequired: "Varies",
    instructions: [
      "Share your unique referral code with friends",
      "They must sign up and complete one task",
      "Both of you will receive rewards"
    ],
    category: "referrals",
    status: "available"
  },
  {
    id: "task-7",
    title: "Elite Gaming Task",
    description: "Download and complete specific missions in the featured game",
    type: "game",
    partner: {
      id: "adgem",
      name: "AdGem",
      logo: "/icons/adgem.png",
      type: "offerwall"
    },
    trackingUrl: "https://example.com/track?offer=901",
    rewardInr: 250,
    coinValue: 200,
    timeRequired: "45 minutes",
    instructions: [
      "Download the game",
      "Complete the tutorial",
      "Reach level 10",
      "Complete 3 special missions"
    ],
    category: "games",
    status: "available",
    minLevel: 3
  }
];

// Mock function to fetch tasks
export const fetchTasks = (category?: string): Promise<TasksResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredTasks = category 
        ? mockTasks.filter(task => task.category === category) 
        : mockTasks;
      
      resolve({
        tasks: filteredTasks,
        hasMore: false
      });
    }, 800);
  });
};

// Mock function to fetch a specific task by ID
export const fetchTaskById = (id: string): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const task = mockTasks.find(task => task.id === id);
      
      if (task) {
        resolve(task);
      } else {
        reject(new Error("Task not found"));
      }
    }, 500);
  });
};

// Mock function to complete a task
export const completeTask = (taskId: string): Promise<void> => {
  return new Promise((resolve) => {
    // In a real app, this would make API calls to update the database
    // For now, we just simulate a delay
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// Utility function to calculate coin value from INR (80%)
export const calculateCoinValue = (inrAmount: number): number => {
  return Math.floor(inrAmount * 0.8);
};
