import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import culinaryRoutes from "./routes/culinaryRoutes.js";
import tripItemsRoutes from "./routes/TripItemRoutes.js";
import DealRoutes from "./routes/DealRoutes.js";
import socialShareRoutes from "./routes/socialShareRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors({
  origin: [
    'https://travelinspirationapp.netlify.app',
    'http://localhost:5173'  
  ],
  credentials: true
}));
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/culinary", culinaryRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/trip-items", tripItemsRoutes);
app.use("/api/deals", DealRoutes);
app.use("/api/social-shares", socialShareRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
