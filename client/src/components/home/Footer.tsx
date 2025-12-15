// src/components/home/Footer.tsx
import React from "react";
import { Calendar, Globe, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-xl py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
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

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Events", "Marketplace", "Vendors", "Pricing"].map((item) => (
                <li key={item}>
                  <a className="hover:text-foreground transition-all hover:ml-1 block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a className="hover:text-foreground transition-all hover:ml-1 block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <a className="hover:text-foreground transition-all hover:ml-1 block">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EventHub. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-muted-foreground">
            <Instagram className="h-5 w-5 hover:text-foreground transition" />
            <Twitter className="h-5 w-5 hover:text-foreground transition" />
            <Linkedin className="h-5 w-5 hover:text-foreground transition" />
            <Globe className="h-5 w-5 hover:text-foreground transition" />
          </div>
        </div>
      </div>
    </footer>
  );
}
