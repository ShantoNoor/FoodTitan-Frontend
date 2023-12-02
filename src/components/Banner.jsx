import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Button, Divider } from "@mui/material";

const Banner = () => {
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
          variant="h3"
          component="h1"
          color="white"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }}
        >
          Order Food Now!
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="white"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }}
          mb={3}
        >
          Discover local favorites, place orders effortlessly, and indulge in a
          <br />
          hassle-free dining experience with Food Titan.
        </Typography>
        <Divider color="white" />
        <Box align="left" mt={2}>
          <Button size="large" variant="contained">
            View All Food Items
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
