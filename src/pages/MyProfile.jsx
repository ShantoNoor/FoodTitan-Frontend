import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import SelectFormField from "../components/SelectFormField";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { axiosn } from "../hooks/useAxios";
import axios from "axios";
import useTitle from "../hooks/useTitle";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const delivery_man_options = [{ value: "delivery_man", label: "Delivery Man" }];

const user_options = [
  { value: "user", label: "User" },
  ...delivery_man_options,
];

const admin_options = [{ value: "admin", label: "Admin" }, ...user_options];

const MyProfile = () => {
  useTitle("My Profile");
  const { user, updateProfile, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  const uploadPhoto = (photo) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", photo);
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_apiKey_imagebb
          }`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            const photoUrl = response.data.data.url;
            return resolve(photoUrl);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          return reject(error);
        });
    });
  };

  const formSubmit = async (data) => {
    const { photo, ...rest } = data;
    let photoUrl = user.photo ? user.photo : "";
    if (photo.length) {
      photoUrl = await uploadPhoto(photo[0]);
    }
    rest.photo = photoUrl;
    rest._id = user._id;

    try {
      await Promise.all([
        await updateProfile(rest.name, rest.photo),
        axiosn.put(`/users`, rest),
      ]);

      setUser({ ...rest });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("status", user.status);
  }, [user, setValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(formSubmit)}
      sx={{ mt: 1, width: "100%" }}
    >
      <Stack spacing={2}>
        <Box>
          <TextField
            variant="standard"
            fullWidth
            label="Name"
            autoFocus
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name shoud have at least 3 characters",
              },
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

        <Box>
          <TextField
            variant="standard"
            fullWidth
            label="Email Address"
            autoComplete="email"
            InputProps={{ readOnly: true }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                message: "Enter a valid email.",
              },
            })}
          />
          <Typography
            component={"p"}
            color={"error"}
            role="alert"
            fontSize={"14px"}
          >
            {errors?.email?.message}
          </Typography>
        </Box>

        <Box>
          <TextField
            variant="standard"
            fullWidth
            label="Phone Number"
            type="tel"
            {...register("phone", {
              required: "Phone Number is required",
              pattern: {
                value: /^\d{6,14}$/,
                message: "Enter a valid phone number.",
              },
            })}
          />
          <Typography
            component={"p"}
            color={"error"}
            role="alert"
            fontSize={"14px"}
          >
            {errors?.phone?.message}
          </Typography>
        </Box>

        <Box>
          <SelectFormField
            control={control}
            name={"status"}
            label={"Profile Status"}
            options={
              user.status === "admin"
                ? admin_options
                : user.status === "user"
                ? user_options
                : delivery_man_options
            }
          />
        </Box>

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          Upload Profile Picture
          <VisuallyHiddenInput type="file" {...register("photo")} />
        </Button>

        <Button type="submit" fullWidth variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default MyProfile;
