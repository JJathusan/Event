import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Lock, 
  MapPin, 
  ShoppingBag,
  CheckCircle2,
  ArrowLeft,
  Truck,
  Shield
} from "lucide-react";
import { addOrder, type CartItem, type Order } from "../lib/store";
import { toast } from "sonner";

interface CheckoutPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onCheckoutComplete: () => void;
  userId: string;
  userName: string;
  userEmail: string;
}

export function CheckoutPage({ 
  cartItems, 
  onBack, 
  onCheckoutComplete,
  userId,
  userName,
  userEmail 
}: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [shippingInfo, setShippingInfo] = useState({
    fullName: userName,
    email: userEmail,
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  // Group items by vendor for multi-vendor processing
  const itemsByVendor = cartItems.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = [];
    }
    acc[item.vendorId].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const handlePlaceOrder = () => {
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    // Create separate orders for each vendor
    Object.entries(itemsByVendor).forEach(([vendorId, items]) => {
      const vendorTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const vendorOrder: Order = {
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        customerId: userId,
        customerName: userName,
        customerEmail: userEmail,
        items: items,
        total: vendorTotal,
        status: 'pending',
        createdAt: new Date().toISOString(),
        vendorId: vendorId
      };
      
      addOrder(vendorOrder);
    });

    toast.success("Order placed successfully! Check your email for confirmation.");
    onCheckoutComplete();
  };

  const renderShippingStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Shipping Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={shippingInfo.fullName}
              onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={shippingInfo.email}
              onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              placeholder="123 Main Street"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              placeholder="New York"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
              placeholder="NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={shippingInfo.zipCode}
              onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
              placeholder="10001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={shippingInfo.country}
              onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
              placeholder="United States"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Payment Method
        </h3>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
          <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
              <CreditCard className="h-5 w-5" />
              <div>
                <div className="font-medium">Credit/Debit Card</div>
                <div className="text-sm text-muted-foreground">Visa, Mastercard, Amex</div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer flex-1">
              <Wallet className="h-5 w-5" />
              <div>
                <div className="font-medium">PayPal</div>
                <div className="text-sm text-muted-foreground">Pay with PayPal account</div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank" className="flex items-center gap-3 cursor-pointer flex-1">
              <Building2 className="h-5 w-5" />
              <div>
                <div className="font-medium">Bank Transfer</div>
                <div className="text-sm text-muted-foreground">Direct bank payment</div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-4 p-6 border-2 rounded-lg bg-muted/30">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              value={paymentInfo.cardName}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                placeholder="123"
                maxLength={4}
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <Lock className="h-4 w-4" />
            Your payment information is encrypted and secure
          </div>
        </div>
      )}
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Review Your Order</h3>
        
        {/* Shipping Details */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Shipping Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <p className="font-medium">{shippingInfo.fullName}</p>
              <p className="text-muted-foreground">{shippingInfo.address}</p>
              <p className="text-muted-foreground">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </p>
              <p className="text-muted-foreground">{shippingInfo.country}</p>
              <p className="text-muted-foreground mt-2">{shippingInfo.email}</p>
              <p className="text-muted-foreground">{shippingInfo.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {paymentMethod === "card" && <CreditCard className="h-5 w-5" />}
              {paymentMethod === "paypal" && <Wallet className="h-5 w-5" />}
              {paymentMethod === "bank" && <Building2 className="h-5 w-5" />}
              <span className="capitalize">{paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod}</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items by Vendor */}
        <div className="space-y-4">
          <h4 className="font-semibold">Order Items</h4>
          {Object.entries(itemsByVendor).map(([vendorId, items]) => (
            <Card key={vendorId}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Vendor: {items[0].vendor}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 p-4 border rounded-lg mt-6">
          <Checkbox 
            id="terms" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          />
          <div className="space-y-1">
            <Label htmlFor="terms" className="cursor-pointer">
              I agree to the terms and conditions
            </Label>
            <p className="text-xs text-muted-foreground">
              By placing this order, you agree to our Terms of Service and Privacy Policy. 
              You authorize EventHub to process payment and share your information with vendors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
          <h1 className="text-4xl mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your order in a few simple steps</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
                  <Badge variant="secondary" className="text-sm">
                    Step {step === "shipping" ? 1 : step === "payment" ? 2 : 3} of 3
                  </Badge>
                </div>
                <CardDescription>
                  {step === "shipping" && "Enter your shipping information"}
                  {step === "payment" && "Choose your payment method"}
                  {step === "review" && "Review and confirm your order"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[
                    { id: "shipping", label: "Shipping", icon: Truck },
                    { id: "payment", label: "Payment", icon: CreditCard },
                    { id: "review", label: "Review", icon: CheckCircle2 }
                  ].map((s, index) => (
                    <div key={s.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                            step === s.id || (step === "payment" && s.id === "shipping") || (step === "review" && s.id !== "review")
                              ? "bg-primary text-primary-foreground shadow-lg"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <s.icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs mt-2 font-medium">{s.label}</span>
                      </div>
                      {index < 2 && (
                        <div className="flex-1 mx-2">
                          <div
                            className={`h-1 rounded-full transition-all ${
                              (step === "payment" && index === 0) || (step === "review" && index < 2)
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                {step === "shipping" && renderShippingStep()}
                {step === "payment" && renderPaymentStep()}
                {step === "review" && renderReviewStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (step === "payment") setStep("shipping");
                      else if (step === "review") setStep("payment");
                    }}
                    disabled={step === "shipping"}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      if (step === "shipping") setStep("payment");
                      else if (step === "payment") setStep("review");
                      else handlePlaceOrder();
                    }}
                    className="shadow-lg shadow-primary/20"
                  >
                    {step === "review" ? "Place Order" : "Continue"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 sticky top-24">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                      <div className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0" 
                           style={{ backgroundImage: `url(${item.image})` }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <Badge variant="secondary" className="text-xs">Free</Badge>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">Free shipping on orders over $50!</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t">
                  <Lock className="h-3 w-3" />
                  Secure checkout powered by EventHub
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
