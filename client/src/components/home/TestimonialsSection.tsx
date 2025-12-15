import React from "react";
import { testimonials } from "../../data/homeData";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-md border">
            <Star className="h-3 w-3 mr-1" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl tracking-tight">Loved by Thousands</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              className="border-2 card-hover hover:shadow-xl transition-all"
            >
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-foreground/90">
                  “{t.quote}”
                </p>

                <div className="pt-4 border-t">
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
