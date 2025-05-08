
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import BottomNav from "../components/layout/BottomNav";
import CoinAmount from "../components/ui/CoinAmount";
import { ArrowDownCircle, ArrowUpCircle, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: "earned" | "withdrawn";
  amount: number;
  source: string;
  date: Date;
}

const Wallet = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Mock transactions
    const mockTransactions: Transaction[] = [
      {
        id: "tx-1",
        type: "earned",
        amount: 50,
        source: "Coinbase task completion",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        id: "tx-2",
        type: "earned",
        amount: 25,
        source: "Survey completion",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        id: "tx-3",
        type: "earned",
        amount: 75,
        source: "Game task completion",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        id: "tx-4",
        type: "withdrawn",
        amount: 100,
        source: "PayPal withdrawal",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      }
    ];
    
    setTransactions(mockTransactions);
  }, [isAuthenticated, navigate]);

  const handleWithdraw = () => {
    if (!user) return;
    
    if (user.coins < 500) {
      toast.error("Minimum withdrawal is 500 coins", {
        description: `You have ${user.coins} coins`
      });
      return;
    }
    
    toast.info("Withdrawal feature coming soon", {
      description: "This feature will be available in the next update"
    });
  };

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold mb-6">Wallet</h1>
        
        {/* Balance Card */}
        <div className="rewario-card bg-rewario-lightBlue mb-6">
          <p className="text-sm text-gray-600 mb-1">Total Balance</p>
          <div className="flex items-center mb-4">
            <CoinAmount amount={user.coins} size="lg" />
            <span className="text-2xl font-bold ml-1">coins</span>
          </div>
          
          <button 
            onClick={handleWithdraw}
            className="w-full rewario-button-primary"
          >
            Withdraw
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Minimum withdrawal: 500 coins
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rewario-card bg-rewario-lightGreen">
            <p className="text-xs text-gray-500 mb-1">Today</p>
            <CoinAmount amount={user.dailyEarnings} size="lg" />
          </div>
          <div className="rewario-card bg-rewario-lightPurple">
            <p className="text-xs text-gray-500 mb-1">Tasks Completed</p>
            <div className="text-lg font-semibold">{user.completedTasks}</div>
          </div>
        </div>
      </div>
      
      {/* Transactions */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="rewario-card flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  tx.type === "earned" ? "bg-green-100" : "bg-blue-100"
                }`}>
                  {tx.type === "earned" ? (
                    <ArrowDownCircle size={20} className="text-green-600" />
                  ) : (
                    <ArrowUpCircle size={20} className="text-blue-600" />
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{tx.source}</h3>
                    <CoinAmount 
                      amount={tx.amount} 
                      size="md" 
                      className={tx.type === "withdrawn" ? "text-blue-600" : ""}
                    />
                  </div>
                  <div className="flex items-center mt-1">
                    <Calendar size={14} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{formatDate(tx.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Wallet;
