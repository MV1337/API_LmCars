const express = require("express");
const router = express.Router();

router.use("/api/admin", require("./UserRoutes"));
router.use("/api/cars", require("./CarRoutes"));

router.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = router;
