import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { axiosn } from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Title from "../components/Title";

const AddFoodItem = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      user_name: user.name,
      user_email: user.email,
    },
  });

  const mutation = useMutation({
    mutationKey: ["/foods"],
    mutationFn: async (data) => {
      try {
        const res = await axiosn.post("/foods", data);
        if (res.status === 201) {
          toast.success("Food Added Successfully");
          reset();
        }
      } catch (err) {
        toast.error("Unable to Add Food");
        console.error(err);
      }
    },
  });

  const formSubmit = async (data) => {
    data.created_by = user._id;
    mutation.mutate(data);
  };

  return (
    <>
      <Title>Add Food Item</Title>
      <Container>
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

              <Box flex={1}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Food Image"
                  type="text"
                  {...register("image", {
                    required: "Food Image is required",
                  })}
                />
                <Typography
                  component={"p"}
                  color={"error"}
                  role="alert"
                  fontSize={"14px"}
                >
                  {errors?.image?.message}
                </Typography>
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Box flex={1}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Food Category"
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
                  label="Food Quantity"
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
                  label="Your Name"
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
                  label="Your Email Address"
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
                  label="Food Short Description"
                  multiline
                  rows={4}
                  type="text"
                  {...register("description", {
                    required: "Food Short Description is required",
                  })}
                />
                <Typography
                  component={"p"}
                  color={"error"}
                  role="alert"
                  fontSize={"14px"}
                >
                  {errors?.description?.message}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AddFoodItem;
