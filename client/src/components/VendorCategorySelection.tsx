import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import {
  Building2,
  Utensils,
  Camera,
  Palette,
  Sparkles,
  Music,
  Car,
  Package,
  ChefHat,
  Video,
  Flower2,
  Users,
  ArrowLeft
} from "lucide-react";

interface VendorCategorySelectionProps {
  eventType: string;
  onSelectCategory: (category: string) => void;
  onBack: () => void;
}

export function VendorCategorySelection({
  eventType,
  onSelectCategory,
  onBack
}: VendorCategorySelectionProps) {
  
  // ✅ FULL CATEGORY LIST (unchanged)
  const categories = [
    {
      id: "venue",
      name: "Venue",
      icon: <Building2 className="h-7 w-7" />,
      description: "Hotels, halls, and event spaces",
      color: "from-blue-500 to-cyan-500",
      count: "250+ vendors"
    },
    {
      id: "catering",
      name: "Catering",
      icon: <Utensils className="h-7 w-7" />,
      description: "Food and beverage services",
      color: "from-orange-500 to-amber-500",
      count: "180+ vendors"
    },
    {
      id: "photography",
      name: "Photography",
      icon: <Camera className="h-7 w-7" />,
      description: "Professional photography services",
      color: "from-purple-500 to-pink-500",
      count: "320+ vendors"
    },
    {
      id: "videography",
      name: "Videography",
      icon: <Video className="h-7 w-7" />,
      description: "Video recording and editing",
      color: "from-red-500 to-rose-500",
      count: "150+ vendors"
    },
    {
      id: "decoration",
      name: "Decoration",
      icon: <Palette className="h-7 w-7" />,
      description: "Theme and decor specialists",
      color: "from-pink-500 to-fuchsia-500",
      count: "200+ vendors"
    },
    {
      id: "florist",
      name: "Florist",
      icon: <Flower2 className="h-7 w-7" />,
      description: "Floral arrangements and design",
      color: "from-green-500 to-emerald-500",
      count: "120+ vendors"
    },
    {
      id: "makeup",
      name: "Makeup & Styling",
      icon: <Sparkles className="h-7 w-7" />,
      description: "Beauty and styling services",
      color: "from-violet-500 to-purple-500",
      count: "280+ vendors"
    },
    {
      id: "entertainment",
      name: "DJ / Entertainment",
      icon: <Music className="h-7 w-7" />,
      description: "Music and entertainment acts",
      color: "from-indigo-500 to-blue-500",
      count: "190+ vendors"
    },
    {
      id: "transport",
      name: "Transport",
      icon: <Car className="h-7 w-7" />,
      description: "Vehicle rentals and logistics",
      color: "from-teal-500 to-cyan-500",
      count: "140+ vendors"
    },
    {
      id: "equipment",
      name: "Equipment Rental",
      icon: <Package className="h-7 w-7" />,
      description: "Sound, lighting, and stage setup",
      color: "from-slate-500 to-gray-500",
      count: "95+ vendors"
    },
    {
      id: "chef",
      name: "Private Chef",
      icon: <ChefHat className="h-7 w-7" />,
      description: "Personal culinary experiences",
      color: "from-yellow-500 to-orange-500",
      count: "75+ vendors"
    },
    {
      id: "staff",
      name: "Event Staff",
      icon: <Users className="h-7 w-7" />,
      description: "Waiters, coordinators, security",
      color: "from-cyan-500 to-blue-500",
      count: "160+ vendors"
    }
  ];

  // ✅ FIXED: prevents crash when eventType is undefined
  const formatEventType = (type?: string) => {
    if (!type || typeof type !== "string") return "event";
    return type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ");
  };

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Event Types
        </Button>

        <div className="text-center">
          <Badge className="mb-4" variant="secondary">
            Step 2
          </Badge>

          <h2 className="text-3xl mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Select Vendor Category
          </h2>

          <p className="text-muted-foreground mb-2">
            Choose the type of vendor you need for your{" "}
            <span className="font-semibold text-foreground">
              {formatEventType(eventType)}
            </span>
          </p>

          <p className="text-sm text-muted-foreground">
            You can book multiple vendors for your event
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 group"
            onClick={() => onSelectCategory(category.id)}
          >
            <CardContent className="p-5">
              <div className="space-y-3">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md`}
                >
                  {category.icon}
                </div>

                <div>
                  <h3 className="text-lg mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-xs text-muted-foreground mb-2">
                    {category.description}
                  </p>

                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
