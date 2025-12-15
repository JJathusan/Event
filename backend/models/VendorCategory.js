// models/VendorCategory.js
import mongoose from "mongoose";

const VendorCategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  count: { type: String, required: true }, 
});

export default mongoose.model("VendorCategory", VendorCategorySchema);
