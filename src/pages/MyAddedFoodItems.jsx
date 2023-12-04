import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import RecipeReviewCard from "../components/RecipeReviewCard";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { useState } from "react";

const MyAddedFoodItems = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [food_id, setFood_id] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["/foods", `created_by=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/foods?created_by=${user._id}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    enabled: !!user._id,
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>My Added Food Items</Title>
      <Container sx={{ mt: 5 }}>
        {data[0].length === 0 ?
        <Typography variant="h1">You have not added any food item!</Typography> : <Grid container gap={5} alignItems="stretch" justifyContent="center">
          {data[0].map((food) => {
            return (
              <Grid item key={food._id} xs={12} md={4} lg={3}>
                <RecipeReviewCard food={food}>
                  <Button
                    size="large"
                    onClick={() => navigate(`/update-food-item/${food._id}`)}
                  >
                    Update
                  </Button>

                  <Button
                    onClick={() => {
                      setFood_id(food._id);
                      handleClickOpen();
                    }}
                    size="large"
                  >
                    Delete
                  </Button>
                </RecipeReviewCard>
              </Grid>
            );
          })}
        </Grid>}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={async () => {
              try {
                await axiosn.delete(`/foods/${food_id}`);
                await refetch();
                handleClose();
              } catch (err) {
                console.error(err);
              }
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyAddedFoodItems;
