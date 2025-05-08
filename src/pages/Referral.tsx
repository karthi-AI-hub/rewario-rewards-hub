
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import BottomNav from "../components/layout/BottomNav";
import CoinAmount from "../components/ui/CoinAmount";
import { Copy, Share2, Users, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Referral {
  id: string;
  name: string;
  joinDate: Date;
  tasksCompleted: number;
  level: number;
}

const Referral = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const referralUrl = `https://rewario.com/ref/${user?.referralCode || ""}`;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Mock referrals
    const mockReferrals: Referral[] = [
      {
        id: "ref-1",
        name: "Jane Smith",
        joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        tasksCompleted: 12,
        level: 2
      },
      {
        id: "ref-2",
        name: "Alex Johnson",
        joinDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        tasksCompleted: 8,
        level: 1
      }
    ];
    
    setReferrals(mockReferrals);
  }, [isAuthenticated, navigate]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl);
    toast.success("Referral link copied to clipboard");
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join me on Rewario!",
        text: "Sign up using my referral code and get bonus coins!",
        url: referralUrl
      }).catch(err => {
        console.error("Share failed:", err);
      });
    } else {
      copyReferralLink();
    }
  };

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold mb-6">Referral Program</h1>
        
        {/* Referral Card */}
        <div className="rewario-card bg-gradient-to-r from-rewario-purple to-rewario-blue text-white mb-6">
          <h2 className="text-lg font-semibold mb-3">Invite Friends & Earn</h2>
          <p className="text-sm opacity-90 mb-4">
            Share your referral code with friends. When they join and complete tasks, you'll earn bonus coins!
          </p>
          
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mb-4">
            <p className="text-xs mb-1">Your Referral Code</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-mono font-bold">{user.referralCode}</span>
              <button 
                onClick={copyReferralLink}
                className="p-2 bg-white bg-opacity-20 rounded-full"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
              <p className="text-xs mb-1">Per Referral</p>
              <CoinAmount amount={50} size="md" className="justify-center" />
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
              <p className="text-xs mb-1">Level 2 Referral</p>
              <CoinAmount amount={20} size="md" className="justify-center" />
            </div>
          </div>
          
          <button 
            onClick={shareReferralLink}
            className="mt-5 w-full bg-white text-rewario-purple py-3 rounded-full font-medium flex items-center justify-center"
          >
            <Share2 size={18} className="mr-2" />
            Share Referral Link
          </button>
        </div>
      </div>
      
      {/* Referral Info */}
      <div className="p-4">
        {/* How it works */}
        <div className="rewario-card mb-6">
          <h2 className="font-semibold mb-3 flex items-center">
            <Users size={18} className="mr-2 text-rewario-purple" />
            How Referrals Work
          </h2>
          
          <ul className="space-y-3">
            <li className="flex">
              <div className="w-6 h-6 rounded-full bg-rewario-lightPurple flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs font-medium">1</span>
              </div>
              <span className="text-gray-700">Share your unique referral code with friends</span>
            </li>
            <li className="flex">
              <div className="w-6 h-6 rounded-full bg-rewario-lightPurple flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs font-medium">2</span>
              </div>
              <span className="text-gray-700">Friends sign up using your code</span>
            </li>
            <li className="flex">
              <div className="w-6 h-6 rounded-full bg-rewario-lightPurple flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs font-medium">3</span>
              </div>
              <span className="text-gray-700">You earn 50 coins for each friend that joins</span>
            </li>
            <li className="flex">
              <div className="w-6 h-6 rounded-full bg-rewario-lightPurple flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs font-medium">4</span>
              </div>
              <span className="text-gray-700">Earn 10% of your friends' earnings (Level 1 referral)</span>
            </li>
            <li className="flex">
              <div className="w-6 h-6 rounded-full bg-rewario-lightPurple flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs font-medium">5</span>
              </div>
              <span className="text-gray-700">Earn 5% from people your friends refer (Level 2 referral)</span>
            </li>
          </ul>
        </div>
        
        {/* Your Referrals */}
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Users size={20} className="mr-2" />
          Your Referrals
          <span className="ml-2 bg-rewario-lightPurple px-2 py-0.5 rounded-full text-xs">
            {referrals.length}
          </span>
        </h2>
        
        {referrals.length > 0 ? (
          <div className="space-y-3">
            {referrals.map((ref) => (
              <div key={ref.id} className="rewario-card flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-rewario-lightGreen flex items-center justify-center mr-3">
                    <span className="font-bold">{ref.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{ref.name}</h3>
                    <p className="text-xs text-gray-500">Level {ref.level} • {ref.tasksCompleted} tasks</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">No referrals yet</p>
            <button 
              onClick={shareReferralLink}
              className="mt-4 rewario-button-primary"
            >
              Invite Friends
            </button>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Referral;
