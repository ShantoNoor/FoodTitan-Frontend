import Box from "@mui/material/Box";
import Banner from "../components/Banner";
import Title from "../components/Title";
import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import {
  Button,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FeatureStats from "../components/FeatureStats";
import RecipeTopCard from "../components/RecipeTopCard";

const Home = () => {
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["/home"],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/home`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <Title>Home</Title>
      <Banner />
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Top Selling Food Items
        </Typography>
        <Divider />
        <Grid
          container
          sx={{ mt: 2 }}
          gap={2}
          alignItems="stretch"
          justifyContent="center"
        >
          {data.top_food.map((food) => {
            return (
              <Grid item key={food._id} xs={12} md={4} lg={3}>
                <RecipeTopCard food={food}>
                  <Button
                    onClick={() => navigate(`/single-food-item/${food._id}`)}
                    size="large"
                  >
                    Details
                  </Button>
                </RecipeTopCard>
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{ textAlign: "center", mt:2 }}>
          <Button variant="outlined" size="large" onClick={() => navigate('/all-food-items')}>
            See All
          </Button>
        </Box>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Our Food Gallery
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageList
            sx={{ width: 500, height: 450 }}
            variant="woven"
            cols={3}
            gap={8}
          >
            {data.images.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  srcSet={`${item.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.image}?w=161&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <Typography variant="h4" sx={{ mt: 4 }}>
          Stats
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box mb={4}>
          <FeatureStats
            registered={data.registered}
            total_food_items={data.total_food_items}
          />
        </Box>
      </Container>
    </>
  );
};

export default Home;
