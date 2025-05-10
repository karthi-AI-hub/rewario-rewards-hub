
import { OfferwallProvider } from "../types/tasks";

export const offerwallProviders: OfferwallProvider[] = [
  {
    id: 'tapjoy',
    name: 'Tapjoy',
    logo: '/icons/tapjoy.png',
    description: 'Complete surveys, play games, and more',
    active: true,
    backgroundColor: '#F2FCE2',
    textColor: '#4B9E5F'
  },
  {
    id: 'fyber',
    name: 'Fyber',
    logo: '/icons/fyber.png',
    description: 'App installs and premium surveys',
    active: true,
    backgroundColor: '#D3E4FD',
    textColor: '#3B7DD8'
  },
  {
    id: 'chartboost',
    name: 'Chartboost',
    logo: '/icons/chartboost.png',
    description: 'Game offers and app installs',
    active: true,
    backgroundColor: '#E5DEFF',
    textColor: '#6B5ED9'
  },
  {
    id: 'ironsource',
    name: 'IronSource',
    logo: '/icons/ironsource.png',
    description: 'Video ads and app promotions',
    active: true,
    backgroundColor: '#FEF7CD',
    textColor: '#D9A52B'
  },
  {
    id: 'offertoro',
    name: 'OfferToro',
    logo: '/icons/offertoro.png',
    description: 'Surveys and trial offers',
    active: true,
    backgroundColor: '#FDE1D3',
    textColor: '#E87941'
  },
  {
    id: 'monlix',
    name: 'Monlix',
    logo: '/icons/monlix.png',
    description: 'Premium surveys and CPA offers',
    active: true,
    backgroundColor: '#FFDEE2',
    textColor: '#D9516B'
  },
  {
    id: 'admantum',
    name: 'AdMantum',
    logo: '/icons/admantum.png',
    description: 'App installs and video ads',
    active: true,
    backgroundColor: '#F1F0FB',
    textColor: '#5B5A6B'
  },
  {
    id: 'cpalead',
    name: 'CPALead',
    logo: '/icons/cpalead.png',
    description: 'Global survey network',
    active: true,
    backgroundColor: '#D3E4FD',
    textColor: '#3B7DD8'
  },
  {
    id: 'adgem',
    name: 'AdGem',
    logo: '/icons/adgem.png',
    description: 'Mobile offers and surveys',
    active: true,
    backgroundColor: '#F2FCE2',
    textColor: '#4B9E5F'
  }
];

// Mock function to get offerwall providers
export const getOfferwallProviders = () => {
  return new Promise<OfferwallProvider[]>((resolve) => {
    setTimeout(() => {
      resolve(offerwallProviders);
    }, 500);
  });
};

// Mock function to get tasks for a specific offerwall
export const getOfferwallTasks = (offerwallId: string) => {
  // This would normally make an API call to the backend
  // For now, we'll return mock data based on the offerwall ID
  return new Promise<Task[]>((resolve) => {
    setTimeout(() => {
      // Mock implementation - create different tasks for each offerwall
      const mockTasks = generateMockTasksForOfferwall(offerwallId, 5);
      resolve(mockTasks);
    }, 800);
  });
};

// Helper function to generate mock tasks for an offerwall
const generateMockTasksForOfferwall = (offerwallId: string, count: number): Task[] => {
  const tasks: Task[] = [];
  const provider = offerwallProviders.find(p => p.id === offerwallId);
  
  if (!provider) return tasks;
  
  const types: ('app_install' | 'survey' | 'video_ad' | 'game' | 'affiliate')[] = [
    'app_install', 'survey', 'video_ad', 'game', 'affiliate'
  ];
  
  const categories = ['apps', 'surveys', 'ads', 'games', 'offers'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const rewardInr = Math.floor(Math.random() * 100) + 10; // 10-110 INR
    const coinValue = Math.floor(rewardInr * 0.8); // 80% conversion
    
    tasks.push({
      id: `${offerwallId}-task-${i}`,
      title: getRandomTaskTitle(type),
      description: getRandomTaskDescription(type),
      type,
      partner: {
        id: provider.id,
        name: provider.name,
        logo: provider.logo,
        type: 'offerwall'
      },
      trackingUrl: `https://example.com/${offerwallId}/track?id=${i}`,
      rewardInr,
      coinValue,
      timeRequired: getRandomTimeRequired(type),
      instructions: getRandomInstructions(type),
      category,
      status: 'available',
      minLevel: Math.floor(Math.random() * 3) + 1,
      offerwall: offerwallId,
      offerwallTaskId: `${offerwallId}-${i}`,
      conversionRate: 0.8
    });
  }
  
  return tasks;
};

// Helper functions for generating random task data
function getRandomTaskTitle(type: string): string {
  const titles = {
    app_install: [
      'Install Shopping App',
      'Download Music Player',
      'Try New Fitness App',
      'Install Recipe App',
      'Download Travel App'
    ],
    survey: [
      'Shopping Habits Survey',
      'Media Consumption Survey',
      'Product Feedback Survey',
      'Market Research Survey',
      'Consumer Preferences Survey'
    ],
    video_ad: [
      'Watch Product Demo',
      'View Brand Commercial',
      'Watch App Tutorial',
      'View Game Trailer',
      'Watch Service Overview'
    ],
    game: [
      'Reach Level 5 in RPG Game',
      'Complete Puzzle Challenge',
      'Play Casino Game',
      'Complete Racing Game Tutorial',
      'Play Strategy Game'
    ],
    affiliate: [
      'Sign Up for Streaming Service',
      'Create Food Delivery Account',
      'Subscribe to Newsletter',
      'Register for Online Course',
      'Try Premium Service Free Trial'
    ]
  };
  
  const options = titles[type as keyof typeof titles] || titles.app_install;
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomTaskDescription(type: string): string {
  const descriptions = {
    app_install: 'Download this app and open it to receive your reward',
    survey: 'Complete a short survey to earn coins',
    video_ad: 'Watch a video advertisement to completion',
    game: 'Install and play this game to earn rewards',
    affiliate: 'Sign up for this service to earn coins'
  };
  
  return descriptions[type as keyof typeof descriptions] || descriptions.app_install;
}

function getRandomTimeRequired(type: string): string {
  const times = {
    app_install: ['2 minutes', '3 minutes', '5 minutes'],
    survey: ['5 minutes', '10 minutes', '15 minutes'],
    video_ad: ['30 seconds', '1 minute', '2 minutes'],
    game: ['10 minutes', '15 minutes', '20 minutes'],
    affiliate: ['5 minutes', '7 minutes', '10 minutes']
  };
  
  const options = times[type as keyof typeof times] || times.app_install;
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomInstructions(type: string): string[] {
  const instructions = {
    app_install: [
      'Download the app from the link provided',
      'Open the app and create an account',
      'Complete the tutorial or intro screens',
      'Allow any required permissions'
    ],
    survey: [
      'Answer all questions honestly',
      'Complete all pages of the survey',
      'Submit the survey when finished'
    ],
    video_ad: [
      'Watch the entire video without skipping',
      'Keep the app in foreground while watching',
      'After completion, you will be redirected back'
    ],
    game: [
      'Download and install the game',
      'Create an account or play as guest',
      'Complete the tutorial',
      'Reach the required level or objective'
    ],
    affiliate: [
      'Click on the link to visit the partner website',
      'Sign up for an account',
      'Complete any required verification steps',
      'Your reward will be credited within 24 hours'
    ]
  };
  
  return instructions[type as keyof typeof instructions] || instructions.app_install;
}

import { Task } from "../types/tasks";
