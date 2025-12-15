// src/components/home/FeaturesGrid.tsx
import React from "react";
import { Card, CardContent } from "../ui/card";
import { features } from "../../data/homeData";

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative">
      
      {/* Soft background accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-md border bg-white/5 backdrop-blur">
            <svg className="h-3 w-3 mr-1 text-primary" />
            <span className="text-sm">Platform Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl tracking-tight font-semibold">
            Everything You Need to Succeed
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful tools built for modern event planners, vendors, and artisans.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <Card
                key={i}
                className="border-2 hover:border-primary/50 transition-all bg-card/80 backdrop-blur card-hover"
              >
                <CardContent className="p-8 space-y-4">
                  
                  {/* Icon Circle */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold">{f.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
