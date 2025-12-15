import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },

  // IMAGES / GALLERY
  images: { type: [String], default: [] },

  // BASIC
  priceRange: { type: String, default: "" },
  minPrice: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  description: { type: String, default: "" },
  location: { type: String, default: "" },

  // VERIFICATION / FEATURES
  verified: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  yearsInBusiness: { type: Number, default: 0 },

  // CONTACT INFO (Required by VendorDetailsPage)
  phone: { type: String, default: "" },
  email: { type: String, default: "" },

  // PACKAGES (Used in packages tab)
  packages: {
    type: [
      {
        id: String,
        name: String,
        price: Number,
        features: [String]
      }
    ],
    default: []
  },

  // REVIEWS (Used in reviews tab)
  reviewsList: {
    type: [
      {
        id: String,
        author: String,
        rating: Number,
        comment: String,
        date: String
      }
    ],
    default: []
  },

  // AMENITIES SECTION
  amenities: { type: [String], default: [] },

  // SERVICES INCLUDED
  servicesIncluded: { type: [String], default: [] },

  // AVAILABILITY + CAPACITY
  availability: { type: Boolean, default: true },
  capacity: { type: Number, default: null }
});

export default mongoose.model("Vendor", VendorSchema);
