import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  Store, 
  Building2, 
  Sparkles, 
  CheckCircle2,
  ArrowRight,
  Calendar,
  Package,
  Users,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

interface VendorSignupProps {
  onSignupComplete: (vendorData: any) => void;
  onCancel: () => void;
}

export function VendorSignup({ onSignupComplete, onCancel }: VendorSignupProps) {
  const [step, setStep] = useState(1);
  const [vendorType, setVendorType] = useState<string>("");
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    capacity: "",
    priceRange: "",
    amenities: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVendorTypeSelect = (type: string) => {
    setVendorType(type);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create vendor user object
    const vendorUser = {
      id: `vendor-${Date.now()}`,
      name: formData.businessName,
      email: formData.email,
      role: 'vendor' as const,
      vendorType: vendorType,
      profile: {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a)
      }
    };
    onSignupComplete(vendorUser);
  };

  const vendorTypes = [
    {
      id: "hotel",
      name: "Hotel & Venue",
      icon: Building2,
      description: "Event venues, hotels, conference centers",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "crafts",
      name: "Crafts & Gifts",
      icon: Store,
      description: "Handmade products, gift items, decorations",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "services",
      name: "Event Services",
      icon: Sparkles,
      description: "Catering, photography, entertainment",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl mb-4 shadow-lg shadow-primary/30">
            <Store className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl tracking-tight mb-2">Become a Vendor</h1>
          <p className="text-muted-foreground text-lg">
            Join EventHub and grow your business with our platform
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>
              {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : '1'}
            </div>
            <span className="text-sm font-medium hidden sm:inline">Select Type</span>
          </div>
          <div className={`h-px w-12 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted'}`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Business Info</span>
          </div>
        </div>

        {/* Step 1: Vendor Type Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-2xl">Choose Your Vendor Type</CardTitle>
                <CardDescription className="mt-1">Select the category that best describes your business</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vendorTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Card 
                        key={type.id}
                        className="border-2 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                        onClick={() => handleVendorTypeSelect(type.id)}
                      >
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{type.name}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                          <Button 
                            variant="ghost" 
                            className="mt-4 w-full group-hover:bg-primary group-hover:text-white transition-all"
                          >
                            Select <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Business Information Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Business Information</CardTitle>
                    <CardDescription className="mt-1">Tell us about your business</CardDescription>
                  </div>
                  <Badge variant="outline" className="px-3 py-1.5">
                    {vendorTypes.find(t => t.id === vendorType)?.name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Vendor Type Selector */}
                <div className="space-y-2">
                  <Label htmlFor="vendorType" className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" />
                    Vendor Type *
                  </Label>
                  <Select value={vendorType} onValueChange={setVendorType}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select vendor type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendorTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{type.name}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">You can change this later from your dashboard</p>
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" />
                    Business Name *
                  </Label>
                  <Input
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter your business name"
                    className="h-11"
                  />
                </div>

                {/* Owner Name */}
                <div className="space-y-2">
                  <Label htmlFor="ownerName" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Owner / Contact Name *
                  </Label>
                  <Input
                    id="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="Enter your name"
                    className="h-11"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Business Location *
                  </Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State / Region"
                    className="h-11"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Business Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your business, services, and what makes you unique..."
                    className="min-h-24"
                  />
                </div>

                {/* Type-specific fields */}
                {vendorType === 'hotel' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">
                        Maximum Capacity
                      </Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        placeholder="e.g. 300"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priceRange">
                        Price Range (per event)
                      </Label>
                      <Input
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={(e) => handleInputChange('priceRange', e.target.value)}
                        placeholder="e.g. $5,000 - $15,000"
                        className="h-11"
                      />
                    </div>
                  </div>
                )}

                {vendorType === 'crafts' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceRange">
                        Product Price Range
                      </Label>
                      <Input
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={(e) => handleInputChange('priceRange', e.target.value)}
                        placeholder="e.g. $10 - $200"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">
                        Product Categories
                      </Label>
                      <Input
                        id="capacity"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        placeholder="e.g. Home Decor, Gifts, Jewelry"
                        className="h-11"
                      />
                    </div>
                  </div>
                )}

                {vendorType === 'services' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceRange">
                        Service Price Range
                      </Label>
                      <Input
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={(e) => handleInputChange('priceRange', e.target.value)}
                        placeholder="e.g. $500 - $5,000"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">
                        Service Area
                      </Label>
                      <Input
                        id="capacity"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        placeholder="e.g. 50 mile radius"
                        className="h-11"
                      />
                    </div>
                  </div>
                )}

                {/* Amenities / Features */}
                <div className="space-y-2">
                  <Label htmlFor="amenities">
                    {vendorType === 'hotel' ? 'Amenities & Features' : 
                     vendorType === 'crafts' ? 'Specialties & Materials' : 
                     'Services Offered'}
                  </Label>
                  <Input
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) => handleInputChange('amenities', e.target.value)}
                    placeholder={
                      vendorType === 'hotel' ? 'Separate with commas: WiFi, Parking, Restaurant, Pool...' :
                      vendorType === 'crafts' ? 'Separate with commas: Handmade, Eco-friendly, Custom Orders...' :
                      'Separate with commas: Photography, Catering, Entertainment...'
                    }
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple items with commas</p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-500/5 border border-blue-200/50 p-4 rounded-lg">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                        What happens next?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        After submitting, you'll get instant access to your vendor dashboard where you can manage bookings, update your profile, and start accepting orders.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 shadow-lg shadow-primary/20"
                  >
                    Create Vendor Account
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}
