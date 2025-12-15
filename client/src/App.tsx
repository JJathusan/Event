import { useState } from "react";

// Layout
import Navigation from "./components/layout/Navigation";

// Pages
import HomePage from "./pages/Home/HomePage";
import { CraftsModule } from "./pages/Crafts/CraftsModule";
import { ShoppingCart } from "./pages/Cart/ShoppingCart";
import { LoginModal } from "./pages/Login/Login";
import EventsModule from "./pages/Events/EventsModule";

// Dashboards
import CustomerDashboard from "./pages/Customer/Dashboard";
import VendorDashboard from "./pages/Vendor/Dashboard";

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  vendor: string;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [view, setView] = useState("home");

  // LOGIN STATE
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const userRole = user?.role ?? null;

  // LOGIN SUCCESS
  const handleLogin = (loggedUser: any) => {
    setUser(loggedUser);
    setIsLoginOpen(false);

    if (loggedUser.role === "customer") setView("customer-dashboard");
    if (loggedUser.role === "vendor") setView("vendor-dashboard");
  };

  // ROUTER PROTECTION
  const handleViewChange = (newView: string) => {
    const protectedViews = ["events", "customer-dashboard", "vendor-dashboard"];

    if (protectedViews.includes(newView) && !user) {
      setIsLoginOpen(true);
      return;
    }

    setView(newView);
  };

  // CART STATE
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* NAVIGATION */}
      <Navigation
        currentView={view}
        onViewChange={handleViewChange}
        cartItemCount={cartCount}
        onLoginClick={() => setIsLoginOpen(true)}
        userRole={userRole}
      />

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      {/* ROUTER */}
      {view === "home" && <HomePage />}

      {view === "crafts" && (
        <CraftsModule
          onAddToCart={(product) =>
            setCartItems((prev) => [...prev, { ...product, quantity: 1 }])
          }
        />
      )}

      {view === "cart" && (
        <ShoppingCart
          cartItems={cartItems}
          onUpdateQuantity={(id, qty) =>
            setCartItems((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
              )
            )
          }
          onRemoveItem={(id) =>
            setCartItems((prev) => prev.filter((item) => item.id !== id))
          }
          onCheckout={() => alert("Checkout coming soon!")}
        />
      )}

      {/* EVENTS PAGE */}
      {view === "events" && user && <EventsModule user={user} />}

      {/* DASHBOARDS */}
      {view === "customer-dashboard" && user && (
        <CustomerDashboard user={user} onNavigate={handleViewChange} />
      )}

      {view === "vendor-dashboard" && user && (
        <VendorDashboard user={user} onNavigate={handleViewChange} />
      )}
    </>
  );
}

export default App;
