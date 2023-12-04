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
import RecipeOrderCard from "../components/RecipeOrderCard";
import Title from "../components/Title";
import { useState } from "react";

const MyOrderedFoodItems = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [order_id, setOrder_id] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["/orders", `ordered_by=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/orders?ordered_by=${user._id}`);
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
      <Title>My Ordered Food Items</Title>
      <Container sx={{ mt: 2 }}>
        {data.length === 0 ?
        <Typography variant="h1">You do not have any ordered food item!</Typography> : <Grid container gap={5} alignItems="stretch" justifyContent="center">
          {data.map((order) => {
            return (
              <Grid item key={order._id} xs={12} md={4} lg={3}>
                <RecipeOrderCard food={order}>
                  <Button
                    onClick={() => {
                      setOrder_id(order._id);
                      handleClickOpen();
                    }}
                    size="large"
                  >
                    Delete
                  </Button>
                </RecipeOrderCard>
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
                await axiosn.delete(`/orders/${order_id}`);
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

export default MyOrderedFoodItems;
