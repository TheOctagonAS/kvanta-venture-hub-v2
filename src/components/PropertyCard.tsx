import { Card } from "@/components/ui/card";
import { PropertyImage } from "./property/PropertyImage";
import { PropertyBadges } from "./property/PropertyBadges";
import { PropertyDetails } from "./property/PropertyDetails";
import { TradeButton } from "./trade/TradeButton";
import { OrderBook } from "./trade/OrderBook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { MapPin, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Property {
  id: string;
  name: string;
  location: string;
  price_per_token: number;
  image_url: string | null;
  yield: number;
  max_tokens: number;
  tokens_sold: number;
  launch_date: string | null;
  status: string;
  is_featured: boolean;
  property_type: string;
}

interface PropertyCardProps {
  property: Property;
  onSelectProperty?: (property: Property) => void;
}

export const PropertyCard = ({ property, onSelectProperty }: PropertyCardProps) => {
  const navigate = useNavigate();
  const isSoldOut = property.tokens_sold >= property.max_tokens;
  const isLive = property.launch_date && new Date(property.launch_date) <= new Date();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/orders/buy?propertyId=${property.id}`);
  };

  return (
    <Card className="overflow-hidden relative group transition-all duration-200 hover:shadow-md cursor-pointer">
      <div onClick={handleCardClick}>
        <div className="relative">
          <PropertyImage imageUrl={property.image_url} name={property.name} />
          <PropertyBadges 
            yield={property.yield} 
            isSoldOut={isSoldOut} 
            status={property.status}
            isFeatured={property.is_featured}
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-nordic-charcoal leading-tight">{property.name}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <Building2 className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{property.property_type}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Forventet leieavkastning</span>
              <span className="font-semibold text-[#345FF6]">{property.yield}%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Tilgjengelige tokens</span>
              <span className="font-semibold">
                {property.max_tokens - property.tokens_sold} / {property.max_tokens}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="mb-4">
            <span className="text-sm text-gray-600">Pris per token</span>
            <div className="text-xl font-bold text-[#345FF6]">
              {property.price_per_token.toLocaleString()} NOK
            </div>
          </div>

          <button 
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isLive && !isSoldOut
                ? "bg-[#345FF6] text-white hover:bg-[#345FF6]/90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isLive || isSoldOut}
            onClick={handleBuyClick}
          >
            {property.status === 'Coming Soon' 
              ? "Kommer snart" 
              : property.status === 'Sold Out' 
                ? "Utsolgt" 
                : "Handle tokens"}
          </button>
        </div>
      </div>
    </Card>
  );
};
