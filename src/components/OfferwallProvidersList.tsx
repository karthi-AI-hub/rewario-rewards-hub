
import { useState } from 'react';
import { OfferwallProvider } from '../types/tasks';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface OfferwallProvidersListProps {
  providers: OfferwallProvider[];
  onSelectOfferwall?: (providerId: string) => void;
}

const OfferwallProvidersList = ({ providers, onSelectOfferwall }: OfferwallProvidersListProps) => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleProviderClick = (providerId: string) => {
    setSelectedProvider(providerId);
    if (onSelectOfferwall) {
      onSelectOfferwall(providerId);
    } else {
      navigate(`/offerwall/${providerId}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {providers.map((provider) => (
        <div
          key={provider.id}
          className={`rewario-card p-3 cursor-pointer transition-transform duration-200 hover:scale-[1.03] ${
            provider.backgroundColor
          } ${selectedProvider === provider.id ? 'ring-2 ring-rewario-purple' : ''}`}
          onClick={() => handleProviderClick(provider.id)}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                {provider.logo ? (
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <span className="font-bold text-sm">{provider.name.charAt(0)}</span>
                )}
              </div>
              <span className={`font-medium ${provider.textColor}`}>{provider.name}</span>
            </div>
            <p className="text-xs text-gray-600 mb-2 flex-grow">{provider.description}</p>
            <div className="flex justify-end">
              <button className="text-xs flex items-center text-rewario-purple font-medium">
                <span>View Offers</span>
                <ExternalLink size={12} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferwallProvidersList;
