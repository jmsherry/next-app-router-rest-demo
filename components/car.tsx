import Link from "next/link";
import type Car from "@/types/Car";
import { removeCarQuery as deleteCar } from "@/lib/server/cars/queries";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type CarProps = {
  car: Car;
};

const CarItem = ({ car: { _id, name, bhp, avatar_url } }: CarProps) => {
  return (
    <>
      <img src={avatar_url} alt="" width="200" />
      <Box component="dl">
        <Box sx={{ display: "flex" }}>
          <Box component="dt">Name</Box>
          <Box component="dd">{name}</Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box component="dt">BHP</Box>
          <Box component="dd">{bhp}</Box>
        </Box>
      </Box>
      {/* <Link href={`/${_id}`}>View Car</Link> */}
      <Link href={`/update/${_id}`}>Update</Link>
      <Button
        onClick={async () => {
          "use server";
          deleteCar(_id);
        }}
      >
        delete
      </Button>
    </>
  );
};

export default CarItem;
