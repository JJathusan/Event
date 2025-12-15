import express from "express";
import VendorCategory from "../models/VendorCategory.js";
import Vendor from "../models/Vendor.js";

const router = express.Router();

/* -------------------------
   1. Event Types (Static)
------------------------- */
router.get("/events/types", (req, res) => {
  res.json([
    { id: "wedding", name: "Wedding" },
    { id: "birthday", name: "Birthday" },
    { id: "corporate", name: "Corporate Event" }
  ]);
});

/* -------------------------
   2. Vendor Categories (MongoDB)
------------------------- */
router.get("/vendors/categories", async (req, res) => {
  try {
    const categories = await VendorCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching vendor categories:", error);
    res.status(500).json({ error: "Server error fetching categories" });
  }
});

/* -------------------------
   3. Vendor List (MongoDB + Filter)
------------------------- */
router.get("/vendors/list", async (req, res) => {
  try {
    const category = req.query.category;

    let vendors;
    if (category) {
      vendors = await Vendor.find({ category: category.toLowerCase() });
    } else {
      vendors = await Vendor.find();
    }

    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendor list:", error);
    res.status(500).json({ error: "Server error fetching vendors" });
  }
});

/* -------------------------
   4. Vendor Details
------------------------- */
router.get("/vendors/details/:vendorId", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    res.status(500).json({ error: "Server error fetching vendor details" });
  }
});

export default router;
