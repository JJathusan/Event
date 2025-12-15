import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, MapPin, Wifi, Car, Coffee, Users, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HotelVendor {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
  availability: boolean;
}

interface HotelVendorCardProps {
  vendor: HotelVendor;
  onSelect: (vendor: HotelVendor) => void;
  onViewDetails: (vendor: HotelVendor) => void;
}

const amenityIcons: { [key: string]: React.ReactNode } = {
  'WiFi': <Wifi className="h-4 w-4" />,
  'Parking': <Car className="h-4 w-4" />,
  'Restaurant': <Coffee className="h-4 w-4" />,
  'Conference Room': <Users className="h-4 w-4" />
};

export function HotelVendorCard({ vendor, onSelect, onViewDetails }: HotelVendorCardProps) {
  return (
    <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden">
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={vendor.images[0]}
          alt={vendor.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {!vendor.availability && (
          <Badge variant="destructive" className="absolute top-3 right-3 shadow-lg">
            Fully Booked
          </Badge>
        )}
        {vendor.availability && (
          <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 shadow-lg">
            Available
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <CardTitle className="group-hover:text-primary transition-colors text-xl">
              {vendor.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              {vendor.location}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{vendor.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {vendor.reviews} reviews
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2 leading-relaxed">
          {vendor.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-bold">${vendor.pricePerNight}</div>
              <div className="text-xs text-muted-foreground">per night</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-bold">{vendor.capacity}</div>
              <div className="text-xs text-muted-foreground">max guests</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2">Amenities</div>
          <div className="flex flex-wrap gap-2">
            {vendor.amenities.slice(0, 4).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="flex items-center gap-1.5">
                {amenityIcons[amenity]}
                <span className="text-xs">{amenity}</span>
              </Badge>
            ))}
            {vendor.amenities.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{vendor.amenities.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            onClick={() => onViewDetails(vendor)}
            className="flex-1 hover:bg-primary/5 hover:border-primary transition-all"
          >
            Details
          </Button>
          <Button 
            onClick={() => onSelect(vendor)}
            disabled={!vendor.availability}
            className="flex-1"
          >
            {vendor.availability ? 'Select Venue' : 'Unavailable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}