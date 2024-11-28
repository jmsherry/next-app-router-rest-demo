import "../db";
import CarModel from "../server/models/car.model";

export const getCars = async () => {
  return await CarModel.find({}).exec();
};
export const getCar = async (id: string) => {
  return await CarModel.findById(id);
};
