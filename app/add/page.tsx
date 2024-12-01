import { revalidatePath } from "next/cache";
import CarForm from "@/components/forms/car_form";
import Typography from "@mui/material/Typography";

import { addCarQuery as addCar } from "@/lib/server/cars/queries";

const Cars = () => {
  return (
    <>
      <Typography variant="h3" component="h1">
        Add a Car
      </Typography>
      <CarForm
        addCar={async (data) => {
          "use server";
          addCar(data);
          revalidatePath("/");
        }}
      />
    </>
  );
};

export default Cars;
