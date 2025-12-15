import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Store, Calendar, User } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  cartItemCount: number;
}

export function Navigation({ currentView, onViewChange, cartItemCount }: NavigationProps) {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">EventsHub</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button
                variant={currentView === "crafts" ? "default" : "ghost"}
                onClick={() => onViewChange("crafts")}
                className="flex items-center gap-2"
              >
                <Store className="h-4 w-4" />
                Crafts & Gifts
              </Button>
              <Button
                variant={currentView === "events" ? "default" : "ghost"}
                onClick={() => onViewChange("events")}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Events
              </Button>
              <Button
                variant={currentView === "vendor" ? "default" : "ghost"}
                onClick={() => onViewChange("vendor")}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Vendor Dashboard
              </Button>
            </div>
          </div>

          {/* Cart Button */}
          <Button
            variant={currentView === "cart" ? "default" : "ghost"}
            onClick={() => onViewChange("cart")}
            className="relative flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1">
            <Button
              variant={currentView === "crafts" ? "default" : "ghost"}
              onClick={() => onViewChange("crafts")}
              size="sm"
              className="flex-1"
            >
              <Store className="h-4 w-4" />
            </Button>
            <Button
              variant={currentView === "events" ? "default" : "ghost"}
              onClick={() => onViewChange("events")}
              size="sm"
              className="flex-1"
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant={currentView === "vendor" ? "default" : "ghost"}
              onClick={() => onViewChange("vendor")}
              size="sm"
              className="flex-1"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}