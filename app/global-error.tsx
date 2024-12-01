"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container  from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error,
  reset: Function,
}

export default function GlobalError({ error, reset }:GlobalErrorProps) {
  // custom logic (e.g., log the error or send it to an APM service)

  return (
    <html>
      <body>
        <Container>
          <Box>
            <Alert severity="error">
              <Typography variant="h1">500</Typography>
              <Typography variant="h2">Internal Error</Typography>
            </Alert>
            <Link href={"/"}>
              Home Page
            </Link>
          </Box>
        </Container>
      </body>
    </html>
  );
}
