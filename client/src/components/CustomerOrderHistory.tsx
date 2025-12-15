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
  MessageSquare
} from "lucide-react";
import { getCustomerOrders, getCustomerBookings, type Order, type EventBooking } from "../lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

interface CustomerOrderHistoryProps {
  customerId: string;
}

export function CustomerOrderHistory({ customerId }: CustomerOrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  useEffect(() => {
    loadOrders();
    loadBookings();
  }, [customerId]);

  const loadOrders = () => {
    const customerOrders = getCustomerOrders(customerId);
    setOrders(customerOrders);
  };

  const loadBookings = () => {
    const customerBookings = getCustomerBookings(customerId);
    setBookings(customerBookings);
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">Order History</h2>
        <p className="text-muted-foreground">View and manage your orders and bookings</p>
      </div>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="marketplace" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Marketplace Orders
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2">
            <Calendar className="h-4 w-4" />
            Event Bookings
          </TabsTrigger>
        </TabsList>

        {/* Marketplace Orders */}
        <TabsContent value="marketplace" className="mt-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start shopping in our marketplace to see your orders here
                </p>
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

        {/* Event Bookings */}
        <TabsContent value="events" className="mt-6">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">
                  Book an event to see your bookings here
                </p>
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
  );
}
