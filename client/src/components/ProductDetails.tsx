import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  MessageCircle,
  Store
} from "lucide-react";
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

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export function ProductDetails({ product, onAddToCart, onBack }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock additional images for the product
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different angles
    product.image,
    product.image
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2024-10-15",
      comment: "Absolutely beautiful! The craftsmanship is exceptional and it arrived perfectly packaged.",
      verified: true
    },
    {
      id: 2,
      name: "Mike R.",
      rating: 4,
      date: "2024-10-10",
      comment: "Great quality, shipped quickly. Exactly as described in the listing.",
      verified: true
    },
    {
      id: 3,
      name: "Emily K.",
      rating: 5,
      date: "2024-10-05",
      comment: "This exceeded my expectations! Perfect gift for my mother. Will definitely order again.",
      verified: true
    }
  ];

  // Mock vendor info
  const vendorInfo = {
    name: product.vendor,
    memberSince: "2020",
    totalSales: "1,234",
    rating: 4.9,
    responseTime: "Within 2 hours",
    location: "California, USA"
  };

  const renderStars = (rating: number, size = "h-4 w-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square mb-4 overflow-hidden rounded-2xl border-2 shadow-lg bg-white">
              <ImageWithFallback
                src={productImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-20 h-20 overflow-hidden rounded-md border-2 ${
                  activeImageIndex === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <Badge className="mb-4" variant="secondary">{product.category}</Badge>
            <h1 className="text-4xl mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg">
                {renderStars(product.rating)}
                <span className="ml-1 font-semibold">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                {product.reviews} reviews
              </span>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 p-0"
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 p-0"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 h-14 shadow-lg"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2 h-14 hover:bg-primary/5 hover:border-primary transition-all">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2 h-14 hover:bg-primary/5 hover:border-primary transition-all">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Shipping & Returns */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Free shipping on orders over $50</div>
                <div className="text-sm text-muted-foreground">Usually ships within 2-3 business days</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">30-day returns</div>
                <div className="text-sm text-muted-foreground">Contact vendor for return policy on handmade items</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium">Secure payments</div>
                <div className="text-sm text-muted-foreground">Your payment information is safe with us</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Tabs Section */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-muted/50 p-1">
            <TabsTrigger value="details" className="text-base">Product Details</TabsTrigger>
            <TabsTrigger value="reviews" className="text-base">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="vendor" className="text-base">About Vendor</TabsTrigger>
            <TabsTrigger value="shipping" className="text-base">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-8">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
              <h3 className="font-medium mb-4">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Category</div>
                  <div className="capitalize">{product.category}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">SKU</div>
                  <div>{product.id.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Materials</div>
                  <div>High-quality ceramic, hand-glazed finish</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Dimensions</div>
                  <div>8" H x 4" W x 4" D</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Weight</div>
                  <div>1.2 lbs</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Care Instructions</div>
                  <div>Hand wash recommended, avoid harsh chemicals</div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  This beautiful handcrafted ceramic vase is perfect for displaying fresh flowers or as a standalone 
                  decorative piece. Each piece is unique and may have slight variations due to the handmade nature. 
                  The elegant design complements both modern and traditional home decor styles. Made with care by 
                  skilled artisans using traditional pottery techniques passed down through generations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              {/* Review Summary */}
              <Card className="border-2 shadow-lg">
                <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {renderStars(product.rating, "h-5 w-5")}
                    </div>
                    <div className="text-muted-foreground">
                      Based on {product.reviews} reviews
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm">{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map(review => (
                  <Card key={review.id} className="border-2 hover:border-primary/20 transition-colors">
                    <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vendor" className="mt-8">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Store className="h-8 w-8 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-2">{vendorInfo.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(vendorInfo.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({vendorInfo.rating} vendor rating)
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Artisan specializing in handcrafted ceramics and pottery. Each piece is made with 
                    love and attention to detail using traditional techniques.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{vendorInfo.totalSales}</div>
                  <div className="text-sm text-muted-foreground">Total Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{vendorInfo.memberSince}</div>
                  <div className="text-sm text-muted-foreground">Member Since</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{vendorInfo.responseTime}</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Vendor
                </Button>
                <Button variant="outline">
                  View Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="shipping" className="mt-8">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Shipping Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-muted-foreground">$9.99 - Usually arrives in 5-7 business days</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-muted-foreground">$19.99 - Usually arrives in 2-3 business days</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Free Shipping</div>
                        <div className="text-sm text-muted-foreground">On orders over $50 - Usually arrives in 5-7 business days</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Return Policy</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <RotateCcw className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">30-Day Returns</div>
                        <div className="text-sm text-muted-foreground">
                          Items can be returned within 30 days of delivery for a full refund
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground ml-8">
                      • Items must be in original condition<br/>
                      • Return shipping costs may apply<br/>
                      • Handmade items may have different return policies - contact vendor for details
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Care Instructions</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Hand wash with mild soap and warm water</p>
                    <p>• Avoid harsh chemicals or abrasive materials</p>
                    <p>• Dry thoroughly before storing</p>
                    <p>• Handle with care due to handcrafted nature</p>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}