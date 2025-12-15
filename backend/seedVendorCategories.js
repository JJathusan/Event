import mongoose from "mongoose";
import VendorCategory from "./models/VendorCategory.js";
import "dotenv/config";

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await VendorCategory.deleteMany();

  await VendorCategory.insertMany([
    {
      id: "venue",
      name: "Venue",
      description: "Hotels, halls, and event spaces",
      color: "from-blue-500 to-cyan-500",
      count: "250+ vendors"
    },
    {
      id: "catering",
      name: "Catering",
      description: "Food and beverage services",
      color: "from-orange-500 to-amber-500",
      count: "180+ vendors"
    },
    {
      id: "photography",
      name: "Photography",
      description: "Professional photography services",
      color: "from-purple-500 to-pink-500",
      count: "320+ vendors"
    },
    {
      id: "videography",
      name: "Videography",
      description: "Video recording and editing",
      color: "from-red-500 to-rose-500",
      count: "150+ vendors"
    },
    {
      id: "decoration",
      name: "Decoration",
      description: "Theme and decor specialists",
      color: "from-pink-500 to-fuchsia-500",
      count: "200+ vendors"
    },
    {
      id: "florist",
      name: "Florist",
      description: "Floral arrangements and design",
      color: "from-green-500 to-emerald-500",
      count: "120+ vendors"
    },
    {
      id: "makeup",
      name: "Makeup & Styling",
      description: "Beauty and styling services",
      color: "from-violet-500 to-purple-500",
      count: "280+ vendors"
    },
    {
      id: "entertainment",
      name: "DJ / Entertainment",
      description: "Music and entertainment acts",
      color: "from-indigo-500 to-blue-500",
      count: "190+ vendors"
    },
    {
      id: "transport",
      name: "Transport",
      description: "Vehicle rentals and logistics",
      color: "from-teal-500 to-cyan-500",
      count: "140+ vendors"
    },
    {
      id: "equipment",
      name: "Equipment Rental",
      description: "Sound, lighting, and stage setup",
      color: "from-slate-500 to-gray-500",
      count: "95+ vendors"
    },
    {
      id: "chef",
      name: "Private Chef",
      description: "Personal culinary experiences",
      color: "from-yellow-500 to-orange-500",
      count: "75+ vendors"
    },
    {
      id: "staff",
      name: "Event Staff",
      description: "Waiters, coordinators, security",
      color: "from-cyan-500 to-blue-500",
      count: "160+ vendors"
    }
  ]);

  console.log("Vendor categories seeded!");
  process.exit();
};

seed();
