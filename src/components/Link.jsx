import { Link as RouterLink } from "react-router-dom";
import MuiLink from "@mui/material/Link";

const Link = ({ children, underline, to }) => {
  return (
    <RouterLink to={to} style={{textDecoration: 'none'}}>
      <MuiLink component='span' underline={underline}>{children}</MuiLink>
    </RouterLink>
  );
};

export default Link;
