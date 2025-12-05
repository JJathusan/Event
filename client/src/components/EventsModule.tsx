import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Clock, MapPin, Users, FileText, DollarSign, Search, Filter, Star } from "lucide-react";
import { cn } from "./ui/utils";

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
import { HotelVendorCard } from "./HotelVendorCard";
import { CustomerEventManagement } from "./CustomerEventManagement";
import { VendorEventManagement } from "./VendorEventManagement";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor';
}

interface EventsModuleProps {
  user: User | null;
}

interface HotelVendor {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
  availability: boolean;
}

export function EventsModule({ user }: EventsModuleProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<HotelVendor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    venue: "",
    guests: "",
    budget: "",
    requirements: ""
  });

  const mockHotelVendors: HotelVendor[] = [
    {
      id: "h1",
      name: "Grand Plaza Hotel",
      description: "Luxury hotel with stunning ballrooms and exceptional service for weddings and corporate events",
      location: "Downtown Manhattan, NY",
      rating: 4.8,
      reviews: 342,
      pricePerNight: 450,
      capacity: 300,
      amenities: ["WiFi", "Parking", "Restaurant", "Conference Room", "Spa", "Pool"],
      images: ["https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzU5NzUzOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      availability: true
    },
    {
      id: "h2",
      name: "Riverside Resort",
      description: "Beautiful riverside location perfect for outdoor ceremonies and receptions",
      location: "Hudson Valley, NY",
      rating: 4.6,
      reviews: 198,
      pricePerNight: 350,
      capacity: 200,
      amenities: ["WiFi", "Parking", "Restaurant", "Garden", "Boat Dock"],
      images: ["https://images.unsplash.com/photo-1759477274012-263d469f0e16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHZlbnVlJTIwaGFsbHxlbnwxfHx8fDE3NTk4MjcxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      availability: true
    },
    {
      id: "h3",
      name: "Metropolitan Business Hotel",
      description: "Modern business hotel with state-of-the-art conference facilities",
      location: "Midtown Manhattan, NY",
      rating: 4.4,
      reviews: 156,
      pricePerNight: 280,
      capacity: 150,
      amenities: ["WiFi", "Conference Room", "Business Center", "Restaurant"],
      images: ["https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzU5NzUzOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      availability: false
    }
  ];

  const filteredHotels = mockHotelVendors.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || hotel.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const handleSelectHotel = (hotel: HotelVendor) => {
    setSelectedHotel(hotel);
    setEventData({...eventData, venue: hotel.name});
    setCurrentStep(2);
  };

  const handleViewHotelDetails = (hotel: HotelVendor) => {
    // In a real app, this would open a detailed view modal
    alert(`Viewing details for ${hotel.name}`);
  };

  const renderEventCreationWizard = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Select Hotel Vendor</h3>
            
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-9 w-48"
                />
              </div>
            </div>

            {/* Hotel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelVendorCard
                  key={hotel.id}
                  vendor={hotel}
                  onSelect={handleSelectHotel}
                  onViewDetails={handleViewHotelDetails}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Event Details</h3>
            {selectedHotel && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg bg-cover bg-center" 
                         style={{ backgroundImage: `url(${selectedHotel.images[0]})` }} />
                    <div>
                      <h4 className="font-medium">{selectedHotel.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedHotel.location}</p>
                      <Badge variant="outline">${selectedHotel.pricePerNight}/night</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={eventData.title}
                  onChange={(e) => setEventData({...eventData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  placeholder="Expected guests"
                  value={eventData.guests}
                  onChange={(e) => setEventData({...eventData, guests: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event"
                value={eventData.description}
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? formatDate(selectedDate) : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Input
                  id="budget"
                  placeholder="e.g., $5000-10000"
                  value={eventData.budget}
                  onChange={(e) => setEventData({...eventData, budget: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review & Contract</h3>
            <Card>
              <CardHeader>
                <CardTitle>Event Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Event:</span>
                    <span className="font-medium">{eventData.title || "Untitled Event"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hotel:</span>
                    <span className="font-medium">{selectedHotel?.name || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {selectedDate ? formatDate(selectedDate) : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-medium">{eventData.guests || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span className="font-medium">{eventData.budget || "Not specified"}</span>
                  </div>
                  {selectedHotel && (
                    <div className="flex justify-between">
                      <span>Hotel Rate:</span>
                      <span className="font-medium">${selectedHotel.pricePerNight}/night</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="p-4 border rounded-lg bg-muted">
              <h4 className="font-medium mb-2">Contract Terms</h4>
              <p className="text-sm text-muted-foreground">
                By proceeding, you agree to the terms and conditions of service. 
                A deposit of 25% will be required to confirm your booking with {selectedHotel?.name}.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-8">
          <CardContent>
            <h2>Please Login</h2>
            <p className="text-muted-foreground">You need to login to access the Events module</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Event Planning</Badge>
          <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Event Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Book premium venues and create unforgettable experiences
          </p>
        </div>

        <Tabs defaultValue={user.role === 'customer' ? 'create' : 'manage'} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50 p-1">
            <TabsTrigger value="create" className="text-base">Create Event</TabsTrigger>
            <TabsTrigger value="manage" className="text-base">
              {user.role === 'customer' ? 'My Events' : 'Manage Events'}
            </TabsTrigger>
          </TabsList>
        
        <TabsContent value="create" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Creation Wizard */}
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    Create New Event
                  </CardTitle>
                  <CardDescription className="text-base">
                    Select a hotel vendor and plan your perfect event
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-8">
                    {[
                      { num: 1, label: "Select Venue" },
                      { num: 2, label: "Event Details" },
                      { num: 3, label: "Review & Confirm" }
                    ].map((step, index) => (
                      <div key={step.num} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                              currentStep >= step.num
                                ? "bg-primary text-primary-foreground shadow-lg scale-110"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {step.num}
                          </div>
                          <span className={cn(
                            "text-xs mt-2 font-medium",
                            currentStep >= step.num ? "text-primary" : "text-muted-foreground"
                          )}>
                            {step.label}
                          </span>
                        </div>
                        {index < 2 && (
                          <div className="flex-1 mx-2">
                            <div
                              className={cn(
                                "h-1 rounded-full transition-all",
                                currentStep > step.num ? "bg-primary" : "bg-muted"
                              )}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {renderEventCreationWizard()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentStep === 3) {
                          alert("Event booking confirmed! You will receive a confirmation email shortly.");
                          setCurrentStep(1);
                          setSelectedHotel(null);
                          setEventData({
                            title: "",
                            description: "",
                            venue: "",
                            guests: "",
                            budget: "",
                            requirements: ""
                          });
                          setSelectedDate(undefined);
                        } else {
                          setCurrentStep(Math.min(3, currentStep + 1));
                        }
                      }}
                      disabled={currentStep === 1 && !selectedHotel}
                    >
                      {currentStep === 3 ? "Confirm Booking" : "Next"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary transition-all">
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Quotes
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary transition-all">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Contracts
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary transition-all">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Premium Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Get help from our event planning experts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="manage" className="mt-6">
          {user.role === 'customer' ? (
            <CustomerEventManagement customerId={user.id} />
          ) : (
            <VendorEventManagement vendorId={user.id} />
          )}
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}