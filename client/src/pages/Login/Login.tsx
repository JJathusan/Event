import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Calendar, User, Building2, Shield } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [tab, setTab] = useState("customer");
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [vendorType, setVendorType] = useState("hotel");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setVendorType("hotel");
    setIsSignUp(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (role: "customer" | "vendor" | "admin") => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let endpoint = "";
      let body: any = { email, password };

      if (role === "customer" && isSignUp) {
        endpoint = "/signup/customer";
        body.name = name;
      } else if (role === "vendor" && isSignUp) {
        endpoint = "/signup/vendor";
        body.name = name;
        body.vendorType = vendorType;
      } else {
        endpoint = "/login";
        body.role = role;
      }

      const response = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isSignUp) {
        setSuccess("Account created successfully!");
      } else {
        onLogin(data.user);
        onClose();
        resetForm();
      }
    } catch {
      setError("Network Error. Check your backend.");
    }

    setLoading(false);
  };

  const renderInput = (id: string, label: string, value: string, setter: any, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="h-11"
      />
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-8">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow">
            <Calendar className="h-7 w-7 text-white" />
          </div>

          <DialogTitle className="text-3xl font-semibold">Welcome to EventHub</DialogTitle>
          <DialogDescription className="text-gray-500">
            Sign in to plan events or manage your vendor dashboard
          </DialogDescription>
        </DialogHeader>

        {/* TABS */}
        <Tabs defaultValue="customer" onValueChange={setTab} className="w-full mt-6">
          <TabsList className="grid grid-cols-3 h-12 bg-muted/40 p-1 rounded-lg">
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Customer
            </TabsTrigger>
            <TabsTrigger value="vendor" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Vendor
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Admin
            </TabsTrigger>
          </TabsList>

          {/* CUSTOMER */}
          <TabsContent value="customer">
            <Card className="border rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Customer {isSignUp ? "Sign Up" : "Login"}
                </CardTitle>
                <CardDescription>
                  {isSignUp ? "Sign up to manage your events" : "Sign in to manage your events"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {isSignUp && renderInput("cust-name", "Full Name", name, setName)}
                {renderInput("cust-email", "Email", email, setEmail, "email")}
                {renderInput("cust-pass", "Password", password, setPassword, "password")}

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <Button
                  onClick={() => handleSubmit("customer")}
                  disabled={loading}
                  className="w-full h-11"
                >
                  {loading ? "Please wait..." : isSignUp ? "Register" : "Sign In"}
                </Button>

                <Button variant="ghost" className="w-full" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Already have an account?" : "Need an account? Sign Up"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VENDOR */}
          <TabsContent value="vendor">
            <Card className="border rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Vendor {isSignUp ? "Registration" : "Login"}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {isSignUp && (
                  <>
                    {renderInput("ven-name", "Business Name", name, setName)}

                    <div className="space-y-2">
                      <Label className="text-sm">Vendor Type</Label>
                      <Select value={vendorType} onValueChange={setVendorType}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select vendor type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="venue">Venue & Hotels</SelectItem>
                          <SelectItem value="catering">Catering Services</SelectItem>
                          <SelectItem value="photography">Photography</SelectItem>
                          <SelectItem value="videography">Videography</SelectItem>
                          <SelectItem value="decoration">Decoration</SelectItem>
                          <SelectItem value="entertainment">DJ & Entertainment</SelectItem>
                          <SelectItem value="florist">Florist</SelectItem>
                          <SelectItem value="makeup">Makeup & Styling</SelectItem>
                          <SelectItem value="transport">Transportation</SelectItem>
                          <SelectItem value="equipment">Equipment Rental</SelectItem>
                          <SelectItem value="chef">Private Chef</SelectItem>
                          <SelectItem value="staff">Event Staff</SelectItem>
                          <SelectItem value="crafts">Crafts & Gifts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {renderInput("ven-email", "Email", email, setEmail, "email")}
                {renderInput("ven-pass", "Password", password, setPassword, "password")}

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <Button
                  onClick={() => handleSubmit("vendor")}
                  disabled={loading}
                  className="w-full h-11"
                >
                  {loading ? "Please wait..." : isSignUp ? "Register Business" : "Sign In"}
                </Button>

                <Button variant="ghost" className="w-full" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Already registered?" : "New vendor? Register"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADMIN */}
          <TabsContent value="admin">
            <Card className="border rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Admin Login</CardTitle>
                <CardDescription>Access the admin dashboard</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {renderInput("adm-email", "Email", email, setEmail, "email")}
                {renderInput("adm-pass", "Password", password, setPassword, "password")}

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  onClick={() => handleSubmit("admin")}
                  disabled={loading}
                  className="w-full h-11 bg-red-600 hover:bg-red-700"
                >
                  {loading ? "Please wait..." : "Login as Admin"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
