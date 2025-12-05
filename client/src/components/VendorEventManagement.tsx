import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  Eye,
  Send,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

interface VendorEventManagementProps {
  vendorId: string;
}

interface BookingRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  eventTitle: string;
  eventDate: Date;
  guests: number;
  budget: string;
  requirements: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submittedDate: Date;
}

interface Quote {
  id: string;
  bookingId: string;
  amount: number;
  services: string[];
  validUntil: Date;
  status: 'sent' | 'accepted' | 'rejected';
}

export function VendorEventManagement({ vendorId }: VendorEventManagementProps) {
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteServices, setQuoteServices] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");

  // Mock booking requests data
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: 'b1',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      eventTitle: 'Corporate Annual Gala',
      eventDate: new Date(2025, 11, 15),
      guests: 200,
      budget: '$25,000 - $30,000',
      requirements: 'Need full catering, AV equipment, and decorations for corporate event. Premium setup required.',
      status: 'pending',
      submittedDate: new Date(2025, 9, 25)
    },
    {
      id: 'b2',
      customerName: 'Michael Chen',
      customerEmail: 'michael@example.com',
      eventTitle: 'Wedding Reception',
      eventDate: new Date(2025, 10, 20),
      guests: 150,
      budget: '$15,000 - $20,000',
      requirements: 'Wedding reception with dinner, dance floor, and outdoor ceremony space.',
      status: 'approved',
      submittedDate: new Date(2025, 9, 20)
    },
    {
      id: 'b3',
      customerName: 'Emily Rodriguez',
      customerEmail: 'emily@example.com',
      eventTitle: 'Product Launch Event',
      eventDate: new Date(2025, 10, 5),
      guests: 100,
      budget: '$10,000 - $12,000',
      requirements: 'Modern setup for tech product launch. Need projection equipment and cocktail reception.',
      status: 'approved',
      submittedDate: new Date(2025, 9, 18)
    },
    {
      id: 'b4',
      customerName: 'David Thompson',
      customerEmail: 'david@example.com',
      eventTitle: 'Anniversary Celebration',
      eventDate: new Date(2025, 9, 30),
      guests: 75,
      budget: '$8,000 - $10,000',
      requirements: 'Intimate anniversary party with dinner and entertainment.',
      status: 'completed',
      submittedDate: new Date(2025, 8, 15)
    },
  ]);

  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 'q1',
      bookingId: 'b2',
      amount: 18500,
      services: ['Venue Rental', 'Full Catering', 'Decoration Package', 'AV Equipment'],
      validUntil: new Date(2025, 10, 1),
      status: 'accepted'
    },
    {
      id: 'q2',
      bookingId: 'b3',
      amount: 11200,
      services: ['Venue Rental', 'Cocktail Catering', 'Tech Setup', 'Staff Support'],
      validUntil: new Date(2025, 9, 25),
      status: 'accepted'
    }
  ]);

  const handleApproveBooking = (bookingId: string) => {
    setBookingRequests(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: 'approved' } : b)
    );
  };

  const handleRejectBooking = (bookingId: string) => {
    setBookingRequests(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: 'rejected' } : b)
    );
  };

  const handleSendQuote = () => {
    if (selectedBooking && quoteAmount) {
      const newQuote: Quote = {
        id: `q${quotes.length + 1}`,
        bookingId: selectedBooking.id,
        amount: parseFloat(quoteAmount),
        services: quoteServices.split(',').map(s => s.trim()),
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        status: 'sent'
      };
      setQuotes([...quotes, newQuote]);
      setIsQuoteDialogOpen(false);
      setQuoteAmount("");
      setQuoteServices("");
      setQuoteNotes("");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500/10 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Calculate stats
  const pendingCount = bookingRequests.filter(b => b.status === 'pending').length;
  const approvedCount = bookingRequests.filter(b => b.status === 'approved').length;
  const totalRevenue = quotes.filter(q => q.status === 'accepted').reduce((sum, q) => sum + q.amount, 0);
  const upcomingEvents = bookingRequests.filter(b => 
    b.status === 'approved' && b.eventDate > new Date()
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                <p className="text-3xl font-semibold">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved Events</p>
                <p className="text-3xl font-semibold">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming Events</p>
                <p className="text-3xl font-semibold">{upcomingEvents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-semibold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1">
          <TabsTrigger value="requests">Booking Requests</TabsTrigger>
          <TabsTrigger value="calendar">Event Calendar</TabsTrigger>
          <TabsTrigger value="quotes">Quotes & Revenue</TabsTrigger>
        </TabsList>

        {/* Booking Requests Tab */}
        <TabsContent value="requests" className="mt-6">
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-2xl">Event Booking Requests</CardTitle>
              <CardDescription>Review and respond to customer event inquiries</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingRequests.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.eventTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted {format(booking.submittedDate, 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {format(booking.eventDate, 'MMM dd, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {booking.guests}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{booking.budget}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setIsQuoteDialogOpen(true);
                                }}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Quote
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveBooking(booking.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectBooking(booking.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Booking Details Card */}
          {selectedBooking && !isQuoteDialogOpen && (
            <Card className="border-2 shadow-lg mt-6">
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedBooking.eventTitle}</CardTitle>
                    <CardDescription className="mt-2">Booking Details</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-muted-foreground">Customer Name</Label>
                    <p className="text-lg font-medium mt-1">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="text-lg font-medium mt-1">{selectedBooking.customerEmail}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Event Date</Label>
                    <p className="text-lg font-medium mt-1">{format(selectedBooking.eventDate, 'MMMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Number of Guests</Label>
                    <p className="text-lg font-medium mt-1">{selectedBooking.guests} guests</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Budget Range</Label>
                    <p className="text-lg font-medium mt-1">{selectedBooking.budget}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Requirements</Label>
                    <p className="mt-2 p-4 bg-muted/30 rounded-lg">{selectedBooking.requirements}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Event Calendar Tab */}
        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="text-2xl">Upcoming Events</CardTitle>
                  <CardDescription>Your confirmed event schedule</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {bookingRequests
                      .filter(b => b.status === 'approved' && b.eventDate > new Date())
                      .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())
                      .map((event) => (
                        <Card key={event.id} className="border-2 hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2">{event.eventTitle}</h4>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {format(event.eventDate, 'EEEE, MMMM dd, yyyy')}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {event.guests} guests
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {event.customerName}
                                  </div>
                                </div>
                              </div>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                Confirmed
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    {bookingRequests.filter(b => b.status === 'approved' && b.eventDate > new Date()).length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No upcoming events scheduled</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
                  <CardTitle>Calendar Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">This Month</p>
                      <p className="text-2xl font-semibold">
                        {bookingRequests.filter(b => {
                          const now = new Date();
                          return b.status === 'approved' && 
                                 b.eventDate.getMonth() === now.getMonth() &&
                                 b.eventDate.getFullYear() === now.getFullYear();
                        }).length}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Events scheduled</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Next 30 Days</p>
                      <p className="text-2xl font-semibold">
                        {bookingRequests.filter(b => {
                          const now = new Date();
                          const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                          return b.status === 'approved' && 
                                 b.eventDate >= now &&
                                 b.eventDate <= thirtyDays;
                        }).length}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Events scheduled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Quotes & Revenue Tab */}
        <TabsContent value="quotes" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="text-2xl">Sent Quotes</CardTitle>
                  <CardDescription>Track your quotes and proposals</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>Valid Until</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotes.map((quote) => {
                        const booking = bookingRequests.find(b => b.id === quote.bookingId);
                        return (
                          <TableRow key={quote.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{booking?.eventTitle}</p>
                                <p className="text-xs text-muted-foreground">{booking?.customerName}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">${quote.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {quote.services.slice(0, 2).join(', ')}
                                {quote.services.length > 2 && ` +${quote.services.length - 2} more`}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {format(quote.validUntil, 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell>
                              {quote.status === 'accepted' && (
                                <Badge className="bg-green-500/10 text-green-700 border-green-200">Accepted</Badge>
                              )}
                              {quote.status === 'sent' && (
                                <Badge variant="secondary">Sent</Badge>
                              )}
                              {quote.status === 'rejected' && (
                                <Badge variant="destructive">Rejected</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-br from-green-500/10 to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Revenue Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                      <p className="text-3xl font-semibold">${totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Accepted Quotes</p>
                      <p className="text-2xl font-semibold">
                        {quotes.filter(q => q.status === 'accepted').length}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Average Deal</p>
                      <p className="text-2xl font-semibold">
                        ${Math.round(totalRevenue / Math.max(quotes.filter(q => q.status === 'accepted').length, 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Send Quote</DialogTitle>
            <DialogDescription>
              Create and send a quote for {selectedBooking?.eventTitle}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quote-amount">Quote Amount ($)</Label>
              <Input
                id="quote-amount"
                type="number"
                placeholder="Enter amount"
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-services">Services Included (comma-separated)</Label>
              <Input
                id="quote-services"
                placeholder="e.g., Venue, Catering, Decorations"
                value={quoteServices}
                onChange={(e) => setQuoteServices(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-notes">Additional Notes</Label>
              <Textarea
                id="quote-notes"
                placeholder="Any additional information..."
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsQuoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendQuote}>
              <Send className="h-4 w-4 mr-2" />
              Send Quote
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
