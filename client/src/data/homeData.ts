// src/data/homeData.ts
import {
  Calendar,
  Store,
  BarChart3,
  ShieldCheck,
  Zap,
  Award
} from "lucide-react";

export const features = [
  { icon: Calendar, title: "Smart Event Planning", description: "AI-powered event management with automated vendor matching and real-time availability" },
  { icon: Store, title: "Global Marketplace", description: "Connect with verified artisans and vendors from around the world in one platform" },
  { icon: BarChart3, title: "Advanced Analytics", description: "Track performance, revenue, and customer insights with powerful dashboard tools" },
  { icon: ShieldCheck, title: "Enterprise Security", description: "Bank-level encryption and compliance with international payment standards" },
  { icon: Zap, title: "Lightning Fast", description: "Optimized infrastructure ensures instant bookings and seamless transactions" },
  { icon: Award, title: "Premium Support", description: "24/7 dedicated support team to help you succeed and grow your business" },
];

export const stats = [
  { value: "12K+", label: "Active Vendors", change: "+23%" },
  { value: "150K+", label: "Events Completed", change: "+18%" },
  { value: "500K+", label: "Happy Customers", change: "+45%" },
  { value: "4.9/5", label: "Platform Rating", change: "Excellent" }
];

export const useCases = [
  {
    title: "Weddings & Celebrations",
    description: "Create magical moments with premium venues and personalized services",
    image: "https://images.unsplash.com/photo-1758905728020-a888617aecd0?ixlib=rb-4.1.0&q=80&w=1080",
    link: "events",
    badge: "Most Popular"
  },
  {
    title: "Corporate Events",
    description: "Professional venues and seamless coordination for business success",
    image: "https://images.unsplash.com/photo-1642522029693-20b2ab875b19?ixlib=rb-4.1.0&q=80&w=1080",
    link: "events",
    badge: "Trending"
  },
  {
    title: "Artisan Marketplace",
    description: "Discover unique handcrafted products from talented creators worldwide",
    image: "https://images.unsplash.com/photo-1631869382470-cd1722baebc7?ixlib=rb-4.1.0&q=80&w=1080",
    link: "crafts",
    badge: "New"
  }
];

export const testimonials = [
  { quote: "EventHub transformed how we manage our venue bookings. The dashboard is incredibly intuitive.", author: "Sarah Mitchell", role: "Event Venue Manager", rating: 5 },
  { quote: "As an artisan, this platform helped me reach customers worldwide. Sales increased by 300%!", author: "Marcus Chen", role: "Craft Vendor", rating: 5 },
  { quote: "The best event planning platform we've used. Everything we need in one place.", author: "Jessica Reynolds", role: "Wedding Planner", rating: 5 },
];
