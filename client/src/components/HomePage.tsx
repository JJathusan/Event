import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Calendar, 
  Store, 
  Users, 
  Star, 
  TrendingUp, 
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Globe,
  Award
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (view: string) => void;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}

export function HomePage({ onNavigate, isLoggedIn, onOpenLogin }: HomePageProps) {
  const features = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Smart Event Planning",
      description: "AI-powered event management with automated vendor matching and real-time availability"
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: "Global Marketplace",
      description: "Connect with verified artisans and vendors from around the world in one platform"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Advanced Analytics",
      description: "Track performance, revenue, and customer insights with powerful dashboard tools"
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with international payment standards"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Optimized infrastructure ensures instant bookings and seamless transactions"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Premium Support",
      description: "24/7 dedicated support team to help you succeed and grow your business"
    }
  ];

  const stats = [
    { value: "12K+", label: "Active Vendors", change: "+23%" },
    { value: "150K+", label: "Events Completed", change: "+18%" },
    { value: "500K+", label: "Happy Customers", change: "+45%" },
    { value: "4.9/5", label: "Platform Rating", change: "Excellent" }
  ];

  const useCases = [
    {
      title: "Weddings & Celebrations",
      description: "Create magical moments with premium venues and personalized services",
      image: "https://images.unsplash.com/photo-1758905728020-a888617aecd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VsZWJyYXRpb24lMjBlbGVnYW50fGVufDF8fHx8MTc2MDAwMDU4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "events",
      badge: "Most Popular"
    },
    {
      title: "Corporate Events",
      description: "Professional venues and seamless coordination for business success",
      image: "https://images.unsplash.com/photo-1642522029693-20b2ab875b19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5OTcxNDY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "events",
      badge: "Trending"
    },
    {
      title: "Artisan Marketplace",
      description: "Discover unique handcrafted products from talented creators worldwide",
      image: "https://images.unsplash.com/photo-1631869382470-cd1722baebc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGFydGlzYW4lMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjAwMDA1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "crafts",
      badge: "New"
    }
  ];

  const testimonials = [
    {
      quote: "EventHub transformed how we manage our venue bookings. The dashboard is incredibly intuitive.",
      author: "Sarah Mitchell",
      role: "Event Venue Manager",
      rating: 5
    },
    {
      quote: "As an artisan, this platform helped me reach customers worldwide. Sales increased by 300%!",
      author: "Marcus Chen",
      role: "Craft Vendor",
      rating: 5
    },
    {
      quote: "The best event planning platform we've used. Everything we need in one place.",
      author: "Jessica Reynolds",
      role: "Wedding Planner",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Modern SaaS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fadeIn">
              <Badge className="inline-flex items-center gap-1.5 px-4 py-1.5" variant="secondary">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted by 500K+ users worldwide
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight">
                The All-in-One
                <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Event & Marketplace
                </span>
                Platform
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Streamline event planning, connect with premium vendors, and discover unique artisan products—all in one powerful SaaS platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  onClick={() => isLoggedIn ? onNavigate('events') : onOpenLogin()}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-12 px-8"
                  onClick={() => onNavigate('crafts')}
                >
                  Explore Marketplace
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                    >
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rated 4.9/5 from 12,000+ reviews
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-slideInRight">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBldmVudCUyMHZlbnVlJTIwaGFsbHxlbnwxfHx8fDE3NjAwMDA1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Luxury event venue"
                  className="relative rounded-3xl shadow-2xl w-full h-auto border border-border/50"
                />
                
                {/* Floating stats card */}
                <Card className="absolute -bottom-6 -left-6 shadow-xl border-2 card-hover">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">150,247</div>
                      <div className="text-sm text-muted-foreground">Successful Events</div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Floating trend card */}
                <Card className="absolute -top-4 -right-4 shadow-xl border-2 card-hover">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">+45%</div>
                      <div className="text-xs text-muted-foreground">Growth Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Design */}
      <section className="border-y bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl lg:text-5xl font-semibold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Card Grid */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge className="mb-2" variant="outline">
              <Sparkles className="h-3 w-3 mr-1" />
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl tracking-tight">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools and features designed for modern event planners, vendors, and artisans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all card-hover bg-card/80 backdrop-blur"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline">
              <Globe className="h-3 w-3 mr-1" />
              Use Cases
            </Badge>
            <h2 className="text-4xl md:text-5xl tracking-tight">
              Built for Every Occasion
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden cursor-pointer border-2 hover:border-primary/50 transition-all card-hover"
                onClick={() => onNavigate(useCase.link)}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <Badge className="absolute top-4 right-4 shadow-lg">
                    {useCase.badge}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-2xl">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl tracking-tight">
              Loved by Thousands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 card-hover">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="pt-4 border-t">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl text-white mb-6 tracking-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands of successful vendors and event planners on EventHub today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="h-12 px-8 shadow-xl hover:scale-105 transition-transform"
              onClick={() => isLoggedIn ? onNavigate('events') : onOpenLogin()}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-12 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur"
              onClick={() => onNavigate('vendor-signup')}
            >
              Become a Vendor
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-8">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer - Modern & Clean */}
      <footer className="border-t bg-card/50 backdrop-blur py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold">EventHub</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The modern SaaS platform for event planning and artisan marketplace
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Vendors</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 EventHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
