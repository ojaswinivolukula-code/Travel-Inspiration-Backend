import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/destinations", destinationRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/posts", postRoutes);

app.use("/api/places", placeRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});