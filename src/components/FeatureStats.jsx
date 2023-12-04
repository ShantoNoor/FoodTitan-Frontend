import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import Stack from "@mui/material/Stack";

const FeatureStats = ({ registered, total_food_items }) => {
  return (
    <>
      <Grid container spacing={5} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={"Total Food Items"}
              subheader={""}
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  mb: 2,
                }}
              >
                <Typography component="h2" variant="h3" color="text.primary">
                  <Stack
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={4}
                  >
                    <BookmarkIcon sx={{ fontSize: "56px" }} color="primary" />
                    {total_food_items}
                  </Stack>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={"Total Registered Users"}
              subheader={""}
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  mb: 2,
                }}
              >
                <Typography component="h2" variant="h3" color="text.primary">
                  <Stack
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={4}
                  >
                    <PeopleIcon sx={{ fontSize: "56px" }} color="primary" />
                    {registered}
                  </Stack>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default FeatureStats;
