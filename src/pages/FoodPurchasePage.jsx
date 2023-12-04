import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import Spinner from "../components/Spinner";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { DateField } from "@mui/x-date-pickers";
import moment from "moment";
import Title from "../components/Title";

const FoodPurchasePage = () => {
  const { _id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({});

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        image: data.image || "",
        category: data.category || "",
        price: data.price || 0,
        quantity: data.quantity || 0,
        buying_quantity: 1,
        origin: data.origin || "",
        user_email: user.email || "",
        user_name: user.name || "",
      });
    }
  }, [data, reset, user]);

  const mutation = useMutation({
    mutationKey: ["/orders"],
    mutationFn: async (data) => {
      try {
        const res = await axiosn.post(`/orders`, data);
        if (res.status === 201) {
          toast.success("Food Order Successful");
        }
      } catch (err) {
        toast.error("Unable to Order Food");
        console.error(err);
      }
    },
  });

  const formSubmit = async (fromData) => {
    if (fromData.quantity === 0) {
      toast.error("There is no food in stock at this moment");
      return;
    }
    if (fromData.quantity < fromData.buying_quantity) {
      toast.error("Don't have enough food in stock at this moment");
      return;
    }

    fromData.created_by = data.created_by._id;
    fromData.ordered_by = user._id;
    fromData.food_id = _id;

    await mutation.mutate(fromData);
    await queryClient.invalidateQueries(["/orders", `ordered_by=${user._id}`]);
    navigate("/my-ordered-food-items");
  };

  const watch_price = watch("price");
  const watch_quantity = watch("buying_quantity");

  useEffect(() => {
    if (watch_price && watch_quantity)
      setValue("total_price", watch_price * parseInt(watch_quantity));
  }, [watch_price, watch_quantity, setValue]);

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>Food Purchase Page</Title>
      <Container>
        {user._id === data.created_by._id ? (
          <Typography variant="h1">
            You can not buy your own food item!
          </Typography>
        ) : (
          <>
            <Box align="center" mt={2}>
              <img
                style={{ objectFit: "cover" }}
                width={"100%"}
                height={300}
                src={data.image}
              />
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit(formSubmit)}
              sx={{ mt: 3, width: "100%" }}
            >
              <Stack spacing={2}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Food Name"
                      autoFocus
                      InputProps={{
                        readOnly: true,
                      }}
                      type="text"
                      {...register("name", {
                        required: "Food Name is required",
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.name?.message}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Food Category"
                      InputProps={{
                        readOnly: true,
                      }}
                      type="text"
                      {...register("category", {
                        required: "Food Category is required",
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.category?.message}
                    </Typography>
                  </Box>

                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Food Quantity Available in Stock"
                      InputProps={{
                        readOnly: true,
                      }}
                      type="number"
                      {...register("quantity", {
                        required: "Food Quantity is required",
                        min: {
                          value: 0,
                          message: "Food Quantity must be greater than 0",
                        },
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.quantity?.message}
                    </Typography>
                  </Box>

                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Food Price"
                      InputProps={{
                        readOnly: true,
                      }}
                      type="number"
                      {...register("price", {
                        required: "Food Price is required",
                        min: {
                          value: 0,
                          message: "Food Price must be greater than 0",
                        },
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.price?.message}
                    </Typography>
                  </Box>

                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Food Origin"
                      InputProps={{
                        readOnly: true,
                      }}
                      type="text"
                      {...register("origin", {
                        required: "Food Origin is required",
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.origin?.message}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Buyer Name"
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register("user_name")}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.user_name?.message}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Buyer Email Address"
                      autoComplete="email"
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register("user_email")}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.user_email?.message}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Buying Food Quantity"
                      type="number"
                      {...register("buying_quantity", {
                        required: "Buying Food Quantity is required",
                        min: {
                          value: 0,
                          message:
                            "Buying Food Quantity must be greater than 0",
                        },
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.buying_quantity?.message}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Total Price"
                      type="number"
                      InputProps={{ readOnly: true }}
                      {...register("total_price")}
                    />
                  </Box>
                  <DateField
                    label="Order Date"
                    readOnly={true}
                    defaultValue={moment(Date.now())}
                  />
                </Stack>
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Purchase
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default FoodPurchasePage;
