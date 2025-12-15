import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  DollarSign,
  Filter,
  Users,
  CheckCircle2,
  Heart,
  Award,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { ImageWithFallback } from "./figma/ImageWithFallback";

// -----------------------------
// TYPES
// -----------------------------
interface Vendor {
  id: string;
  name: string;
  category: string;
  images: string[];
  priceRange: string;
  minPrice: number;
  rating: number;
  reviews: number;
  location: string;
  availability: boolean;
  description: string;
  capacity?: number;
  verified: boolean;
  featured: boolean;
  packageTypes?: string[];
}

interface VendorListingPageProps {
  eventType: string;
  category: string;
  onBack: () => void;
  onViewVendor: (vendorId: string) => void;
}

// -----------------------------
// MAIN COMPONENT
// -----------------------------
export function VendorListingPage({
  eventType,
  category,
  onBack,
  onViewVendor,
}: VendorListingPageProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("popular");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // -----------------------------
  // FETCH VENDORS
  // -----------------------------
    useEffect(() => {
  if (!category) return;

  async function fetchVendors() {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/vendors/list?category=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // FIX: normalize ID field
      setVendors(
        data.map((v: any) => ({
          ...v,
          id: v._id || v.id,
        }))
      );
    } catch (error) {
      console.error("Failed to load vendors:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchVendors();
}, [category]);


  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const filteredVendors = vendors
    .filter((vendor) => {
      const matchSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchLocation =
        !locationFilter ||
        vendor.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchPrice =
        vendor.minPrice >= priceRange[0] &&
        vendor.minPrice <= priceRange[1];

      const matchAvailability =
        !showOnlyAvailable || vendor.availability;

      return (
        vendor.category === category &&
        matchSearch &&
        matchLocation &&
        matchPrice &&
        matchAvailability
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.minPrice - b.minPrice;
        case "price-high":
          return b.minPrice - a.minPrice;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.reviews - a.reviews; // popular
      }
    });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  // -----------------------------
  // LOADING UI
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading vendors...
      </div>
    );
  }

  // -----------------------------
  // MAIN UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* BACK BUTTON */}
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Button>

        {/* HEADER */}
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {category.toUpperCase()}
        </h1>
        <p className="text-muted-foreground mb-6">
          Find the perfect vendor for your <strong>{eventType}</strong>
        </p>

        {/* SEARCH + FILTER */}
        <div className="bg-card p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search vendor */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Location filter */}
            <div className="relative md:w-64">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* FILTER PANEL */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your vendor list</SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">

                  {/* Price */}
                  <div>
                    <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-3"
                    />
                  </div>

                  {/* Sort */}
                  <div>
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="price-low">Price: Low → High</SelectItem>
                        <SelectItem value="price-high">Price: High → Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showOnlyAvailable}
                      onChange={(e) =>
                        setShowOnlyAvailable(e.target.checked)
                      }
                    />
                    <Label>Show only available vendors</Label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="overflow-hidden border-2 hover:border-primary transition-all cursor-pointer"
              onClick={() => onViewVendor(vendor.id)}
            >
              {/* Image */}
              <div className="relative h-48">
                <ImageWithFallback
                  alt={vendor.name}
                  src={vendor.images?.[0]}
                  className="object-cover w-full h-full"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {vendor.featured && (
                    <Badge className="bg-amber-500 text-white">Featured</Badge>
                  )}
                  {vendor.verified && (
                    <Badge className="bg-blue-500 text-white gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>

                {/* Favorite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(vendor.id);
                  }}
                  className="absolute top-3 right-3 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(vendor.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Card Content */}
              <CardContent className="p-5">
                <div className="flex justify-between">
                  <h3 className="text-xl">{vendor.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                    <Star className="h-3 w-3 fill-amber-500" />
                    <span>{vendor.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({vendor.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {vendor.description}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" /> {vendor.location}
                  </Badge>

                  {vendor.capacity && (
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" /> {vendor.capacity} guests
                    </Badge>
                  )}

                  <Badge variant="outline" className="gap-1">
                    <DollarSign className="h-3 w-3" /> {vendor.priceRange}
                  </Badge>
                </div>

                <Button
                  className="w-full mt-4 gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewVendor(vendor.id);
                  }}
                >
                  View Details <Award className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <Card className="p-12 text-center mt-10">
            <p className="text-muted-foreground mb-4">
              No vendors found matching your filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setPriceRange([0, 10000]);
                setShowOnlyAvailable(false);
                setLocationFilter("");
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
