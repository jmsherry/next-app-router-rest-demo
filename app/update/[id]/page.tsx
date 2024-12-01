// import { useContext } from "react";
// import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { revalidatePath } from "next/cache";
import Layout from "@/app/layout";
// import { fetchCars } from "@/lib/cars";
import CarForm from "@/components/forms/car_form";
import type Car from "@/types/Car";

import {
  updateCarQuery as updateCar,
  getCarQuery as getCar,
} from "@/lib/server/cars/queries";

const UpdateCar = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const car: Car = await getCar(id as string);

  // console.log("car", car);
  if (!car) return <p>Error: Car not found!</p>;
  return (
    <>
      <Typography variant="h3" component="h1">
        Update Car
      </Typography>
      <CarForm
        updateCar={async (id, data) => {
          "use server";
          updateCar(id, data);
          revalidatePath('/');
        }}
        car={car}
      />
    </>
  );
};

export default UpdateCar;
