import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "../components/Link";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider, Stack } from "@mui/material";
import SocialLogin from "../components/SocialLogin";
import Animation from "../assets/animations/sign-in.json";

import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Player = React.lazy(() =>
  import("@lottiefiles/react-lottie-player").then((module) => {
    return { default: module.Player };
  })
);

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { signIn } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formSubmit = (data) => {
    signIn(data.email, data.password).then(() => {
      if (state?.pathname) {
        navigate(state.pathname, {
          state: { title: state.title },
        });
      } else {
        navigate("/");
      }
    });
  };

  return (
    <>
      <Title>Sign In</Title>
      <Grid container component="main">
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <React.Suspense
            fallback={
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            }
          >
            {
              <Player
                autoplay
                loop
                src={Animation}
                style={{ height: "100%", width: "100%" }}
              />
            }
          </React.Suspense>
        </Grid>

        <Grid item xs={12} sm={12} md={5} elevation={6} square="true">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(formSubmit)}
              sx={{ mt: 1, width: "100%" }}
            >
              <Stack spacing={1}>
                <Box>
                  <TextField
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
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
                  <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password shoud have at least 6 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/,
                          message:
                            "Password shoud contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                        },
                      })}
                    />
                  </FormControl>
                  <Typography
                    component={"p"}
                    color={"error"}
                    role="alert"
                    fontSize={"14px"}
                  >
                    {errors?.password?.message}
                  </Typography>
                </Box>
              </Stack>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                {...register("tct")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} variant="middle">
                OR
              </Divider>
              <SocialLogin />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
