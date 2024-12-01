"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ErrorProps {
  error: Error,
  reset: Function,
}

export default function Error({ error, reset }:ErrorProps) {
  // custom logic (e.g., log the error or send it to an APM service)

  return (
    <Alert severity="error">
      <Typography>Oops! Something went wrong...</Typography>
      <Typography>{error.message}</Typography>
      <Box>
        <Button onClick={() => reset()}>
          🔄 Retry!
        </Button>
      </Box>
    </Alert>
  );
}
