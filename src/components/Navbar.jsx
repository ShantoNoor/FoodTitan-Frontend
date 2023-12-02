import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import useAuth from "../hooks/useAuth";
import UserAvater from "./UserAvater";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const LogoIcon = styled(FastfoodIcon)();
const logoText = "FoodTitan";

const pages = [
  ["Home", "/"],
  ["All Food Items", "/all-food-items"],
  ["Blog Page", "/blog-page"],
];

const authPages = [
  ["Sing In", "/sign-in"],
  ["Sing Up", "/sign-up"],
];

const settings = [
  ["My Added Food Items", "/my-added-food-items"],
  ["Add Food Item", "/add-food-item"],
  ["My Ordered Food Items", "/my-ordered-food-items"],
  ["Sign Out", "/sign-out"],
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateHome = () => navigate("/");

  const { user } = useAuth();

  let [renderPages, setRenderPages] = React.useState([]);

  React.useEffect(() => {
    if (user) {
      setRenderPages([...pages]);
    } else {
      setRenderPages([...pages, ...authPages]);
    }
  }, [user]);

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters={true}>
          <LogoIcon
            onClick={navigateHome}
            cursor={"pointer"}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            onClick={navigateHome}
            cursor={"pointer"}
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            {logoText}
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {renderPages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page[1]);
                  }}
                  selected={pathname === page[1]}
                >
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LogoIcon
            onClick={navigateHome}
            cursor={"pointer"}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              flexGrow: { xs: 0, sm: 0 },
            }}
          />
          <Typography
            variant="h5"
            noWrap
            onClick={navigateHome}
            cursor={"pointer"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {logoText}
          </Typography>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              gap: "5px",
              marginRight: "5px",
            }}
          >
            {renderPages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(page[1])}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  ":hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                  backgroundColor:
                    pathname === page[1] ? "rgba(0,0,0,0.04)" : "",
                  textTransform: "capitalize",
                }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Show Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <UserAvater size={32} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box textAlign={"center"}>
                  <Typography
                    variant="h6"
                    component="span"
                    // color={deepOrange[500]}
                    p={2}
                  >
                    {user.name}
                  </Typography>
                  <Divider variant="middle" />
                </Box>

                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(setting[1]);
                    }}
                    selected={pathname === setting[1]}
                  >
                    <Typography textAlign="center">{setting[0]}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
