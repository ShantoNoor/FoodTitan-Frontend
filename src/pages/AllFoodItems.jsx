import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { Container, Grid } from "@mui/material";
import RecipeReviewCard from "../components/RecipeReviewCard";

const AllFoodItems = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["/foods"],
    queryFn: async () => {
      try {
        const res = await axiosn.get("/foods");
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container gap={5} alignItems='center' justifyContent='center'>
        {data.map((food) => {
          return (
            <Grid item key={food._id} xs={12} md={4} lg={3}>
              <RecipeReviewCard food={food} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default AllFoodItems;
