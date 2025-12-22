import express from "express";
import {
  createBooking,
  deleteBooking,
  myBookings,
  Payment,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMidleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.post("/deleteBooking", authMiddleware, deleteBooking);
router.get("/myBookings", authMiddleware, myBookings);
router.post("/Payment", Payment);

export default router;
