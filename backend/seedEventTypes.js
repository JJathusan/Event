import mongoose from "mongoose";
import EventType from "./models/EventType.js";
import "dotenv/config";

const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected. Clearing existing event types...");
    await EventType.deleteMany();

    console.log("Inserting new event types...");
    await EventType.insertMany([
      {
        id: "wedding",
        name: "Wedding",
        description: "Celebrate your special day",
        color: "from-pink-500 to-rose-500",
        popular: true
      },
      {
        id: "birthday",
        name: "Birthday",
        description: "Make birthdays memorable",
        color: "from-purple-500 to-pink-500",
        popular: false
      },
      {
        id: "corporate",
        name: "Corporate Event",
        description: "Professional business events",
        color: "from-blue-500 to-cyan-500",
        popular: true
      },
      {
        id: "engagement",
        name: "Engagement",
        description: "Begin your journey together",
        color: "from-amber-500 to-orange-500",
        popular: false
      },
      {
        id: "party",
        name: "Party",
        description: "Celebrate life's moments",
        color: "from-green-500 to-emerald-500",
        popular: false
      },
      {
        id: "other",
        name: "Other Events",
        description: "Custom celebrations",
        color: "from-violet-500 to-purple-500",
        popular: false
      }
    ]);

    console.log("🎉 Event types seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding event types:", error);
    process.exit(1);
  }
};

seed();
