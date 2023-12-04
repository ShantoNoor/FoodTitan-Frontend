import { useNavigate, useRouteError } from "react-router-dom";
import Title from "../components/Title";
import { Box, Button, CircularProgress, Container, Divider, Typography } from "@mui/material";
import { Suspense, lazy } from "react";

import Animation from "../assets/animations/error.json";
const Player = lazy(() =>
  import("@lottiefiles/react-lottie-player").then((module) => {
    return { default: module.Player };
  })
);

const ErrorPage = () => {
  const { status, statusText, ...data } = useRouteError();
  const navigate = useNavigate();

  return (
    <>
      <Title>Error</Title>
      <Container>
        <Typography variant="h1">Error {status}</Typography>
        <Typography variant="h3">{statusText + "  |  " + data.data}</Typography>
        <Divider />
        <Box sx={{mt: 2}}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Back To Home
          </Button>
        </Box>

        <Suspense
          fallback={
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          }
        >
          {
            <Player
              autoplay
              loop
              src={Animation}
              style={{ maxWidth: "450px" }}
            />
          }
        </Suspense>
      </Container>
    </>
  );
};

export default ErrorPage;
