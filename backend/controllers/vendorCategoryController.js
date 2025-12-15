// controllers/vendorCategoryController.js
import VendorCategory from "../models/VendorCategory.js";

export const getVendorCategories = async (req, res) => {
  try {
    const categories = await VendorCategory.find().lean();

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};
