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
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Sparkles,
  Clock,
  MapPin
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

interface ServiceBooking {
  id: string;
  serviceType: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  depositPaid: boolean;
  notes?: string;
}

interface ServicesVendorDashboardProps {
  vendor: VendorUser;
}

export function ServicesVendorDashboard({ vendor }: ServicesVendorDashboardProps) {
  const [bookings, setBookings] = useState<ServiceBooking[]>([
    {
      id: 's1',
      serviceType: 'Wedding Photography',
      eventName: 'Johnson Wedding',
      customerName: 'Rachel Johnson',
      customerEmail: 'rachel@example.com',
      date: '2024-12-20',
      time: '2:00 PM - 10:00 PM',
      location: 'Grand Hotel, Manhattan',
      status: 'confirmed',
      totalAmount: 3500,
      depositPaid: true,
      notes: 'Include drone shots and photo booth'
    },
    {
      id: 's2',
      serviceType: 'Catering Service',
      eventName: 'Corporate Gala',
      customerName: 'Tech Solutions Inc',
      customerEmail: 'events@techsolutions.com',
      date: '2024-11-30',
      time: '6:00 PM - 11:00 PM',
      location: 'Convention Center, Boston',
      status: 'pending',
      totalAmount: 8500,
      depositPaid: false,
      notes: 'Vegetarian and vegan options required for 50 guests'
    },
    {
      id: 's3',
      serviceType: 'Event Entertainment',
      eventName: 'Birthday Party',
      customerName: 'Tom Davis',
      customerEmail: 'tom@example.com',
      date: '2024-12-10',
      time: '7:00 PM - 11:00 PM',
      location: 'Private Residence, Brooklyn',
      status: 'confirmed',
      totalAmount: 1800,
      depositPaid: true
    }
  ]);

  const [services, setServices] = useState({
    businessName: vendor.name,
    description: "Professional event services with 10+ years of experience creating memorable moments",
    serviceTypes: ["Photography", "Catering", "Entertainment", "Decoration", "Planning"],
    availability: "Weekdays & Weekends",
    phone: "+1 (555) 987-6543",
    email: vendor.email,
    serviceArea: "New York, New Jersey, Connecticut"
  });

  const getStatusColor = (status: ServiceBooking['status']) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: ServiceBooking['status']) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleBookingStatusChange = (bookingId: string, newStatus: ServiceBooking['status']) => {
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
  const upcomingServices = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header Section */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="px-3 py-1 bg-pink-500/10 text-pink-700 border-pink-200">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Event Services
                </Badge>
              </div>
              <h1 className="text-4xl tracking-tight mb-2">Services Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {vendor.name}</p>
            </div>
            <Button className="shadow-lg shadow-primary/20">
              <Calendar className="h-4 w-4 mr-2" />
              Update Availability
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
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
                  +25%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-semibold tracking-tight">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">vs last month</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Pending Requests Card */}
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
                <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                <p className="text-3xl font-semibold tracking-tight">{pendingBookings}</p>
                <p className="text-xs text-muted-foreground mt-2">Awaiting response</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Services Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                  Scheduled
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming Services</p>
                <p className="text-3xl font-semibold tracking-tight">{upcomingServices}</p>
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
                <p className="text-sm text-muted-foreground mb-1">Service Rating</p>
                <p className="text-3xl font-semibold tracking-tight">5.0</p>
                <p className="text-xs text-muted-foreground mt-2">From 89 reviews</p>
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
            <TabsTrigger value="schedule" className="data-[state=active]:bg-card">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-card">
              My Services
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
                    <CardTitle className="text-2xl">Service Bookings</CardTitle>
                    <CardDescription className="mt-1">Manage your service bookings and client requests</CardDescription>
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
                              <h3 className="text-lg font-semibold">{booking.eventName}</h3>
                              <Badge variant={getStatusColor(booking.status)} className="flex items-center gap-1">
                                {getStatusIcon(booking.status)}
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Service: {booking.serviceType}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Client: {booking.customerName}
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
                              <p className="text-xs text-muted-foreground">Service Date</p>
                              <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Time</p>
                              <p className="font-medium text-sm">{booking.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Location</p>
                              <p className="font-medium text-sm truncate">{booking.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        {booking.notes && (
                          <div className="bg-blue-500/5 border border-blue-200/50 p-4 rounded-lg mb-4">
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Client Notes:</p>
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
                                Accept Booking
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
                            Contact Client
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
          
          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-2xl">Service Schedule</CardTitle>
                <CardDescription className="mt-1">View your upcoming service commitments</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {bookings
                    .filter(b => b.status === 'confirmed')
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-5 border-2 border-border rounded-xl hover:shadow-md transition-shadow bg-card">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                          <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{booking.eventName}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            {booking.serviceType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {booking.time}
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
          
          {/* Services Tab */}
          <TabsContent value="services">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Service Information</CardTitle>
                  <CardDescription>Update your service details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={services.businessName}
                      onChange={(e) => setServices({
                        ...services,
                        businessName: e.target.value
                      })}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={services.description}
                      onChange={(e) => setServices({
                        ...services,
                        description: e.target.value
                      })}
                      className="min-h-24"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceArea">Service Area</Label>
                    <Input
                      id="serviceArea"
                      value={services.serviceArea}
                      onChange={(e) => setServices({
                        ...services,
                        serviceArea: e.target.value
                      })}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      value={services.availability}
                      onChange={(e) => setServices({
                        ...services,
                        availability: e.target.value
                      })}
                      className="h-11"
                    />
                  </div>
                  
                  <Button className="w-full shadow-lg shadow-primary/20">Save Changes</Button>
                </CardContent>
              </Card>
              
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Service Types & Contact</CardTitle>
                  <CardDescription>Manage your offerings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                  <div className="space-y-3">
                    <Label>Services Offered</Label>
                    <div className="flex flex-wrap gap-2">
                      {services.serviceTypes.map((service, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1.5">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Add Service Type
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={services.phone}
                      onChange={(e) => setServices({
                        ...services,
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
                      value={services.email}
                      onChange={(e) => setServices({
                        ...services,
                        email: e.target.value
                      })}
                      className="h-11"
                    />
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
                        <p className="text-2xl font-semibold">${(totalRevenue * 0.7).toLocaleString()}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +28%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Last Month</p>
                        <p className="text-2xl font-semibold">${(totalRevenue * 0.3).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Average per Service</p>
                        <p className="text-2xl font-semibold">${Math.round(totalRevenue / upcomingServices).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Client Reviews</CardTitle>
                  <CardDescription>Recent feedback from clients</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm mb-2">&ldquo;Absolutely stunning photography! Captured every moment perfectly.&rdquo;</p>
                      <p className="text-xs text-muted-foreground">Rachel Johnson • 1 week ago</p>
                    </div>
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm mb-2">&ldquo;Professional service and incredible entertainment!&rdquo;</p>
                      <p className="text-xs text-muted-foreground">Tom Davis • 2 weeks ago</p>
                    </div>
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm mb-2">&ldquo;Delicious food and excellent catering service!&rdquo;</p>
                      <p className="text-xs text-muted-foreground">Tech Solutions Inc • 3 weeks ago</p>
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
