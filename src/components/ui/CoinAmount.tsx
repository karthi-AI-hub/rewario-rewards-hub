
import { Coins } from "lucide-react";

interface CoinAmountProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CoinAmount = ({ amount, size = "md", className = "" }: CoinAmountProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg font-semibold",
  };

  const iconSize = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Coins
        size={iconSize[size]}
        className="text-rewario-yellow mr-1"
        fill="#FFCC4D"
        strokeWidth={1.5}
      />
      <span className={`${sizeClasses[size]} font-medium`}>{amount}</span>
    </div>
  );
};

export default CoinAmount;
