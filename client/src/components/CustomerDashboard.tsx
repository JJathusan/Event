import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { 
  ShoppingBag, 
  Calendar, 
  Package, 
  Truck, 
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Download,
  MessageSquare,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  CalendarDays
} from "lucide-react";
import { getCustomerOrders, getCustomerBookings, type Order, type EventBooking } from "../lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface CustomerDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  onNavigate: (view: string) => void;
}

export function CustomerDashboard({ user, onNavigate }: CustomerDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadOrders();
    loadBookings();
  }, [user.id]);

  const loadOrders = () => {
    const customerOrders = getCustomerOrders(user.id);
    setOrders(customerOrders);
  };

  const loadBookings = () => {
    const customerBookings = getCustomerBookings(user.id);
    setBookings(customerBookings);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'confirmed':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-500/10 text-red-700 border-red-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'processing':
        return <Truck className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const upcomingEvents = bookings.filter(b => {
    const eventDate = new Date(b.eventDate);
    const today = new Date();
    return eventDate > today && (b.status === 'pending' || b.status === 'confirmed');
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate("home")}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Manage your orders, bookings, and account</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="h-4 w-4" />
              Bookings ({bookings.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">${totalSpent.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across {orders.length} order{orders.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{pendingOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pending or in transit
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{upcomingEvents}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Confirmed bookings
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Your latest marketplace purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No orders yet</p>
                      <Button 
                        variant="link" 
                        onClick={() => onNavigate("crafts")}
                        className="mt-2"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              Order #{order.id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(order.status) + ' text-xs'}>
                              {order.status}
                            </Badge>
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                      {orders.length > 3 && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setActiveTab("orders")}
                        >
                          View All Orders
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Bookings */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>Your scheduled event bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No bookings yet</p>
                      <Button 
                        variant="link" 
                        onClick={() => onNavigate("events")}
                        className="mt-2"
                      >
                        Book an Event
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {booking.eventTitle}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(booking.eventDate)} • {booking.vendorName}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status) + ' text-xs'}>
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                      {bookings.length > 3 && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setActiveTab("bookings")}
                        >
                          View All Bookings
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping in our marketplace to see your orders here
                  </p>
                  <Button onClick={() => onNavigate("crafts")}>
                    Browse Products
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border-2 hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id.slice(-8).toUpperCase()}</CardTitle>
                          <CardDescription className="mt-1">
                            Placed on {formatDate(order.createdAt)}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1.5">
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Order Items Preview */}
                        <div className="space-y-2">
                          {order.items.slice(0, 2).map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <div 
                                className="w-16 h-16 rounded-md bg-cover bg-center flex-shrink-0"
                                style={{ backgroundImage: `url(${item.image})` }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-muted-foreground pl-3">
                              +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>

                        <Separator />

                        {/* Order Summary */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Support
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Book an event to see your bookings here
                  </p>
                  <Button onClick={() => onNavigate("events")}>
                    Browse Events
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="border-2 hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{booking.eventTitle}</CardTitle>
                          <CardDescription className="mt-1">
                            Booking #{booking.id.slice(-8).toUpperCase()}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          <span className="flex items-center gap-1.5">
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Event Date</p>
                                <p className="font-medium">{formatDate(booking.eventDate)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Venue</p>
                                <p className="font-medium">{booking.vendorName}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Number of Guests</p>
                              <p className="font-medium">{booking.guests} guests</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium">{booking.budget}</p>
                            </div>
                          </div>
                        </div>

                        {booking.eventDescription && (
                          <>
                            <Separator />
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Description</p>
                              <p className="text-sm">{booking.eventDescription}</p>
                            </div>
                          </>
                        )}

                        <Separator />

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Contract
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Venue
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Order Details Dialog */}
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order #{selectedOrder?.id.slice(-8).toUpperCase()}
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                {/* Order Status */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Status</p>
                    <p className="text-lg font-semibold capitalize">{selectedOrder.status}</p>
                  </div>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {getStatusIcon(selectedOrder.status)}
                  </Badge>
                </div>

                {/* Order Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-medium">#{selectedOrder.id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold mb-4">Items Ordered</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                        <div 
                          className="w-20 h-20 rounded-md bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Vendor: {item.vendor}</p>
                          <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
