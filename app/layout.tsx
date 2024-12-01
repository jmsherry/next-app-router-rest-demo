import Head from "next/head";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "../components/header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <CssBaseline />
      <body>
        <Header />

        <Box component="main" sx={{ mt: 5 }} >
          <Container>{children}</Container>
        </Box>
      </body>
    </html>
  );
};

export default Layout;
