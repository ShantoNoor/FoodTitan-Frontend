import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "./Link";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Copyright from "./Copyright";

const LogoIcon = styled(ShoppingBagIcon)();
const logoText = "FoodTitan";

const Footer = () => {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");

  const { pathname } = useLocation();

  return (
    <Box
      py={2}
      sx={{
        background:
          pathname === "/"
            ? "linear-gradient(rgba(1, 1, 1, 0.4), rgba(5, 5, 5, 0.7)), url(https://m.media-amazon.com/images/S/pv-target-images/19c674f4de2c2394472bffcb167afecd2f13beb8749beaf541c3895a99cd43f5.jpg)"
            : "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Stack direction={{ md: "row" }} gap={5} my={2}>
          <Box flex={1}>
            <Box
              display={"flex"}
              gap={1}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <LogoIcon
                onClick={navigateHome}
                cursor={"pointer"}
                sx={{
                  fontSize: { xs: "3rem" },
                  color: pathname === "/" ? "white" : "black",
                  textShadow:
                    pathname === "/" ? "2px 2px 4px rgba(0, 0, 0, .75)" : "",
                }}
              />
              <Typography
                variant="h6"
                mb={1}
                fontSize={{ xs: "2rem" }}
                onClick={navigateHome}
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: pathname === "/" ? "white" : "black",
                  textDecoration: "none",
                  flexGrow: 1,
                  textShadow:
                    pathname === "/" ? "2px 2px 4px rgba(0, 0, 0, .75)" : "",
                }}
              >
                {logoText}
              </Typography>
            </Box>

            <Stack
              direction={"row"}
              divider={
                <Divider color="black" orientation="vertical" flexItem />
              }
              gap={1}
            >
              <Link to="/" underline={"hover"}>
                Home
              </Link>
              <Link underline={"hover"}>About</Link>
              <Link underline={"hover"}>Contact Us</Link>
            </Stack>
          </Box>
          <Box flex={2}>
            <Box>
              <TextField
                size="small"
                variant="filled"
                fullWidth
                label="Email"
                id="fullWidth"
              />
            </Box>
            <Box align="center" mt={1}>
              <Button variant="contained">Subscribe to Newletter</Button>
            </Box>
          </Box>
          <Box flex={1}>
            <Typography
              variant="h6"
              mb={1}
              color={pathname === "/" ? "white" : "black"}
              sx={{
                textShadow:
                  pathname === "/" ? "2px 2px 4px rgba(0, 0, 0, .75)" : "",
              }}
            >
              Social Links
            </Typography>
            <Stack
              direction={"row"}
              gap={1}
              divider={
                <Divider color="black" orientation="vertical" flexItem />
              }
            >
              <Link to="https://google.com">
                <GoogleIcon />
              </Link>
              <Link to="https://facebook.com">
                <FacebookIcon />
              </Link>
              <Link to="https://linkedin.com">
                <LinkedInIcon />
              </Link>
              <Link to="https://instagram.com">
                <InstagramIcon />
              </Link>
            </Stack>
          </Box>
        </Stack>
        <Divider color="black" />
        <Copyright my={3} />
      </Container>
    </Box>
  );
};

export default Footer;
