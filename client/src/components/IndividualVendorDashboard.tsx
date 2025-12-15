import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Package
} from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface VendorUser {
  id: string;
  name: string;
  email: string;
  role: 'vendor';
  vendorType: string;
}

interface EventBooking {
  id: string;
  eventTitle: string;
  customerName: string;
  customerEmail: string;
  date: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  depositPaid: boolean;
  notes?: string;
}

interface IndividualVendorDashboardProps {
  vendor: VendorUser;
}

export function IndividualVendorDashboard({ vendor }: IndividualVendorDashboardProps) {
  const getVendorTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel': return 'Hotel & Venue';
      case 'crafts': return 'Crafts & Gifts';
      case 'services': return 'Event Services';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const [bookings, setBookings] = useState<EventBooking[]>([
    {
      id: 'b1',
      eventTitle: 'Smith Wedding Reception',
      customerName: 'Sarah Smith',
      customerEmail: 'sarah@example.com',
      date: '2024-12-15',
      guests: 150,
      status: 'confirmed',
      totalAmount: 12500,
      depositPaid: true,
      notes: 'Vegetarian options required for 20 guests'
    },
    {
      id: 'b2',
      eventTitle: 'Corporate Annual Meeting',
      customerName: 'Tech Corp',
      customerEmail: 'events@techcorp.com',
      date: '2024-11-28',
      guests: 80,
      status: 'pending',
      totalAmount: 6800,
      depositPaid: false
    },
    {
      id: 'b3',
      eventTitle: 'Birthday Celebration',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      date: '2024-12-22',
      guests: 50,
      status: 'confirmed',
      totalAmount: 3200,
      depositPaid: true
    }
  ]);

  const [vendorProfile, setVendorProfile] = useState({
    businessName: vendor.name,
    description: "Premium hotel with exceptional service and stunning venues for all types of events",
    location: "Downtown Manhattan, NY",
    phone: "+1 (555) 123-4567",
    email: vendor.email,
    capacity: 300,
    pricePerNight: 450,
    amenities: ["WiFi", "Parking", "Restaurant", "Conference Room", "Spa", "Pool"]
  });

  const getStatusColor = (status: EventBooking['status']) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: EventBooking['status']) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleBookingStatusChange = (bookingId: string, newStatus: EventBooking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header Section */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="px-3 py-1">
                  {getVendorTypeLabel(vendor.vendorType)}
                </Badge>
              </div>
              <h1 className="text-4xl tracking-tight mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {vendor.name}</p>
            </div>
            <Button className="shadow-lg shadow-primary/20">
              <Package className="h-4 w-4 mr-2" />
              Create New Listing
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview - Modern SaaS Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-green-500/10 text-green-700 border-green-200">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-semibold tracking-tight">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">vs last month</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Pending Bookings Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                  Action
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Bookings</p>
                <p className="text-3xl font-semibold tracking-tight">{pendingBookings}</p>
                <p className="text-xs text-muted-foreground mt-2">Awaiting confirmation</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Confirmed Events Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                  Upcoming
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Confirmed Events</p>
                <p className="text-3xl font-semibold tracking-tight">{confirmedBookings}</p>
                <p className="text-xs text-muted-foreground mt-2">Next 30 days</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Rating Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Rating</p>
                <p className="text-3xl font-semibold tracking-tight">4.8</p>
                <p className="text-xs text-muted-foreground mt-2">From 247 reviews</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 p-1 mb-8">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-card">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-card">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-card">
              Profile
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-card">
              Analytics
            </TabsTrigger>
          </TabsList>
        
          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Event Bookings</CardTitle>
                    <CardDescription className="mt-1">Manage your event bookings and customer requests</CardDescription>
                  </div>
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="border-2 border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{booking.eventTitle}</h3>
                            <Badge variant={getStatusColor(booking.status)} className="flex items-center gap-1">
                              {getStatusIcon(booking.status)}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Customer: {booking.customerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-semibold text-primary">${booking.totalAmount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {booking.depositPaid ? 
                              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                                Deposit Paid
                              </Badge> : 
                              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                Payment Pending
                              </Badge>
                            }
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Event Date</p>
                            <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Guests</p>
                            <p className="font-medium">{booking.guests} people</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Contact</p>
                            <p className="font-medium text-sm truncate">{booking.customerEmail}</p>
                          </div>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="bg-blue-500/5 border border-blue-200/50 p-4 rounded-lg mb-4">
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Customer Notes:</p>
                          <p className="text-sm text-muted-foreground">{booking.notes}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleBookingStatusChange(booking.id, 'confirmed')}
                              className="shadow-lg shadow-primary/20"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm Booking
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleBookingStatusChange(booking.id, 'cancelled')}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-2xl">Event Calendar</CardTitle>
                <CardDescription className="mt-1">View your upcoming events and availability</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
              <div className="space-y-3">
                {bookings
                  .filter(b => b.status === 'confirmed')
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 p-5 border-2 border-border rounded-xl hover:shadow-md transition-shadow bg-card">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Calendar className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{booking.eventTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {booking.guests} guests
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-primary">${booking.totalAmount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{booking.customerName}</div>
                      </div>
                    </div>
                  ))}
              </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Business Profile</CardTitle>
                  <CardDescription>Update your business information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={vendorProfile.businessName}
                    onChange={(e) => setVendorProfile({
                      ...vendorProfile,
                      businessName: e.target.value
                    })}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={vendorProfile.description}
                    onChange={(e) => setVendorProfile({
                      ...vendorProfile,
                      description: e.target.value
                    })}
                    className="min-h-24"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={vendorProfile.location}
                    onChange={(e) => setVendorProfile({
                      ...vendorProfile,
                      location: e.target.value
                    })}
                    className="h-11"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={vendorProfile.capacity}
                      onChange={(e) => setVendorProfile({
                        ...vendorProfile,
                        capacity: parseInt(e.target.value) || 0
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerNight">Price per Night</Label>
                    <Input
                      id="pricePerNight"
                      type="number"
                      value={vendorProfile.pricePerNight}
                      onChange={(e) => setVendorProfile({
                        ...vendorProfile,
                        pricePerNight: parseInt(e.target.value) || 0
                      })}
                      className="h-11"
                    />
                  </div>
                </div>
                
                <Button className="w-full shadow-lg shadow-primary/20">Save Changes</Button>
                </CardContent>
              </Card>
              
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Manage your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={vendorProfile.phone}
                    onChange={(e) => setVendorProfile({
                      ...vendorProfile,
                      phone: e.target.value
                    })}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={vendorProfile.email}
                    onChange={(e) => setVendorProfile({
                      ...vendorProfile,
                      email: e.target.value
                    })}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Amenities</Label>
                  <div className="flex flex-wrap gap-2">
                    {vendorProfile.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1.5">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Amenities
                  </Button>
                </div>
                
                <Button className="w-full shadow-lg shadow-primary/20">Update Contact Info</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Track your earnings and performance</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="space-y-5">
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">This Month</p>
                      <p className="text-2xl font-semibold">${(totalRevenue * 0.6).toLocaleString()}</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-700 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Last Month</p>
                      <p className="text-2xl font-semibold">${(totalRevenue * 0.4).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Average per Event</p>
                      <p className="text-2xl font-semibold">${Math.round(totalRevenue / confirmedBookings).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>Recent feedback from customers</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm mb-2">&ldquo;Excellent service and beautiful venue!&rdquo;</p>
                    <p className="text-xs text-muted-foreground">Sarah Smith • 2 days ago</p>
                  </div>
                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <p className="text-sm mb-2">&ldquo;Professional staff and great facilities.&rdquo;</p>
                    <p className="text-xs text-muted-foreground">Tech Corp • 1 week ago</p>
                  </div>
                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm mb-2">&ldquo;Amazing venue for our corporate event!&rdquo;</p>
                    <p className="text-xs text-muted-foreground">Mike Johnson • 2 weeks ago</p>
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}