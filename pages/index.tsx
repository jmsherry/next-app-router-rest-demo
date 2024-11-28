import { useContext, useEffect } from "react";
import Layout from "@/components/layout";
import CarItem from "@/components/car";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { CarsContext } from "@/components/contexts/car.context";
import Link from "next/link";

import type Car from "@/types/Car";

const Cars = ({ serverData }: { serverData: Array<Car> }) => {
  const { loading, error, cars, fetchCars, deleteCar } =
    useContext(CarsContext);
  console.log("context cars", cars);

  let data = cars;
  // add a bit for SSR
  if (typeof window === "undefined") {
    console.log("SSR cars", serverData);
    data = serverData;
  }

  // console.log('final cars', data);

  // Rehydrate on Client-side
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Layout>
      <h1>Cars App</h1>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error.message}</p>}
      {!loading && !error && data && !data.length && <p>You have no cars</p>}
      {!loading && !error && data && (
        <List>
          {data.map(({ name, bhp, avatar_url, _id }) => (
            <ListItem key={_id}>
              <ListItemAvatar>
                <Avatar alt="" src={avatar_url} />
              </ListItemAvatar>
              <ListItemText>
                {name} (BHP: {bhp})
              </ListItemText>
              <IconButton
                aria-label="update"
                href={`/update/${_id}`}
                component={Link}
                passHref
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => deleteCar(_id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        // <ul>
        //   {data.map((car: Car) => (
        //     <li key={car._id}>
        //       <CarItem car={car} />
        //     </li>
        //   ))}
        // </ul>
      )}
    </Layout>
  );
};

export default Cars;

/****************************************************************
 * Static Site Generation
 ****************************************************************/
import { getCars } from "@/lib/cars/queries";

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const cars = await getCars();
  return {
    props: {
      serverData: JSON.parse(JSON.stringify(cars)),
    },
  };
}
