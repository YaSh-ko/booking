import express from "express";
import {
  getHotels,
  getInfobyID,
  roomDetails,
  searchHotels,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/details", getInfobyID);
router.get("/search", searchHotels);
router.get("/RoomDetails", roomDetails);

export default router;
