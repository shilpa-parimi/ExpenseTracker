require("dotenv").config();
const express = require("express");
const { connect } = require("mongoose");
const path = require("path");

(async () => {
  const app = express();
  const port = process.env.PORT || 5050;

  // database connection
  connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ connected to db");

  // middlewares
  app.use(express.json()); // parse raw json bodies
  if (process.env.NODE_ENV === "development")
    app.use(
      require("cors")({
        origin: "http://localhost:3000",
      })
    );

  // routes
  app.use("/api", require("./routes"));

  // serve frontend
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "dist")));
    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "client", "dist/index.html"));
    });
  }

  await new Promise((resolve) => app.listen(port, resolve));
  console.log(`✅ connected to app on port ${port}`);
})();
