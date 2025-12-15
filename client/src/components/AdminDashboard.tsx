import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  Users, 
  Store, 
  Building2,
  Sparkles,
  DollarSign,
  TrendingUp,
  BarChart3,
  Shield,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Ban,
  UserCheck,
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";

interface VendorData {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  vendorType: 'hotel' | 'crafts' | 'services';
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  revenue: number;
  rating: number;
}

interface CustomerData {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export function AdminDashboard() {
  const [searchVendor, setSearchVendor] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  // Mock vendor data
  const [vendors, setVendors] = useState<VendorData[]>([
    {
      id: 'v1',
      businessName: 'Grand Plaza Hotel',
      ownerName: 'John Smith',
      email: 'john@grandplaza.com',
      vendorType: 'hotel',
      status: 'active',
      joinDate: '2024-01-15',
      revenue: 125000,
      rating: 4.8
    },
    {
      id: 'v2',
      businessName: 'Artisan Crafts Co',
      ownerName: 'Sarah Johnson',
      email: 'sarah@artisancrafts.com',
      vendorType: 'crafts',
      status: 'active',
      joinDate: '2024-02-20',
      revenue: 45000,
      rating: 4.9
    },
    {
      id: 'v3',
      businessName: 'Premier Photography',
      ownerName: 'Mike Davis',
      email: 'mike@premierphotos.com',
      vendorType: 'services',
      status: 'pending',
      joinDate: '2024-11-20',
      revenue: 0,
      rating: 0
    },
    {
      id: 'v4',
      businessName: 'Sunset Events Venue',
      ownerName: 'Emily Chen',
      email: 'emily@sunsetevents.com',
      vendorType: 'hotel',
      status: 'active',
      joinDate: '2024-03-10',
      revenue: 98000,
      rating: 4.7
    },
    {
      id: 'v5',
      businessName: 'Creative Catering',
      ownerName: 'Tom Wilson',
      email: 'tom@creativecatering.com',
      vendorType: 'services',
      status: 'active',
      joinDate: '2024-04-05',
      revenue: 67000,
      rating: 5.0
    }
  ]);

  // Mock customer data
  const [customers, setCustomers] = useState<CustomerData[]>([
    {
      id: 'c1',
      name: 'Rachel Johnson',
      email: 'rachel@example.com',
      joinDate: '2024-01-10',
      totalOrders: 5,
      totalSpent: 3500,
      status: 'active'
    },
    {
      id: 'c2',
      name: 'David Miller',
      email: 'david@example.com',
      joinDate: '2024-02-15',
      totalOrders: 12,
      totalSpent: 8900,
      status: 'active'
    },
    {
      id: 'c3',
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      joinDate: '2024-03-20',
      totalOrders: 3,
      totalSpent: 1200,
      status: 'active'
    },
    {
      id: 'c4',
      name: 'Tom Davis',
      email: 'tom@example.com',
      joinDate: '2024-05-12',
      totalOrders: 8,
      totalSpent: 5600,
      status: 'active'
    },
    {
      id: 'c5',
      name: 'Alex Brown',
      email: 'alex@example.com',
      joinDate: '2024-06-01',
      totalOrders: 0,
      totalSpent: 0,
      status: 'inactive'
    }
  ]);

  const getVendorTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return Building2;
      case 'crafts': return Store;
      case 'services': return Sparkles;
      default: return Store;
    }
  };

  const getVendorTypeBadge = (type: string) => {
    switch (type) {
      case 'hotel': return { color: 'bg-blue-500/10 text-blue-700 border-blue-200', label: 'Hotel & Venue' };
      case 'crafts': return { color: 'bg-purple-500/10 text-purple-700 border-purple-200', label: 'Crafts & Gifts' };
      case 'services': return { color: 'bg-pink-500/10 text-pink-700 border-pink-200', label: 'Event Services' };
      default: return { color: 'bg-gray-500/10 text-gray-700 border-gray-200', label: type };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'suspended': return 'destructive';
      case 'inactive': return 'outline';
      default: return 'secondary';
    }
  };

  const handleVendorStatusChange = (vendorId: string, newStatus: 'active' | 'pending' | 'suspended') => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: newStatus } : v));
  };

  // Calculate stats
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const pendingVendors = vendors.filter(v => v.status === 'pending').length;
  const hotelVendors = vendors.filter(v => v.vendorType === 'hotel').length;
  const craftsVendors = vendors.filter(v => v.vendorType === 'crafts').length;
  const servicesVendors = vendors.filter(v => v.vendorType === 'services').length;
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = vendors.reduce((sum, v) => sum + v.revenue, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);

  // Filter vendors and customers
  const filteredVendors = vendors.filter(v => 
    v.businessName.toLowerCase().includes(searchVendor.toLowerCase()) ||
    v.ownerName.toLowerCase().includes(searchVendor.toLowerCase()) ||
    v.email.toLowerCase().includes(searchVendor.toLowerCase())
  );

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
    c.email.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header Section */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="px-3 py-1 bg-red-500/10 text-red-700 border-red-200">
                  <Shield className="h-3.5 w-3.5 mr-1.5" />
                  Administrator
                </Badge>
              </div>
              <h1 className="text-4xl tracking-tight mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage vendors, customers, and platform analytics</p>
            </div>
            <Button className="shadow-lg shadow-primary/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
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
                <p className="text-sm text-muted-foreground mb-1">Platform Revenue</p>
                <p className="text-3xl font-semibold tracking-tight">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">All time</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Vendors Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                  {activeVendors} Active
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Vendors</p>
                <p className="text-3xl font-semibold tracking-tight">{totalVendors}</p>
                <p className="text-xs text-muted-foreground mt-2">{pendingVendors} pending approval</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Customers Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-purple-500/10 text-purple-700 border-purple-200">
                  {activeCustomers} Active
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
                <p className="text-3xl font-semibold tracking-tight">{totalCustomers}</p>
                <p className="text-xs text-muted-foreground mt-2">Registered users</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Orders Card */}
          <Card className="border-2 border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-orange-500/10 text-orange-700 border-orange-200">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +24%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl font-semibold tracking-tight">{totalOrders}</p>
                <p className="text-xs text-muted-foreground mt-2">Platform-wide</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vendor Type Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hotel & Venue</p>
                  <p className="text-2xl font-semibold">{hotelVendors}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Store className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Crafts & Gifts</p>
                  <p className="text-2xl font-semibold">{craftsVendors}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Event Services</p>
                  <p className="text-2xl font-semibold">{servicesVendors}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="vendors" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1 mb-8">
            <TabsTrigger value="vendors" className="data-[state=active]:bg-card">
              Vendor Management
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-card">
              Customer Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-card">
              Analytics
            </TabsTrigger>
          </TabsList>
        
          {/* Vendors Tab */}
          <TabsContent value="vendors">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">All Vendors</CardTitle>
                    <CardDescription className="mt-1">Manage and monitor all platform vendors</CardDescription>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search vendors..."
                      value={searchVendor}
                      onChange={(e) => setSearchVendor(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVendors.map((vendor) => {
                      const Icon = getVendorTypeIcon(vendor.vendorType);
                      const typeBadge = getVendorTypeBadge(vendor.vendorType);
                      return (
                        <TableRow key={vendor.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{vendor.businessName}</p>
                                <p className="text-xs text-muted-foreground">{vendor.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{vendor.ownerName}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={typeBadge.color}>
                              {typeBadge.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadge(vendor.status)}>
                              {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(vendor.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">${vendor.revenue.toLocaleString()}</TableCell>
                          <TableCell>
                            {vendor.rating > 0 ? (
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{vendor.rating}</span>
                                <span className="text-yellow-500">★</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {vendor.status === 'pending' && (
                                  <DropdownMenuItem onClick={() => handleVendorStatusChange(vendor.id, 'active')}>
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                    Approve Vendor
                                  </DropdownMenuItem>
                                )}
                                {vendor.status === 'active' && (
                                  <DropdownMenuItem onClick={() => handleVendorStatusChange(vendor.id, 'suspended')}>
                                    <Ban className="h-4 w-4 mr-2 text-red-600" />
                                    Suspend Vendor
                                  </DropdownMenuItem>
                                )}
                                {vendor.status === 'suspended' && (
                                  <DropdownMenuItem onClick={() => handleVendorStatusChange(vendor.id, 'active')}>
                                    <UserCheck className="h-4 w-4 mr-2 text-green-600" />
                                    Reactivate Vendor
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">All Customers</CardTitle>
                    <CardDescription className="mt-1">View and manage platform customers</CardDescription>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      value={searchCustomer}
                      onChange={(e) => setSearchCustomer(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Total Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <p className="font-medium">{customer.name}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                        <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {customer.totalOrders}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">${customer.totalSpent.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(customer.status)}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Order History
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Event History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>Key metrics and growth indicators</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Monthly Active Users</p>
                        <p className="text-2xl font-semibold">{activeCustomers + activeVendors}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +32%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Average Order Value</p>
                        <p className="text-2xl font-semibold">${(customers.reduce((s, c) => s + c.totalSpent, 0) / totalOrders).toFixed(2)}</p>
                      </div>
                      <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +8%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Vendor Approval Rate</p>
                        <p className="text-2xl font-semibold">{((activeVendors / totalVendors) * 100).toFixed(0)}%</p>
                      </div>
                      <Badge className="bg-purple-500/10 text-purple-700 border-purple-200">
                        Stable
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Platform Commission</p>
                        <p className="text-2xl font-semibold">${(totalRevenue * 0.1).toLocaleString()}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +18%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform events</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <UserCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New vendor approved</p>
                        <p className="text-xs text-muted-foreground">Creative Catering joined the platform</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">High-value order placed</p>
                        <p className="text-xs text-muted-foreground">$3,500 event booking completed</p>
                        <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New customer registered</p>
                        <p className="text-xs text-muted-foreground">12 new users joined today</p>
                        <p className="text-xs text-muted-foreground mt-1">Today</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Vendor pending approval</p>
                        <p className="text-xs text-muted-foreground">Premier Photography awaiting review</p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
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
