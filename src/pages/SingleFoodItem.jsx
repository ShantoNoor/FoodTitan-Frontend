import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Spinner from "../components/Spinner";
import { Button } from "@mui/material";

const SingleFoodItem = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: [`/foods`, `_id=${_id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/foods?_id=${_id}`);
        return res.data[0][0];
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      <Box align="center">
        <img
          style={{ objectFit: "cover" }}
          width={"100%"}
          height={300}
          src={data.image}
        />
      </Box>
      <Box>
        <Typography variant="h3" component="h1">
          {data.name}
        </Typography>
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={<Divider color="black" orientation="vertical" flexItem />}
        spacing={1}
        my={2}
      >
        <Typography variant="h6" component="p">
          Category: {data.category}
        </Typography>
        <Typography variant="h6" component="p">
          Price: ${data.price}
        </Typography>
        <Typography variant="h6" component="p">
          Made By: {data.created_by.name}
        </Typography>
        <Typography variant="h6" component="p">
          Origin: {data.origin}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => navigate(`/food-purchase-page/${data._id}`)}
          >
            Order Now
          </Button>
        </Box>
      </Stack>
      <Box mb={3}>
        <Typography variant="h6" component="p">
          Description
        </Typography>
        <Divider />
        <Typography variant="body1">{data.description}</Typography>
      </Box>
    </Container>
  );
};

export default SingleFoodItem;
