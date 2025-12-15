import mongoose from "mongoose";
import Vendor from "./models/Vendor.js";

import "dotenv/config";

mongoose.connect(process.env.MONGODB_URI);

async function seed() {
  await Vendor.deleteMany();

  await Vendor.insertMany([
    {
      name: "Urban Lens Photography",
      category: "photography",
      images: ["https://picsum.photos/800/400"],
      priceRange: "$500 - $1200",
      minPrice: 500,
      rating: 4.9,
      reviews: 189,
      location: "Colombo",
      availability: true,
      description: "Professional photography team",
      verified: true,
      featured: true,

      // EXTRA FIELDS FOR DETAILS PAGE
      amenities: [
        "High-resolution cameras",
        "Indoor & outdoor lighting setup",
        "Digital album creation"
      ],
      servicesIncluded: [
        "Full event coverage",
        "Photo editing",
        "Online gallery access"
      ],
      packages: [
        {
          id: "pkg1",
          name: "Standard Package",
          price: 500,
          features: ["3 hours coverage", "50 edited photos", "Online gallery"]
        },
        {
          id: "pkg2",
          name: "Premium Package",
          price: 900,
          features: [
            "6 hours coverage",
            "120 edited photos",
            "Two photographers",
            "Album included"
          ]
        }
      ],
      reviewsList: [
        {
          id: "r1",
          author: "Nimal Perera",
          rating: 5,
          comment: "Amazing quality and friendly team!",
          date: "2024-11-02"
        },
        {
          id: "r2",
          author: "Sajini Silva",
          rating: 4,
          comment: "Very professional and punctual.",
          date: "2024-08-14"
        }
      ],
      phone: "+94 77 123 4567",
      email: "urbanlens@example.com",
      yearsInBusiness: 8
    },

    {
      name: "Moments in Time Photography",
      category: "photography",
      images: ["https://picsum.photos/801/400"],
      priceRange: "$400 - $1100",
      minPrice: 400,
      rating: 4.7,
      reviews: 156,
      location: "Kandy",
      availability: true,
      description: "Wedding and event photography crew",
      verified: false,
      featured: false,

      // EXTRA FIELDS FOR DETAILS PAGE
      amenities: ["Lighting setup", "Drone coverage"],
      servicesIncluded: ["Full album", "Editing", "Event highlights"],
      packages: [
        {
          id: "pkg1",
          name: "Basic Event Package",
          price: 400,
          features: ["2 hours coverage", "30 edited photos"]
        },
        {
          id: "pkg2",
          name: "Wedding Package",
          price: 1100,
          features: [
            "8 hours coverage",
            "150 edited photos",
            "Drone shots",
            "Pre-shoot included"
          ]
        }
      ],
      reviewsList: [
        {
          id: "r1",
          author: "Amal Fonseka",
          rating: 5,
          comment: "Perfect for our engagement event.",
          date: "2024-06-18"
        }
      ],
      phone: "+94 71 987 6543",
      email: "moments@example.com",
      yearsInBusiness: 5
    }
  ]);

  console.log("VENDORS SEEDED ✔");
  process.exit();
}

seed();
