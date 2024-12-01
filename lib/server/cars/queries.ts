import { inspect } from "node:util"
import type { CarData } from "@/components/forms/car_form";
import "@/lib/db";
import CarModel from "@/lib/server/cars/model";

export const getCarsQuery = async () => {
  let result = await CarModel.find({}).exec();
  return JSON.parse(JSON.stringify(result));
};

export const getCarQuery = async (id: string) => {
  return JSON.parse(JSON.stringify(await CarModel.findById(id).lean()));
};

export const addCarQuery = async (data: CarData) => {
  if (data.avatar_url === "") {
    delete data.avatar_url;
  }

  const car = new CarModel(data);
  const newCar = await car.save();
  return newCar;
};

export const updateCarQuery = async (id: string, data: CarData) => {
  const result = await CarModel.updateOne({ _id: id }, data);
  return result;
};

export const removeCarQuery = async (id: string) => {
  const result = await CarModel.deleteOne({ _id: id });
  return result;
};
