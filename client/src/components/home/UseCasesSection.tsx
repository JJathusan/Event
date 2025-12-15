import React from "react";
import { useCases } from "../../data/homeData";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Square } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function UseCasesSection({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-md border">
            <Square className="h-3 w-3 mr-1" />
            Use Cases
          </div>
          <h2 className="text-4xl md:text-5xl tracking-tight">Built for Every Occasion</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((uc, i) => (
            <div
              key={i}
              onClick={() => onNavigate(uc.link)}
              className="group cursor-pointer border-2 hover:border-primary/50 transition-all rounded-xl overflow-hidden card-hover hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={uc.image}
                  alt={uc.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <Badge className="absolute top-4 right-4 shadow-lg">
                  {uc.badge}
                </Badge>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold">{uc.title}</h3>
                <p className="text-muted-foreground">{uc.description}</p>

                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-primary/10"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
