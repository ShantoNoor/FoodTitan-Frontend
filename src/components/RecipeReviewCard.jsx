import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { CardHeader, Divider, Stack } from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function RecipeReviewCard({ children, food }) {
  return (
    <Card>
      <CardHeader subheader={food.category} />
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={food.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {food.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "justify" }}
        >
          {food.description.slice(0, 200) + "...."}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" color="text.secondary">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <AttachMoneyIcon /> Price: {food.price}
            </Stack>
          </Typography>
          <Typography variant="body" color="text.secondary">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <ReorderIcon /> Quantity: {food.quantity}
            </Stack>
          </Typography>
        </Stack>
      </CardContent>
      <Divider variant="middle" />
      <CardActions>{children}</CardActions>
    </Card>
  );
}
