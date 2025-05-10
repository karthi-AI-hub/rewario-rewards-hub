
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { ArrowLeft } from "lucide-react";
import BottomNav from "../components/layout/BottomNav";
import { getOfferwallProviders } from "../services/offerwallService";
import { OfferwallProvider } from "../types/tasks";
import OfferwallProvidersList from "../components/OfferwallProvidersList";
import { useQuery } from "@tanstack/react-query";

const Offerwalls = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['offerwallProviders'],
    queryFn: getOfferwallProviders
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-full bg-gray-100 mr-4"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold">Offerwalls</h1>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Choose an offerwall to complete tasks and earn rewards. Different offerwalls offer different types of tasks.
        </p>
      </div>

      {/* Offerwall Providers List */}
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">Loading offerwalls...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">Error loading offerwalls. Please try again.</p>
          </div>
        ) : providers && providers.length > 0 ? (
          <OfferwallProvidersList providers={providers} />
        ) : (
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-500">No offerwalls available at the moment</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Offerwalls;
