import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Trash2, Plus, Minus, ShoppingBag, Lock, RefreshCw, CreditCard } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

interface ShoppingCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function ShoppingCart({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background flex items-center justify-center px-4">
        <Card className="max-w-lg w-full border-2 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Discover unique handmade items from talented artisans
            </p>
            <Button onClick={() => window.history.back()} size="lg" className="px-8">
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge className="mb-4" variant="secondary">Checkout</Badge>
          <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-2">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Items in your cart
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">by {item.vendor}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 h-8 text-center"
                            min="1"
                          />
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </div>
                          <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < cartItems.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24 border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-primary">
                    🎉 Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {shipping === 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-700">
                    ✓ You qualify for FREE shipping!
                  </p>
                </div>
              )}

              <Button 
                onClick={onCheckout}
                className="w-full h-12"
                size="lg"
              >
                <Lock className="mr-2 h-4 w-4" />
                Secure Checkout
              </Button>

              <div className="text-center">
                <Button variant="ghost" onClick={() => window.history.back()}>
                  Continue Shopping
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Encrypted Payment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}