
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Coins, Award, Clock, Gift } from "lucide-react";

interface WelcomeProps {
  onComplete: () => void;
}

const onboardingSlides = [
  {
    title: "Earn Daily",
    description: "Complete small tasks and earn real rewards every single day",
    icon: <Coins size={48} className="text-rewario-yellow" fill="#FFCC4D" strokeWidth={1} />,
    color: "bg-rewario-lightYellow",
  },
  {
    title: "Multiple Tasks",
    description: "Choose from various task types - surveys, games, offers and more",
    icon: <Award size={48} className="text-rewario-purple" />,
    color: "bg-rewario-lightPurple",
  },
  {
    title: "Instant Payouts",
    description: "Get your rewards quickly through multiple payout options",
    icon: <Clock size={48} className="text-rewario-blue" />,
    color: "bg-rewario-lightBlue",
  },
  {
    title: "Invite & Earn",
    description: "Share with friends and earn bonus rewards for each referral",
    icon: <Gift size={48} className="text-rewario-green" />,
    color: "bg-rewario-lightGreen",
  },
];

const Welcome = ({ onComplete }: WelcomeProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-white">
      {/* Logo */}
      <div className="flex justify-center mt-8 mb-6">
        <h1 className="text-3xl font-bold rewario-gradient-text">Rewario</h1>
      </div>

      {/* Slides */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className={`mx-auto rounded-full ${onboardingSlides[currentSlide].color} p-6 w-20 h-20 flex items-center justify-center mb-6`}>
            {onboardingSlides[currentSlide].icon}
          </div>
          <h2 className="text-2xl font-bold mb-4">{onboardingSlides[currentSlide].title}</h2>
          <p className="text-gray-600 max-w-xs mx-auto">
            {onboardingSlides[currentSlide].description}
          </p>
        </motion.div>
      </div>

      {/* Dots and Next button */}
      <div className="mb-12">
        <div className="flex justify-center space-x-2 mb-8">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-rewario-purple w-6" : "bg-gray-300"
              } transition-all duration-300`}
            ></div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full rewario-button-primary flex items-center justify-center"
        >
          <span>{currentSlide === onboardingSlides.length - 1 ? "Get Started" : "Next"}</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
