// Load modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// Initialize Express app
const app = express();

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to SQLite database
const dbPath = path.join(__dirname, ".database", "datasource.db");
const db = new sqlite3.Database(dbPath, (err) => {
 if (err) {
  console.error("❌ Could not open database:", err.message);
  process.exit(1); // Exit if DB fails to open
 }
 console.log("✅ Connected to SQLite database");
});

// Function to export DB data to JSON
function exportDbToJson() {
 return new Promise((resolve, reject) => {
  db.all("SELECT * FROM ea_games", (err, rows) => {
   if (err) {
    console.error("❌ Database query error:", err.message);
    return reject(err);
   }

   // Convert rows to JSON string
   const jsonString = JSON.stringify(rows, null, 2);

   // Write to public folder (accessible to frontend)
   const outputPath = path.join(__dirname, "public", "frontEndData.json");
   fs.writeFile(outputPath, jsonString, (err) => {
    if (err) {
     console.error("❌ Failed to write JSON file:", err);
     return reject(err);
    }
    console.log("✅ Database exported to public/frontEndData.json");
    resolve();
   });
  });
 });
}

// Start server AFTER data is exported
async function startServer() {
 try {
  await exportDbToJson();

  // Route for root
  app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // Optional: API endpoint (better than static JSON)
  app.get("/api/ea_games", (req, res) => {
   db.all("SELECT * FROM ea_games", (err, rows) => {
    if (err) {
     return res.status(500).json({error: err.message});
    }
    res.json(rows);
   });
  });

  //Dynamic API endpoint for filtering database while server is running
  app.get("/api/filter", (req, res) => {
   const {search, dev, series, genre, year} = req.query;

   let sql = "SELECT * FROM ea_games WHERE 1=1";
   const params = [];

   if (search) {
    sql += " AND LOWER(game_name) LIKE ?";
    params.push(`%${search.toLowerCase()}%`);
   }
   if (dev) {
    sql += " AND game_devs = ?";
    params.push(dev);
   }
   if (series) {
    sql += " AND game_series = ?";
    params.push(series);
   }
   if (genre) {
    sql += " AND game_genre = ?";
    params.push(genre);
   }
   if (year) {
    sql += " AND release_date = ?";
    params.push(year);
   }

   db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
   });
  });

  // Start listening
  const PORT = 8000;
  app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`);
   console.log(`📂 Frontend: http://localhost:${PORT}`);
   console.log(`📡 API: http://localhost:${PORT}/api/ea_games`);
  });
 } catch (error) {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
 }
}

// Handle shutdown
process.on("SIGINT", () => {
 db.close(() => {
  console.log("✅ Database connection closed");
  process.exit(0);
 });
});

// Start everything
startServer();
