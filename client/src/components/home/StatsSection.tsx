import React from "react";
import { Badge } from "../ui/badge";
import { stats } from "../../data/homeData";

export default function StatsSection() {
  return (
    <section className="border-y bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-semibold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 rounded-md"
              >
                {stat.change}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
