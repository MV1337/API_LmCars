const mongoose = require("mongoose");
const { Schema } = mongoose;

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    motor: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    km: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
