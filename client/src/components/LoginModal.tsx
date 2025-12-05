import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { User, Building2, Calendar, Shield } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { id: string; name: string; email: string; role: 'customer' | 'vendor' | 'admin'; vendorType?: string }) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [vendorType, setVendorType] = useState("hotel");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (role: 'customer' | 'vendor' | 'admin') => {
    // Mock authentication - in real app, this would validate credentials
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || email.split('@')[0],
      email,
      role,
      vendorType: role === 'vendor' ? vendorType : undefined
    };
    
    onLogin(user);
    onClose();
    
    // Reset form
    setEmail("");
    setPassword("");
    setName("");
    setIsSignUp(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Calendar className="h-7 w-7 text-white" />
          </div>
          <DialogTitle className="text-3xl tracking-tight">Welcome to EventHub</DialogTitle>
          <DialogDescription className="text-base">
            Sign in to plan events or manage your vendor dashboard
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="customer" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-muted/50 p-1">
            <TabsTrigger value="customer" className="flex items-center gap-2 data-[state=active]:bg-card">
              <User className="h-4 w-4" />
              Customer
            </TabsTrigger>
            <TabsTrigger value="vendor" className="flex items-center gap-2 data-[state=active]:bg-card">
              <Building2 className="h-4 w-4" />
              Vendor
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2 data-[state=active]:bg-card">
              <Shield className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer" className="mt-6">
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Customer {isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
                    <CardDescription className="mt-1">
                      {isSignUp ? 'Create your account to book events' : 'Sign in to manage your events'}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Customer</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Full Name</Label>
                    <Input
                      id="customer-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <Input
                    id="customer-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button 
                    onClick={() => handleSubmit('customer')}
                    className="w-full h-11 shadow-lg shadow-primary/20"
                    size="lg"
                  >
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="w-full"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vendor" className="mt-6">
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Vendor {isSignUp ? 'Registration' : 'Login'}</CardTitle>
                    <CardDescription className="mt-1">
                      {isSignUp ? 'Register your business' : 'Access your vendor dashboard'}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Vendor</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {isSignUp && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="vendor-name">Business Name</Label>
                      <Input
                        id="vendor-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your business name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor-type">Vendor Type</Label>
                      <Select value={vendorType} onValueChange={setVendorType}>
                        <SelectTrigger id="vendor-type" className="h-11">
                          <SelectValue placeholder="Select vendor type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="venue">Event Venue</SelectItem>
                          <SelectItem value="catering">Catering Service</SelectItem>
                          <SelectItem value="decor">Decoration Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="vendor-email">Email</Label>
                  <Input
                    id="vendor-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor-password">Password</Label>
                  <Input
                    id="vendor-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button 
                    onClick={() => handleSubmit('vendor')}
                    className="w-full h-11 shadow-lg shadow-primary/20"
                    size="lg"
                  >
                    {isSignUp ? 'Register Business' : 'Sign In'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="w-full"
                  >
                    {isSignUp ? 'Already registered? Sign In' : 'New vendor? Register'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin" className="mt-6">
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Admin Login</CardTitle>
                    <CardDescription className="mt-1">
                      Access the administrative dashboard
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="h-11"
                  />
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSubmit('admin')}
                    className="w-full h-11 shadow-lg shadow-red-500/20 bg-red-600 hover:bg-red-700"
                    size="lg"
                  >
                    Sign In as Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}