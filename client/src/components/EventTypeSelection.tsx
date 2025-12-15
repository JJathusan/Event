import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Heart,
  Briefcase,
  Cake,
  Gift,
  PartyPopper,
  Sparkles
} from "lucide-react";

interface EventTypeSelectionProps {
  onSelectType: (type: string) => void;
}

export function EventTypeSelection({ onSelectType }: EventTypeSelectionProps) {
  // Manually stored event types (frontend only for now)
  const eventTypes = [
    {
      id: "wedding",
      name: "Wedding",
      icon: <Heart className="h-8 w-8" />,
      description: "Celebrate your special day",
      color: "from-pink-500 to-rose-500",
      popular: true
    },
    {
      id: "birthday",
      name: "Birthday",
      icon: <Cake className="h-8 w-8" />,
      description: "Make birthdays memorable",
      color: "from-purple-500 to-pink-500",
      popular: false
    },
    {
      id: "corporate",
      name: "Corporate Event",
      icon: <Briefcase className="h-8 w-8" />,
      description: "Professional business events",
      color: "from-blue-500 to-cyan-500",
      popular: true
    },
    {
      id: "engagement",
      name: "Engagement",
      icon: <Gift className="h-8 w-8" />,
      description: "Begin your journey together",
      color: "from-amber-500 to-orange-500",
      popular: false
    },
    {
      id: "party",
      name: "Party",
      icon: <PartyPopper className="h-8 w-8" />,
      description: "Celebrate life's moments",
      color: "from-green-500 to-emerald-500",
      popular: false
    },
    {
      id: "other",
      name: "Other Events",
      icon: <Sparkles className="h-8 w-8" />,
      description: "Custom celebrations",
      color: "from-violet-500 to-purple-500",
      popular: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-4" variant="secondary">Step 1</Badge>

        <h2 className="text-3xl mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Select Your Event Type
        </h2>

        <p className="text-muted-foreground">
          Choose the type of event you're planning to get personalized vendor recommendations
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventTypes.map((type) => (
          <Card
            key={type.id}
            className="cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            onClick={() => onSelectType(type.id)}
          >
            {/* Popular Badge */}
            {type.popular && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-primary shadow-lg">Popular</Badge>
              </div>
            )}

            <CardContent className="p-6">
              <div className="space-y-4">

                {/* Icon Section */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {type.icon}
                </div>

                {/* Text Section */}
                <div>
                  <h3 className="text-xl mb-1 group-hover:text-primary transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
