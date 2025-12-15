import express from "express";
import { getEventTypes } from "../controllers/eventController.js";

const router = express.Router();

// STEP 1 — Event Types
router.get("/types", getEventTypes);

// STEP 2 — Vendor Categories (MATCH FRONTEND)
router.get("/vendors/categories", (req, res) => {
  const { eventType } = req.query;

  // Later you can filter categories based on eventType
  const categories = [
    "venue",
    "catering",
    "photography",
    "videography",
    "decoration",
    "florist",
    "makeup",
    "entertainment",
    "transport",
    "equipment",
    "chef",
    "staff"
  ];

  res.json(categories);
});

// STEP 3 — Vendor List (MATCH FRONTEND)
router.get("/vendors/list", (req, res) => {
  const { category } = req.query;

  res.json([
    {
      id: "vendor1",
      name: "Urban Lens Photography",
      rating: 5,
      reviews: 189
    },
    {
      id: "vendor2",
      name: "Moments in Time Photography",
      rating: 4.8,
      reviews: 156
    }
  ]);
});

// STEP 4 — Vendor Details (MATCH FRONTEND)
router.get("/vendors/details/:vendorId", (req, res) => {
  const { vendorId } = req.params;

  res.json({
    id: vendorId,
    name: "Urban Lens Photography",
    rating: 5,
    reviews: 189,
    description: "Professional photography service for events."
  });
});

export default router;
