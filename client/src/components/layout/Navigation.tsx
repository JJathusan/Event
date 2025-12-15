import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  ShoppingCart,
  Store,
  Calendar,
  User,
  LogOut,
  ListOrdered,
  Settings
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  cartItemCount: number;
  onLoginClick: () => void;
  userRole: "customer" | "vendor" | null;
}

export default function Navigation({
  currentView,
  onViewChange,
  cartItemCount,
  onLoginClick,
  userRole
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!userRole;

  /** EVENT BUTTON LOGIC — Cleaned version */
  const handleEventsClick = () => {
    if (!isLoggedIn) onLoginClick();
    else onViewChange("events"); // ✔ ALWAYS go to Events page
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const logout = () => {
    window.location.reload();
  };

  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#5B4BFF] flex items-center justify-center shadow-md">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold">
            Event<span className="text-blue-600">Hub</span>
          </span>
        </div>

        {/* CENTER NAV MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Button
            variant={currentView === "home" ? "default" : "ghost"}
            onClick={() => onViewChange("home")}
          >
            Home
          </Button>

          <Button
            variant={currentView === "crafts" ? "default" : "ghost"}
            onClick={() => onViewChange("crafts")}
            className="flex items-center gap-2"
          >
            <Store className="h-4 w-4" />
            Marketplace
          </Button>

          <Button
            variant={currentView === "events" ? "default" : "ghost"}
            onClick={handleEventsClick}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Events
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {/* CART */}
          <Button
            variant="ghost"
            onClick={() => onViewChange("cart")}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2">{cartItemCount}</Badge>
            )}
          </Button>

          {/* LOGIN / PROFILE DROPDOWN */}
          {!isLoggedIn ? (
            <Button onClick={onLoginClick} className="px-4">
              Get Started
            </Button>
          ) : (
            <div className="relative">
              <Button
                variant="ghost"
                className="rounded-full w-10 h-10 flex items-center justify-center"
                onClick={toggleMenu}
              >
                <User className="h-5 w-5" />
              </Button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border py-2 z-50">

                  {/* CUSTOMER OPTIONS */}
                  {userRole === "customer" && (
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                      onClick={() => onViewChange("customer-dashboard")}
                    >
                      <ListOrdered className="h-4 w-4" />
                      My Orders & Bookings
                    </button>
                  )}

                  {/* VENDOR OPTIONS */}
                  {userRole === "vendor" && (
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                      onClick={() => onViewChange("vendor-dashboard")}
                    >
                      <Settings className="h-4 w-4" />
                      My Events
                    </button>
                  )}

                  {/* LOGOUT */}
                  <button
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
