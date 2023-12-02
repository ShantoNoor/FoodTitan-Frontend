import Box from "@mui/material/Box";
import Banner from "../components/Banner";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home | FoodTitan");
  return (
    <>
      <Banner />
      <Box my={8}></Box>
    </>
  );
};

export default Home;
