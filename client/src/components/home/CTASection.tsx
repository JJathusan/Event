// src/components/home/CTASection.tsx
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  isLoggedIn: boolean;
  onNavigate: (v: string) => void;
  onOpenLogin: () => void;
};

export default function CTASection({ isLoggedIn, onNavigate, onOpenLogin }: Props) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/80" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
          Ready to Transform Your Business?
        </h2>

        <p className="text-xl text-white/90 mb-10 leading-relaxed">
          Join thousands of successful vendors and event planners using EventHub today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="h-12 px-8"
            onClick={() =>
              isLoggedIn ? onNavigate("events") : onOpenLogin()
            }
          >
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={() => onNavigate("vendor-signup")}
          >
            Become a Vendor
          </Button>
        </div>

        <p className="text-sm text-white/70 mt-8">
          No credit card required • Free 14-day trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
