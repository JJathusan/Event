import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus, 
  Eye, 
  Edit3, 
  Calendar,
  FileText,
  CreditCard
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

interface Order {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: Date;
  type: "product" | "service";
}

interface Payout {
  id: string;
  amount: number;
  date: Date;
  status: "pending" | "completed" | "failed";
  orderId: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  sales: number;
  image: string;
}

export function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Alice Johnson",
      product: "Handmade Ceramic Vase",
      amount: 45.99,
      status: "delivered",
      date: new Date(2024, 10, 1),
      type: "product"
    },
    {
      id: "ORD-002",
      customerName: "Bob Smith",
      product: "Wedding Photography",
      amount: 2500.00,
      status: "processing",
      date: new Date(2024, 10, 15),
      type: "service"
    },
    {
      id: "ORD-003",
      customerName: "Carol Davis",
      product: "Sterling Silver Necklace",
      amount: 89.99,
      status: "shipped",
      date: new Date(2024, 10, 20),
      type: "product"
    },
    {
      id: "ORD-004",
      customerName: "David Wilson",
      product: "Event Venue Rental",
      amount: 3500.00,
      status: "pending",
      date: new Date(2024, 10, 25),
      type: "service"
    }
  ]);

  const [payouts] = useState<Payout[]>([
    {
      id: "PAY-001",
      amount: 41.39,
      date: new Date(2024, 10, 5),
      status: "completed",
      orderId: "ORD-001"
    },
    {
      id: "PAY-002",
      amount: 2250.00,
      date: new Date(2024, 10, 20),
      status: "pending",
      orderId: "ORD-002"
    },
    {
      id: "PAY-003",
      amount: 80.99,
      date: new Date(2024, 10, 22),
      status: "completed",
      orderId: "ORD-003"
    }
  ]);

  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Handmade Ceramic Vase",
      price: 45.99,
      stock: 12,
      status: "active",
      sales: 34,
      image: "https://images.unsplash.com/photo-1599833114852-724119b27cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pYyUyMGFydHxlbnwxfHx8fDE3NTk4MjcxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      name: "Sterling Silver Necklace",
      price: 89.99,
      stock: 8,
      status: "active",
      sales: 18,
      image: "https://images.unsplash.com/photo-1652007233137-62275940bfc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5ODE5Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      name: "Wooden Jewelry Box",
      price: 67.50,
      stock: 5,
      status: "active",
      sales: 12,
      image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0c3xlbnwxfHx8fDE3NTk3NTg1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800";
      case "shipped":
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalRevenue = orders
    .filter(order => order.status === "delivered")
    .reduce((sum, order) => sum + order.amount, 0);

  const pendingRevenue = orders
    .filter(order => order.status === "pending" || order.status === "processing")
    .reduce((sum, order) => sum + order.amount, 0);

  const totalOrders = orders.length;
  const activeProducts = products.filter(p => p.status === "active").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-4">Vendor Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your store, orders, and business performance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${pendingRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  From {orders.filter(o => o.status === "pending" || o.status === "processing").length} orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProducts}</div>
                <p className="text-xs text-muted-foreground">
                  {products.length - activeProducts} inactive
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{order.product}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.customerName} • {order.date.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${order.amount}</div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5)
                    .map(product => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.sales} sales
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${product.price}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.stock} in stock
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Order Management</h2>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {orders.map(order => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.date.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{order.product}</div>
                        <div className="text-sm text-muted-foreground">
                          Customer: {order.customerName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">${order.amount}</div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Product Management</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold mb-2">${product.price}</div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>{product.stock} in stock</span>
                    <span>{product.sales} sold</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Payout History</h2>
            <Button className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Request Payout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${payouts.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Paid Out</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${payouts.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Next Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Nov 30, 2024</div>
                <p className="text-sm text-muted-foreground">Automatic weekly payout</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payouts.map(payout => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Payout #{payout.id}</div>
                        <div className="text-sm text-muted-foreground">
                          Order {payout.orderId} • {payout.date.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${payout.amount}</div>
                      <Badge className={getStatusColor(payout.status)}>
                        {payout.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Store Name</label>
                    <Input defaultValue="Potter's Corner" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Business Type</label>
                    <Select defaultValue="crafts">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crafts">Arts & Crafts</SelectItem>
                        <SelectItem value="events">Event Services</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Store Description</label>
                  <Textarea
                    defaultValue="Handcrafted ceramics and pottery made with love and attention to detail."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contact Email</label>
                    <Input defaultValue="potter@example.com" type="email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Street Address</label>
                  <Input defaultValue="123 Craft Street" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">City</label>
                    <Input defaultValue="Artstown" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">State</label>
                    <Input defaultValue="CA" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">ZIP Code</label>
                    <Input defaultValue="90210" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Bank Account</label>
                  <Input defaultValue="****1234" disabled />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tax ID</label>
                  <Input defaultValue="**-*******" disabled />
                </div>
                <Button variant="outline">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Update Payment Info
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default VendorDashboard;
