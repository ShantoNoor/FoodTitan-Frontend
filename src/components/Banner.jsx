import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";

const Banner = () => {
  const [st, sst] = useState("");

  return (
    <Box
      sx={{
        background:
          "url(https://img.freepik.com/premium-photo/abstract-background-restaurant-concept-blurred-background-evening-food-fork-knife-cutlery-table-setting_548821-3460.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          color="white"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }}
        >
          Order Your Food Now!
        </Typography>
        <Divider color="white" />
        <Box align="left" mt={2}>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              console.log(st);
            }}
          >
            View All Food Items
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
