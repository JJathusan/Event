// src/components/home/HeroSection.tsx

import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type Props = {
  isLoggedIn: boolean;
  onNavigate: (v: string) => void;
  onOpenLogin: () => void;
};

export default function HeroSection({ isLoggedIn, onNavigate, onOpenLogin }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#eef] via-[#f8f9ff] to-[#eef]">
      
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.4] pointer-events-none" />

      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-300/30 rounded-full blur-[150px]" />

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SECTION — TEXT */}
          <div className="space-y-8 animate-fadeIn">

            <Badge className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm" variant="secondary">
              <Sparkles className="h-4 w-4" />
              Trusted by 500K+ users worldwide
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              The All-in-One
              <span className="block mt-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-400 bg-clip-text text-transparent">
                Event & Marketplace
              </span>
              Platform
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Streamline event planning, connect with premium vendors, and
              discover unique artisan products—all in one powerful SaaS platform.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="px-8 h-12 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
                onClick={() => (isLoggedIn ? onNavigate("events") : onOpenLogin())}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 border-gray-300"
                onClick={() => onNavigate("crafts")}
              >
                Explore Marketplace
              </Button>
            </div>

            {/* Avatar & Rating */}
            <div className="flex items-center gap-8 pt-6">
              
              {/* Avatar circles */}
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-purple-200 flex items-center justify-center"
                  >
                    <div className="w-5 h-5 rounded-full bg-purple-300" />
                  </div>
                ))}
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09L5.82 12 .66 7.91l6.174-.9L10 2l3.166 5.01 6.174.9L14.18 12l1.698 6.09z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-gray-600">
                  Rated 4.9/5 from 12,000+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Image with Cards */}
          <div className="relative animate-slideInRight">

            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/30 via-transparent to-blue-300/30 rounded-3xl blur-2xl" />

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759519238029-689e99c6d19e?q=80&w=1080"
                alt="Luxury event venue"
                className="rounded-3xl shadow-2xl w-full border border-gray-200"
                loading="lazy"
              />

              {/* Success Card */}
              <Card className="absolute -bottom-6 -left-6 shadow-2xl border bg-white/80 backdrop-blur-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">150,247</div>
                    <div className="text-sm text-gray-600">Successful Events</div>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Card */}
              <Card className="absolute -top-4 -right-4 shadow-2xl border bg-white/80 backdrop-blur-md">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-600">+45%</div>
                    <div className="text-xs text-gray-600">Growth Rate</div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
