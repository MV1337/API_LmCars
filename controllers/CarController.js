const Car = require("../models/Car");
const fs = require("fs");

const mongoose = require("mongoose");

const insertCar = async (req, res) => {
  const { brand, model, version, color, motor, transmission, year, km, price } =
    req.body;

  let images = req.files;

  if (images.length <= 0) {
    res.status(422).json({ errors: ["Fotos do carro são obrigatórias!"] });
    return;
  }

  const car = new Car({
    brand,
    model,
    version,
    color,
    motor,
    transmission,
    year,
    km,
    price,
    images: [],
  });

  images.map((image) => {
    car.images.push(image.filename);
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCars = async (req, res) => {
  const cars = await Car.find({})
    .sort([["createdAt", -1]])
    .exec();

  res.status(200).json(cars);
};

const getCarById = async (req, res) => {
  const { id } = req.params;

  const car = await Car.findById(mongoose.Types.ObjectId(id));

  if (!car) {
    res.status(404).json({ errors: ["Carro não encontrado!"] });
    return;
  }

  res.status(200).json(car);
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  const car = await Car.findById(mongoose.Types.ObjectId(id));

  if (!car) {
    res.status(422).json({ errors: ["Carro não encontrado!"] });
    return;
  }

  if (price) {
    car.price = price;
  }

  await car.save();
  res.status(200).json({ message: "Preço atualizado com sucesso" });
};

const deleteCar = async (req, res) => {
  const { id } = req.params;

  const car = await Car.findById(mongoose.Types.ObjectId(id));

  if (!car) {
    res.status(404).json({ errors: ["Carro não encontrado!"] });
    return;
  }

  car.images.forEach((image) => {
    fs.unlink(`public/images/cars/${image}`, function (err) {
      if (err) throw err;
      console.log("DELETE");
    });
  });

  await Car.findByIdAndDelete(car._id);
  res.status(200).json({ message: "Carro removido com sucesso!" });
};

const searchCar = async (req, res) => {
  const { q } = req.query;

  const cars = await Car.find({ name: new RegExp(q, "i") }).exec();

  res.status(200).json(cars);
};

module.exports = {
  insertCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCar,
};
