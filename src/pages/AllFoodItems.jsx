import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import RecipeReviewCard from "../components/RecipeReviewCard";
import { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const AllFoodItems = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const serachRef = useRef(null);
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["/foods", `search=${search}`, `page=${page}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/foods?search=${search}&page=${page}`);
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
    <Title>All Food Items</Title>
      <Container sx={{ mt: 2 }}>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mx: "auto",
            mb: 5,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Food"
            inputRef={serachRef}
            defaultValue={search}
            onKeyUp={(e) => {
              if (e.key === "Enter") setSearch(serachRef.current.value);
            }}
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
          {data[0].map((food) => {
            return (
              <Grid item key={food._id} xs={12} md={4} lg={3}>
                <RecipeReviewCard food={food}>
                  <Button
                    onClick={() => navigate(`/single-food-item/${food._id}`)}
                    size="large"
                  >
                    Details
                  </Button>
                </RecipeReviewCard>
              </Grid>
            );
          })}
        </Grid>
        <Stack justifyContent="center" alignItems="center" mt={5}>
          <Pagination
            count={Math.ceil(data[1] / 9)}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
      </Container>
    </>
  );
};

export default AllFoodItems;
