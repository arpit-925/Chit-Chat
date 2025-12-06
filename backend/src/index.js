// backend/src/index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// derive __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// health check for render
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);


// safe PORT fallback
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // serve static frontend files
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // SPA fallback middleware (avoids using route strings like '*' or '/*')
  app.use((req, res, next) => {
    // Only handle GET requests and non-API routes
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api")) return next();

    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"), (err) => {
      if (err) {
        console.error("Error sending index.html:", err);
        next(err);
      }
    });
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT: " + PORT);
  connectDB();
});
