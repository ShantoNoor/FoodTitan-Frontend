import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosn } from "../hooks/useAxios";

const SocialLogin = () => {
  const { googlePopUp, setUser } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    if (state?.pathname) {
      return navigate(state.pathname, {
        state: { title: state.title },
      });
    } else {
      return navigate("/");
    }
  };

  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={async () => {
          try {
            const user = await googlePopUp();
            const data = {
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
            };
            const result = await axiosn.post("/users", data);
            setUser(result);
          } catch (err) {
            if (err.response.status !== 409) {
              console.error(err);
            }
          } finally {
            redirectAfterLogin();
          }
        }}
      >
        Sign in with Google
      </Button>
    </Stack>
  );
};

export default SocialLogin;
