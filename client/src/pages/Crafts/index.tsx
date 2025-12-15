import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Star, Search, Filter, Store } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  vendor: string;
  category: string;
  image: string;
  description: string;
}

interface CraftsModuleProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export function CraftsModule({ onAddToCart, onViewProduct }: CraftsModuleProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Mock product data
  const products: Product[] = [
    {
      id: "1",
      name: "Handmade Ceramic Vase",
      price: 45.99,
      rating: 4.8,
      reviews: 124,
      vendor: "Potter's Corner",
      category: "ceramics",
      image: "https://images.unsplash.com/photo-1599833114852-724119b27cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pYyUyMGFydHxlbnwxfHx8fDE3NTk4MjcxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Beautiful handcrafted ceramic vase perfect for home decoration"
    },
    {
      id: "2",
      name: "Sterling Silver Necklace",
      price: 89.99,
      rating: 4.9,
      reviews: 67,
      vendor: "Silver Artisan",
      category: "jewelry",
      image: "https://images.unsplash.com/photo-1652007233137-62275940bfc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5ODE5Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Elegant handmade sterling silver necklace with intricate design"
    },
    {
      id: "3",
      name: "Wedding Decoration Set",
      price: 149.99,
      rating: 4.7,
      reviews: 89,
      vendor: "Dream Weddings Co",
      category: "decorations",
      image: "https://images.unsplash.com/photo-1625038032515-308ab14d10b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbnN8ZW58MXx8fHwxNzU5ODI3MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Complete wedding decoration set with flowers and candles"
    },
    {
      id: "4",
      name: "Artisan Craft Kit",
      price: 32.99,
      rating: 4.6,
      reviews: 156,
      vendor: "Craft Masters",
      category: "kits",
      image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0c3xlbnwxfHx8fDE3NTk3NTg1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Complete craft kit with all materials and instructions included"
    },
    {
      id: "5",
      name: "Wooden Jewelry Box",
      price: 67.50,
      rating: 4.8,
      reviews: 43,
      vendor: "Woodwork Studio",
      category: "woodwork",
      image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0c3xlbnwxfHx8fDE3NTk3NTg1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Handcrafted wooden jewelry box with velvet interior"
    },
    {
      id: "6",
      name: "Glass Art Sculpture",
      price: 199.99,
      rating: 4.9,
      reviews: 31,
      vendor: "Glass Artists Guild",
      category: "glass",
      image: "https://images.unsplash.com/photo-1599833114852-724119b27cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pYyUyMGFydHxlbnwxfHx8fDE3NTk4MjcxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Unique blown glass sculpture for art collectors"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "ceramics", label: "Ceramics" },
    { value: "jewelry", label: "Jewelry" },
    { value: "decorations", label: "Decorations" },
    { value: "kits", label: "Craft Kits" },
    { value: "woodwork", label: "Woodwork" },
    { value: "glass", label: "Glass Art" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header Section */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="outline">
              <Store className="h-3 w-3 mr-1" />
              Artisan Marketplace
            </Badge>
            <h1 className="text-5xl md:text-6xl tracking-tight mb-4">
              Crafts & Gifts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover unique handmade items from verified artisans worldwide
            </p>
          </div>

          {/* Filters and Search */}
          <Card className="shadow-xl border-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search products or vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-56 h-12 border-2">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-56 h-12 border-2">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedProducts.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span> products
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <Card key={product.id} className="group border-2 hover:border-primary/50 transition-all card-hover overflow-hidden bg-card">
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden relative bg-muted/30">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onClick={() => onViewProduct(product)}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/95 dark:bg-card/95 text-primary border-0 shadow-xl backdrop-blur px-3 py-1.5">
                      ${product.price.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 
                  className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors cursor-pointer" 
                  onClick={() => onViewProduct(product)}
                >
                  {product.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  by {product.vendor}
                </p>
                
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button 
                  onClick={() => onViewProduct(product)}
                  variant="outline" 
                  className="flex-1 h-10"
                  size="sm"
                >
                  View Details
                </Button>
                <Button 
                  onClick={() => onAddToCart(product)}
                  size="sm"
                  className="flex-1 h-10 shadow-lg shadow-primary/20"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <Card className="text-center py-20 border-2">
            <CardContent>
              <div className="w-20 h-20 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}