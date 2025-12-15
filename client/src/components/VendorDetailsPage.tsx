import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar as CalendarComponent } from "./ui/calendar";

import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  DollarSign,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  Heart,
  Share2,
  MessageSquare,
  Package,
  Award
} from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";


interface VendorDetailsPageProps {
  vendor: any; 
  onBack: () => void;
  onBookNow: (vendorId: string, bookingData: any) => void;
}

export default function VendorDetailsPage({ vendor, onBack, onBookNow }: VendorDetailsPageProps) {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  if (!vendor) return <div className="p-10">Loading vendor...</div>;

  const handleSendInquiry = () => {
    if (!inquiryMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }
    toast.success("Inquiry sent!");
    setInquiryMessage("");
  };

  const handleRequestQuote = () => {
    if (!selectedDate || !guestCount || !selectedPackage) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Quote request submitted!");
  };

  const handleBookNowClick = () => {
    if (!selectedDate || !guestCount || !selectedPackage) {
      toast.error("Missing booking info");
      return;
    }

    onBookNow(vendor.id, {
      date: selectedDate,
      guests: guestCount,
      packageId: selectedPackage
    });

    toast.success("Proceeding to confirmation...");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background pb-12">

      {/* HEADER IMAGE */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <ImageWithFallback
            src={vendor?.images?.[0]}
            alt={vendor?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* ACTION BUTTONS */}
        <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
          <Button variant="secondary" onClick={onBack} className="gap-2 shadow-lg">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex gap-2">

            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                setIsFavorite(!isFavorite);
                toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
              }}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>

            <Button variant="secondary" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>

          </div>
        </div>

        {/* TITLE BLOCK */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">

            <div className="flex gap-3 flex-wrap mb-2">
              {vendor.featured && (
                <Badge className="bg-amber-500 text-white">Featured</Badge>
              )}

              {vendor.verified && (
                <Badge className="bg-blue-500 text-white flex gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              )}

              {vendor.yearsInBusiness && (
                <Badge className="bg-green-500 text-white flex gap-1">
                  <Award className="h-3 w-3" />
                  {vendor.yearsInBusiness}+ Years
                </Badge>
              )}
            </div>

            <h1 className="text-4xl text-white drop-shadow-lg">{vendor.name}</h1>

            <div className="flex items-center mt-2 gap-4 text-white/90">
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{vendor.rating}</span>
                <span className="text-sm">({vendor.reviews})</span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{vendor.location}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            {/* ABOUT */}
            <TabsContent value="about" className="mt-6 space-y-6">
              <Card>
                <CardHeader><CardTitle>About</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {vendor.description}
                  </p>
                </CardContent>
              </Card>

              {/* AMENITIES */}
              {vendor.amenities && (
                <Card>
                  <CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vendor.amenities.map((item: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* SERVICES */}
              {vendor.servicesIncluded && (
                <Card>
                  <CardHeader><CardTitle>Services Included</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vendor.servicesIncluded.map((item: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

            </TabsContent>

            {/* PACKAGES */}
            <TabsContent value="packages" className="mt-6 space-y-4">
              {vendor.packages?.map((pkg: any) => (
                <Card
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`cursor-pointer transition-all ${selectedPackage === pkg.id ? "border-primary border-2" : "hover:border-primary/40"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-2xl">{pkg.name}</h3>
                      <div className="text-primary font-semibold text-xl">${pkg.price}</div>
                    </div>

                    <div className="space-y-2">
                      {pkg.features?.map((ft: string, i: number) => (
                        <div key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                          <span>{ft}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* REVIEWS */}
            <TabsContent value="reviews" className="mt-6 space-y-4">
              <Card>
                <CardHeader><CardTitle>Reviews</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {vendor.reviewsList?.map((r: any) => (
                    <div key={r.id} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{r.author}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < r.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{r.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{r.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* GALLERY */}
            <TabsContent value="gallery" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vendor.images?.map((img: string, i: number) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={img}
                      alt={`vendor image ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

          </Tabs>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* BOOKING CARD */}
          <Card className="sticky top-24 border-2">
            <CardHeader><CardTitle className="flex gap-2 items-center"><Package className="h-5 w-5 text-primary" /> Book This Vendor</CardTitle></CardHeader>
            <CardContent className="p-6 space-y-4">

              <div className="space-y-2">
                <Label>Select Date</Label>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <Label>Guest Count</Label>
                <Input
                  type="number"
                  placeholder="Expected guests"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Selected Package</Label>
                {selectedPackage ? (
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="font-semibold">
                      {vendor.packages?.find((p: any) => p.id === selectedPackage)?.name}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Pick a package from the Packages tab.</p>
                )}
              </div>

              <Button className="w-full" onClick={handleBookNowClick}>
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>

              <Button className="w-full" variant="outline" onClick={handleRequestQuote}>
                <DollarSign className="h-4 w-4 mr-2" />
                Request Quote
              </Button>

            </CardContent>
          </Card>

          {/* INQUIRY */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Send Inquiry</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Ask about availability, pricing, etc."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                rows={4}
              />
              <Button variant="outline" className="w-full" onClick={handleSendInquiry}>
                <Mail className="h-4 w-4 mr-2" /> Send Inquiry
              </Button>
            </CardContent>
          </Card>

          {/* CONTACT INFO */}
          <Card>
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardContent className="space-y-3">

              <div className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p>{vendor.phone}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p>{vendor.email}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p>{vendor.location}</p>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
