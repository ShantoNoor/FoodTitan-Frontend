import { Avatar } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { deepOrange } from "@mui/material/colors";

const UserAvater = ({ size }) => {
  const { user } = useAuth();
  return (
    <Avatar
      sx={{ width: size, height: size, bgcolor: deepOrange[500] }}
      alt={user.name}
      src={user.photo || user.name}
    />
  );
};

export default UserAvater;
