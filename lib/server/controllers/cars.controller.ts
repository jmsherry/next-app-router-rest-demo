import Car from "../models/car.model";
import {NextApiRequest, NextApiResponse} from 'next'

export const getCars = async (req:NextApiRequest, res:NextApiResponse) => {
  // Does not work locally but will on Vercel
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

  let query:{_id?:string} = {};

  const { carId: id } = req.query;

  if (id) {
    query._id = (id as string);
  }

  try {
    const cars = await Car.find(query).exec();
    return res.status(200).send(cars);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const addCar = async (req:NextApiRequest, res:NextApiResponse) => {
  const carData = req.body;

  if (carData.avatar_url && carData.avatar_url.startsWith("data:image")) {
    return res.status(400).send("NO_DATA_URIS_FOR_AVATAR");
  }

  if (!carData.name) {
    return res.status(400).send("NO_NAME_PROVIDED");
  }

  if (!carData.bhp) {
    return res.status(400).send("NO_BHP_PROVIDED");
  }

  if (carData.avatar_url === "") {
    delete carData.avatar_url;
  }

  try {
    const car = new Car(carData);
    const newCar = await car.save();
    return res.status(201).send(newCar);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const updateCar = async (req:NextApiRequest, res:NextApiResponse) => {
  const updateData = req.body;
  console.log(`Updating ${req.query.id}`, updateData);

  if (updateData.avatar_url && updateData.avatar_url.startsWith("data:image")) {
    return res.status(400).send("NO_DATA_URIS_FOR_AVATAR");
  }

  const isEmpty =
    req.body && // 👈 null and undefined check
    Object.keys(req.body).length === 0 &&
    Object.getPrototypeOf(req.body) === Object.prototype;

  if (isEmpty) {
    return res.status(400).send("No update data provided");
  }
  
  const { carId: id } = req.query;

  try {
    const result = await Car.updateOne({ _id: id }, updateData);
    console.log("result", result);
    if (result.matchedCount === 0) return res.status(404).send("NOT FOUND");
    res.status(200).send("OK");
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const removeCar = async (req:NextApiRequest, res:NextApiResponse) => {
  const { carId: id } = req.query;
  console.log("carToBeDeleted", id);
  try {
    const result = await Car.deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).send("NOT FOUND");
    console.log("🚀 ~ file: cars.controller.js ~ line 84 ~ result", result);
    res.status(204).send("NO CONTENT");
  } catch (err) {
    return res.status(500).send(err);
  }
};
