// import { useContext, useEffect } from "react";
// import Layout from "@/app/layout";
import { revalidatePath } from "next/cache";
import CarItem from "@/components/car";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {
  getCarsQuery as getCars,
  removeCarQuery as deleteCar,
} from "@/lib/server/cars/queries";

import type Car from "@/types/Car";

const Cars = async () => {
  const data: Array<Car> = await getCars();
  console.log("list data", data);
  return (
    <>
      <Typography component="h1" variant="h3">
        List
      </Typography>
      {data && Array.isArray(data) && !data.length && (
        <Typography>You have no cars</Typography>
      )}
      {data && Array.isArray(data) && (
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
                aria-label="view"
                href={`/${_id}`}
                component={Link}
                passHref
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                aria-label="update"
                href={`/update/${_id}`}
                component={Link}
                passHref
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={async () => {
                  "use server";
                  deleteCar(_id);
                  revalidatePath("/");
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Cars;
