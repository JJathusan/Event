import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { CraftsModule } from "./components/CraftsModule";
import { EventsModule } from "./components/EventsModule";
import { VendorDashboard } from "./components/VendorDashboard";
import { HotelVendorDashboard } from "./components/HotelVendorDashboard";
import { CraftsVendorDashboard } from "./components/CraftsVendorDashboard";
import { ServicesVendorDashboard } from "./components/ServicesVendorDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { VendorSignup } from "./components/VendorSignup";
import { ShoppingCart } from "./components/ShoppingCart";
import { ProductDetails } from "./components/ProductDetails";
import { CheckoutPage } from "./components/CheckoutPage";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { LoginModal } from "./components/LoginModal";
import { Button } from "./components/ui/button";
import { ShoppingCart as ShoppingCartIcon, User, LogOut, Home, Calendar, Store, Shield, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Badge } from "./components/ui/badge";
import { Toaster } from "sonner";
import { saveUser, getUser, saveCart, getCart } from "./lib/store";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  vendorType?: string;
}

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

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load persisted state on mount
  useEffect(() => {
    const savedUser = getUser();
    const savedCart = getCart();
    
    if (savedUser) {
      setCurrentUser(savedUser);
      // Route user to their appropriate dashboard
      if (savedUser.role === 'vendor') {
        setCurrentView('vendor');
      } else if (savedUser.role === 'admin') {
        setCurrentView('admin');
      }
    }
    
    if (savedCart.length > 0) {
      setCartItems(savedCart);
    }
  }, []);

  // Persist user state
  useEffect(() => {
    saveUser(currentUser);
  }, [currentUser]);

  // Persist cart state
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'vendor') {
      setCurrentView('vendor');
    } else if (user.role === 'admin') {
      setCurrentView('admin');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
    setCurrentView('home');
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentView("checkout");
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
    setCurrentView("customer-dashboard");
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("product-details");
  };

  const goBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView("crafts");
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedProduct(null);
  };

  const handleVendorSignup = (vendorData: User) => {
    setCurrentUser(vendorData);
    setCurrentView('vendor');
  };

  const handleViewChange = (view: string) => {
    if ((view === 'events' || view === 'vendor') && !currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentView(view);
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            isLoggedIn={!!currentUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        );
      case "crafts":
        return (
          <CraftsModule
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
          />
        );
      case "events":
        return <EventsModule user={currentUser} />;
      case "vendor":
        if (currentUser?.role === 'vendor') {
          // Route to correct dashboard based on vendor type
          switch (currentUser.vendorType) {
            case 'hotel':
              return <HotelVendorDashboard vendor={currentUser} />;
            case 'crafts':
              return <CraftsVendorDashboard vendor={currentUser} />;
            case 'services':
              return <ServicesVendorDashboard vendor={currentUser} />;
            default:
              return <HotelVendorDashboard vendor={currentUser} />;
          }
        } else {
          return <VendorDashboard />;
        }
      case "cart":
        return (
          <ShoppingCart
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        );
      case "product-details":
        return selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={goBackToProducts}
          />
        ) : null;
      case "vendor-signup":
        return (
          <VendorSignup
            onSignupComplete={handleVendorSignup}
            onCancel={() => setCurrentView('home')}
          />
        );
      case "checkout":
        return currentUser ? (
          <CheckoutPage
            cartItems={cartItems}
            onBack={() => setCurrentView("cart")}
            onCheckoutComplete={handleCheckoutComplete}
            userId={currentUser.id}
            userName={currentUser.name}
            userEmail={currentUser.email}
          />
        ) : null;
      case "customer-dashboard":
        return currentUser && currentUser.role === 'customer' ? (
          <CustomerDashboard 
            user={currentUser}
            onNavigate={handleNavigate}
          />
        ) : null;
      case "admin":
        return <AdminDashboard />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            isLoggedIn={!!currentUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-2.5 group"
              onClick={() => setCurrentView("home")}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all shadow-lg shadow-primary/20">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">
                Event<span className="text-primary">Hub</span>
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant={currentView === "home" ? "default" : "ghost"}
                onClick={() => setCurrentView("home")}
                className="gap-2 h-9"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button
                variant={currentView === "crafts" ? "default" : "ghost"}
                onClick={() => setCurrentView("crafts")}
                className="gap-2 h-9"
              >
                <Store className="h-4 w-4" />
                Marketplace
              </Button>
              {/* Only show Events to customers and non-logged-in users */}
              {(!currentUser || currentUser.role === 'customer') && (
                <Button
                  variant={currentView === "events" ? "default" : "ghost"}
                  onClick={() => handleViewChange("events")}
                  className="gap-2 h-9"
                >
                  <Calendar className="h-4 w-4" />
                  Events
                </Button>
              )}
              {currentUser?.role === 'vendor' && (
                <Button
                  variant={currentView === "vendor" ? "default" : "ghost"}
                  onClick={() => setCurrentView("vendor")}
                  className="gap-2 h-9"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              )}
              {currentUser?.role === 'admin' && (
                <Button
                  variant={currentView === "admin" ? "default" : "ghost"}
                  onClick={() => setCurrentView("admin")}
                  className="gap-2 h-9"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Button>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant={currentView === "cart" ? "default" : "ghost"}
                onClick={() => setCurrentView("cart")}
                className="relative gap-2 h-9"
                size="sm"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary shadow-lg shadow-primary/30"
                  >
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
              
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 h-9">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <User className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="hidden sm:inline">{currentUser.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {currentUser.role === 'vendor' && (
                      <DropdownMenuItem onClick={() => setCurrentView("vendor")}>
                        <User className="mr-2 h-4 w-4" />
                        Vendor Dashboard
                      </DropdownMenuItem>
                    )}
                    {currentUser.role === 'admin' && (
                      <DropdownMenuItem onClick={() => setCurrentView("admin")}>
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    {currentUser.role === 'customer' && (
                      <>
                        <DropdownMenuItem onClick={() => setCurrentView("customer-dashboard")}>
                          <Package className="mr-2 h-4 w-4" />
                          My Orders & Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewChange("events")}>
                          <Calendar className="mr-2 h-4 w-4" />
                          My Events
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => setIsLoginModalOpen(true)} 
                  size="sm"
                  className="h-9 shadow-lg shadow-primary/20"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-3 border-t mt-2 pt-2">
            <div className="flex justify-around">
              <Button
                variant={currentView === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("home")}
              >
                <Home className="h-4 w-4" />
              </Button>
              <Button
                variant={currentView === "crafts" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("crafts")}
              >
                <Store className="h-4 w-4" />
              </Button>
              {/* Only show Events to customers and non-logged-in users */}
              {(!currentUser || currentUser.role === 'customer') && (
                <Button
                  variant={currentView === "events" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewChange("events")}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              )}
              {currentUser?.role === 'vendor' && (
                <Button
                  variant={currentView === "vendor" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("vendor")}
                >
                  <User className="h-4 w-4" />
                </Button>
              )}
              {currentUser?.role === 'admin' && (
                <Button
                  variant={currentView === "admin" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("admin")}
                >
                  <Shield className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main>
        {renderCurrentView()}
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      
      <Toaster position="top-right" richColors />
    </div>
  );
}