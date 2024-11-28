import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { CarsContext } from "@/components/contexts/car.context";
import CarItem from "@/components/car";
import Layout from "@/components/layout";
import type Car from "@/types/Car";

function SingleCar({ serverData }:{ serverData:Car}) {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, cars, fetchCars } = useContext(CarsContext);
  let car = null;
  if (typeof window === "undefined") {
    car = serverData;
  } else {
    car = cars.find(({ _id }) => _id === id);
  }

  console.log({ loading, error, car });

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Layout>
      <h1>Car</h1>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error.message}</p>}
      {!loading && !error && car && <CarItem car={car} />}
      {!loading && !error && !car && <p>Car with id {id} not found</p>}
    </Layout>
  );
}

export default SingleCar;

/****************************************************************
 * Static Site Generation
 ****************************************************************/
import { getCar, getCars } from "@/lib/cars/queries";

// This function gets called at build time
export async function getStaticProps({ params }:{ params:{ id: string } }) {
  const car = await getCar(params.id);
  return {
    props: {
      serverData: JSON.parse(JSON.stringify(car)),
    },
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const cars = await getCars();
  // Get the paths we want to pre-render based on cars
  const paths = cars.map((car: Car) => ({
    params: { id: car._id.toString() },
  }));
  console.log("paths", paths);

  return { paths, fallback: "blocking" };
}
