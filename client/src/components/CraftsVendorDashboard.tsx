import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  Star, 
  TrendingUp, 
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Store,
  Eye,
  Edit,
  Plus
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

interface ProductOrder {
  id: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  quantity: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

interface CraftsVendorDashboardProps {
  vendor: VendorUser;
}

export function CraftsVendorDashboard({ vendor }: CraftsVendorDashboardProps) {
  const [orders, setOrders] = useState<ProductOrder[]>([
    {
      id: 'o1',
      productName: 'Handmade Ceramic Vase',
      customerName: 'Emily Chen',
      customerEmail: 'emily@example.com',
      orderDate: '2024-11-25',
      quantity: 2,
      status: 'pending',
      totalAmount: 89.98,
      shippingAddress: '123 Main St, Boston, MA'
    },
    {
      id: 'o2',
      productName: 'Artisan Candle Set',
      customerName: 'David Miller',
      customerEmail: 'david@example.com',
      orderDate: '2024-11-24',
      quantity: 1,
      status: 'processing',
      totalAmount: 45.00,
      shippingAddress: '456 Oak Ave, Portland, OR'
    },
    {
      id: 'o3',
      productName: 'Custom Photo Frame',
      customerName: 'Lisa Anderson',
      customerEmail: 'lisa@example.com',
      orderDate: '2024-11-23',
      quantity: 3,
      status: 'shipped',
      totalAmount: 120.00,
      shippingAddress: '789 Pine Rd, Seattle, WA'
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: 'Handmade Ceramic Vase', price: 44.99, stock: 15, category: 'Home Decor', status: 'active' },
    { id: 'p2', name: 'Artisan Candle Set', price: 45.00, stock: 28, category: 'Candles', status: 'active' },
    { id: 'p3', name: 'Custom Photo Frame', price: 40.00, stock: 0, category: 'Gifts', status: 'inactive' },
    { id: 'p4', name: 'Handwoven Basket', price: 65.00, stock: 12, category: 'Home Decor', status: 'active' }
  ]);

  const getStatusColor = (status: ProductOrder['status']) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'pending': return 'secondary';
      case 'processing': return 'outline';
      case 'shipped': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: ProductOrder['status']) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleOrderStatusChange = (orderId: string, newStatus: ProductOrder['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalProducts = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.stock < 5 && p.stock > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header Section */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="px-3 py-1 bg-purple-500/10 text-purple-700 border-purple-200">
                  <Store className="h-3.5 w-3.5 mr-1.5" />
                  Crafts & Gifts
                </Badge>
              </div>
              <h1 className="text-4xl tracking-tight mb-2">Store Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {vendor.name}</p>
            </div>
            <Button className="shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
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
                  +18%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                <p className="text-3xl font-semibold tracking-tight">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">vs last month</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Pending Orders Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                  Action
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                <p className="text-3xl font-semibold tracking-tight">{pendingOrders}</p>
                <p className="text-xs text-muted-foreground mt-2">Need processing</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Active Products Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                  Listed
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Products</p>
                <p className="text-3xl font-semibold tracking-tight">{totalProducts}</p>
                <p className="text-xs text-muted-foreground mt-2">In marketplace</p>
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
                <p className="text-sm text-muted-foreground mb-1">Store Rating</p>
                <p className="text-3xl font-semibold tracking-tight">4.9</p>
                <p className="text-xs text-muted-foreground mt-2">From 156 reviews</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 p-1 mb-8">
            <TabsTrigger value="orders" className="data-[state=active]:bg-card">
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-card">
              Products
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-card">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-card">
              Analytics
            </TabsTrigger>
          </TabsList>
        
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Customer Orders</CardTitle>
                    <CardDescription className="mt-1">Manage your product orders and shipments</CardDescription>
                  </div>
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-2 border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{order.productName}</h3>
                              <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Customer: {order.customerName}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-semibold text-primary">${order.totalAmount.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Qty: {order.quantity}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Order Date</p>
                            <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Shipping Address</p>
                            <p className="font-medium text-sm">{order.shippingAddress}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {order.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleOrderStatusChange(order.id, 'processing')}
                              className="shadow-lg shadow-primary/20"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Start Processing
                            </Button>
                          )}
                          {order.status === 'processing' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleOrderStatusChange(order.id, 'shipped')}
                              className="shadow-lg shadow-primary/20"
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Mark as Shipped
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Customer
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
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Product Catalog</CardTitle>
                    <CardDescription className="mt-1">Manage your product listings</CardDescription>
                  </div>
                  <Button className="shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-5 border-2 border-border rounded-xl hover:shadow-md transition-shadow bg-card">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                          <Package className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            Stock: {product.stock === 0 ? 
                              <span className="text-red-600">Out of Stock</span> : 
                              product.stock < 5 ?
                                <span className="text-yellow-600">{product.stock} left</span> :
                                <span>{product.stock} units</span>
                            }
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-2xl">Inventory Management</CardTitle>
                <CardDescription className="mt-1">Track your stock levels and alerts</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {lowStockProducts > 0 && (
                  <div className="bg-yellow-500/5 border border-yellow-200/50 p-4 rounded-lg mb-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                          Low Stock Alert
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lowStockProducts} product{lowStockProducts > 1 ? 's are' : ' is'} running low on stock
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="p-4 border-2 border-border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">{product.name}</h4>
                        <Badge variant={product.stock === 0 ? 'destructive' : product.stock < 5 ? 'secondary' : 'default'}>
                          {product.stock === 0 ? 'Out of Stock' : product.stock < 5 ? 'Low Stock' : 'In Stock'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Stock Level</span>
                            <span className="font-medium">{product.stock} units</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                product.stock === 0 ? 'bg-red-500' : 
                                product.stock < 5 ? 'bg-yellow-500' : 
                                'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((product.stock / 30) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Restock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Sales Analytics</CardTitle>
                  <CardDescription>Track your sales performance</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">This Month</p>
                        <p className="text-2xl font-semibold">${(totalRevenue * 0.65).toFixed(2)}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +22%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Last Month</p>
                        <p className="text-2xl font-semibold">${(totalRevenue * 0.35).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Average Order Value</p>
                        <p className="text-2xl font-semibold">${(totalRevenue / orders.length).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>Recent product feedback</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm mb-2">&ldquo;Beautiful craftsmanship! Love my vase!&rdquo;</p>
                      <p className="text-xs text-muted-foreground">Emily Chen • 1 day ago</p>
                    </div>
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm mb-2">&ldquo;Amazing quality and fast shipping.&rdquo;</p>
                      <p className="text-xs text-muted-foreground">David Miller • 3 days ago</p>
                    </div>
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <p className="text-sm mb-2">&ldquo;Great product, took a while to arrive.&rdquo;</p>
                      <p className="text-xs text-muted-foreground">Lisa Anderson • 1 week ago</p>
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
