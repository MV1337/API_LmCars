const express = require("express");
const router = express.Router();

//middlewares
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/multer");
const cache = require("../middlewares/cache");
const validate = require("../middlewares/handleValidation");
const { createCarValidation } = require("../middlewares/carValidations");

const {
  insertCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCar,
} = require("../controllers/CarController");

router.use(cache);

router.post(
  "/create",
  authGuard,
  imageUpload.array("images"),
  createCarValidation(),
  validate,
  insertCar
);
router.get("/", getAllCars);
router.get("/search", searchCar);
router.get("/:id", getCarById);
router.put("/edit/:id", authGuard, updateCar);
router.delete("/:id", authGuard, deleteCar);

module.exports = router;
