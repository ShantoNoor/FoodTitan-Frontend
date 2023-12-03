import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { Container, Grid, IconButton, InputBase, Paper } from "@mui/material";
import RecipeReviewCard from "../components/RecipeReviewCard";
import { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const AllFoodItems = () => {
  const [search, setSearch] = useState("");
  const serachRef = useRef(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["/foods", `search=${search}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/foods?search=${search}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container sx={{ mt: 5 }}>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mx: "auto",
          mb: 5,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Food"
          inputRef={serachRef}
          defaultValue={search}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            setSearch(serachRef.current.value);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Grid container gap={5} alignItems="stretch" justifyContent="center">
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
