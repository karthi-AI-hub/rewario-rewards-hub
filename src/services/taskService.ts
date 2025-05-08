
import { Task, TasksResponse } from '../types/tasks';
import { supabase } from '@/integrations/supabase/client';

// API base URL - in production this would be your backend URL
const API_BASE_URL = 'https://api.your-backend.com';

export const fetchTasks = async (
  category?: string,
  limit: number = 20,
  offset: number = 0
): Promise<TasksResponse> => {
  try {
    // In a real implementation, this would call your backend API
    // For now, we'll simulate a fetch from an API
    
    // This is a placeholder - in your real app, this would make a fetch to your external API
    // const response = await fetch(`${API_BASE_URL}/api/tasks?category=${category}&limit=${limit}&offset=${offset}`);
    // const data = await response.json();
    
    // For development, simulate API response with sample data
    // TODO: Replace with actual API call when backend is available
    const mockResponse = await getMockTasksResponse(category, limit, offset);
    return mockResponse;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchTaskById = async (taskId: string): Promise<Task | null> => {
  try {
    // For a real implementation, fetch from your backend:
    // const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`);
    // const data = await response.json();
    
    // For development, simulate API response with sample data
    // TODO: Replace with actual API call when backend is available
    const allTasks = await getMockTasksResponse();
    return allTasks.tasks.find(task => task.id === taskId) || null;
  } catch (error) {
    console.error('Error fetching task by id:', error);
    throw error;
  }
};

export const completeTask = async (taskId: string): Promise<void> => {
  try {
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // In a real implementation, this would call your backend API to mark task as completed
    // await fetch(`${API_BASE_URL}/api/tasks/${taskId}/complete`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${session.access_token}`
    //   }
    // });
    
    // For now, we'll record the task completion in Supabase directly
    // In your real implementation, this would be handled by your backend
    const { data: task } = await supabase
      .from('completed_tasks')
      .insert({
        user_id: user.id,
        task_id: taskId,
        coins_earned: 0, // This would be calculated by your backend based on task reward
      })
      .select()
      .single();
      
    // Update user coins (in production, your backend would handle this)
    const { data: tasks } = await getMockTasksResponse();
    const completedTask = tasks.tasks.find(t => t.id === taskId);
    
    if (completedTask) {
      await supabase
        .from('profiles')
        .update({ 
          coins: supabase.rpc('increment_coins', { amount: completedTask.coinValue }),
          daily_earnings: supabase.rpc('increment_daily_earnings', { amount: completedTask.coinValue }),
          completed_tasks: supabase.rpc('increment_completed_tasks', { amount: 1 })
        })
        .eq('id', user.id);
    }
    
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
};

// Helper function to get mock data for development
// This will be replaced by actual API calls in production
const getMockTasksResponse = async (
  category?: string, 
  limit: number = 20,
  offset: number = 0
): Promise<TasksResponse> => {
  // These are sample tasks to simulate API response
  const allTasks: Task[] = [
    {
      id: '1',
      title: 'Install Shopping App',
      description: 'Download and create an account on the popular shopping app',
      type: 'app_install',
      partner: { id: 'tapjoy-1', name: 'Tapjoy' },
      trackingUrl: 'https://tracking.tapjoy.com/shopping-app',
      rewardInr: 25,
      coinValue: Math.floor(25 * 0.8),
      timeRequired: '5 minutes',
      instructions: [
        'Click the link to download the app',
        'Install and open the app',
        'Create a new account',
        'Browse for at least 2 minutes'
      ],
      category: 'apps'
    },
    {
      id: '2',
      title: 'Complete Marketing Survey',
      description: 'Share your opinions in this 5-minute consumer survey',
      type: 'survey',
      partner: { id: 'swagbucks-1', name: 'Swagbucks' },
      trackingUrl: 'https://tracking.swagbucks.com/survey',
      rewardInr: 15,
      coinValue: Math.floor(15 * 0.8),
      timeRequired: '5 minutes',
      instructions: [
        'Click to start the survey',
        'Answer all questions honestly',
        'Complete the full survey',
        'Submit your responses'
      ],
      category: 'surveys'
    },
    {
      id: '3',
      title: 'Watch Video Advertisement',
      description: 'Watch this 30-second advertisement for rewards',
      type: 'video_ad',
      partner: { id: 'adcolony-1', name: 'AdColony' },
      trackingUrl: 'https://tracking.adcolony.com/video',
      rewardInr: 5,
      coinValue: Math.floor(5 * 0.8),
      timeRequired: '30 seconds',
      instructions: [
        'Click to start the video',
        'Watch the entire video',
        'Do not minimize the app',
        'Reward will be credited automatically'
      ],
      category: 'ads'
    },
    {
      id: '4',
      title: 'Reach Level 5 in Fantasy Game',
      description: 'Download and play this fantasy RPG game to level 5',
      type: 'game',
      partner: { id: 'vungle-1', name: 'Vungle' },
      trackingUrl: 'https://tracking.vungle.com/fantasy-game',
      rewardInr: 50,
      coinValue: Math.floor(50 * 0.8),
      timeRequired: '30 minutes',
      instructions: [
        'Download and install the game',
        'Create a game account',
        'Complete the tutorial',
        'Reach level 5 in the game'
      ],
      category: 'games'
    },
    {
      id: '5',
      title: 'Sign up for Streaming Service',
      description: 'Create a new account on premium streaming platform',
      type: 'affiliate',
      partner: { id: 'cj-affiliate-1', name: 'CJ Affiliate' },
      trackingUrl: 'https://tracking.cj.com/streaming-signup',
      rewardInr: 100,
      coinValue: Math.floor(100 * 0.8),
      timeRequired: '10 minutes',
      instructions: [
        'Click the offer link',
        'Sign up for a new account',
        'Enter valid payment information',
        'Confirm your account'
      ],
      category: 'offers'
    },
    {
      id: '6',
      title: 'Install Travel Booking App',
      description: 'Download and book a hotel on this travel app',
      type: 'app_install',
      partner: { id: 'fyber-1', name: 'Fyber' },
      trackingUrl: 'https://tracking.fyber.com/travel-app',
      rewardInr: 60,
      coinValue: Math.floor(60 * 0.8),
      timeRequired: '15 minutes',
      instructions: [
        'Install the travel app',
        'Create a new account',
        'Search for hotels in any city',
        'Complete a hotel booking (no payment required)'
      ],
      category: 'apps'
    },
    {
      id: '7',
      title: 'Health & Wellness Survey',
      description: 'Complete this health survey for major research study',
      type: 'survey',
      partner: { id: 'lifepoints-1', name: 'LifePoints' },
      trackingUrl: 'https://tracking.lifepoints.com/health-survey',
      rewardInr: 20,
      coinValue: Math.floor(20 * 0.8),
      timeRequired: '8 minutes',
      instructions: [
        'Answer health-related questions',
        'Complete all survey pages',
        'Submit your final responses'
      ],
      category: 'surveys'
    },
    {
      id: '8',
      title: 'Complete Mobile Game Tutorial',
      description: 'Install and complete the tutorial for this strategy game',
      type: 'game',
      partner: { id: 'chartboost-1', name: 'Chartboost' },
      trackingUrl: 'https://tracking.chartboost.com/strategy-game',
      rewardInr: 35,
      coinValue: Math.floor(35 * 0.8),
      timeRequired: '20 minutes',
      instructions: [
        'Download and install the game',
        'Complete the full tutorial',
        'Finish first campaign mission',
        'Reach player level 3'
      ],
      category: 'games'
    }
  ];
  
  let filteredTasks = allTasks;
  
  // Filter by category if provided
  if (category && category !== 'all') {
    filteredTasks = allTasks.filter(task => task.category === category);
  }
  
  // Apply pagination
  const paginatedTasks = filteredTasks.slice(offset, offset + limit);
  
  return {
    tasks: paginatedTasks,
    hasMore: offset + limit < filteredTasks.length
  };
};
