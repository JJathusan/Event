import express from "express";
import {
  signupCustomer,
  signupVendor,
  loginUser
} from "../controllers/authController.js";

const router = express.Router();

// CUSTOMER SIGNUP
router.post("/signup/customer", signupCustomer);

// VENDOR SIGNUP
router.post("/signup/vendor", signupVendor);

// LOGIN FOR ANY ROLE
router.post("/login", loginUser);

export default router;
