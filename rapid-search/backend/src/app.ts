import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import stripeRoutes from "./routes/subscription.routes";
const connectDb = require("./config/mongoose.config");

const app = express();

// MiddleWare
app.use(express.json());
app.use(cors());

//MongoDB Connection
connectDb();

// Routes
app.use("/api", userRoutes);
app.use("/stripe", stripeRoutes);

export default app;
