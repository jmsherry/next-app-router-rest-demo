import { useContext } from "react";
import Link from "next/link";
import type Car from "@/types/Car";

type CarProps = {
  car: Car;
};

import { CarsContext } from "@/components/contexts/car.context";

const CarItem = ({ car: { _id, name, bhp, avatar_url } }: CarProps) => {
  const { deleteCar } = useContext(CarsContext);
  return (
    <>
      <img src={avatar_url} alt="" width="200" />
      <dl>
        <dt>Name</dt>
        <dd>{name}</dd>
        <dt>BHP</dt>
        <dd>{bhp}</dd>
      </dl>
      <Link href={`/${_id}`}>
        View Car
      </Link>
      <Link href={`/update/${_id}`}>
        Update
      </Link>
      <button onClick={() => deleteCar(_id)}>delete</button>
    </>
  );
};

export default CarItem;
