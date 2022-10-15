import {Container, CssBaseline} from "@mui/material";
import React from "react";
import AppToolbar from "../AppToolbar/AppToolbar";


const Layout = ({children}) => {
  return (
    <>
      <CssBaseline/>
      <AppToolbar/>
      <main>
        <Container maxWidth='xl'>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;