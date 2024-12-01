// import React, { useContext, useEffect } from "react";
// import { useRouter } from "next/server";
import CarItem from "@/components/car";
import type Car from "@/types/Car";
import Typography from "@mui/material/Typography";
import { getCarQuery as getCar } from "@/lib/server/cars/queries";

async function SingleCar({ params }: { params: { id: string } }) {
  const { id } = await params;
  const car: Car = await getCar(id as string);

  return (
    <>
      {/* <Typography variant="h3" component="h1">Car</Typography> */}
      {!car && <Typography>Car with id {id} not found</Typography>}

      {car && <CarItem car={car} />}
    </>
  );
}

export default SingleCar;
