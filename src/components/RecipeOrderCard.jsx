import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { CardHeader, Divider, Stack } from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import moment from "moment";

export default function RecipeOrderCard({ children, food: order }) {
  return (
    <Card>
      <CardHeader subheader={order.category} />
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={order.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {order.name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Single Item Price: ${order.price}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Seller: {order.created_by.name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Order Date: {moment(order.created_at).format("MMMM DD, YYYY")}
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
              <AttachMoneyIcon />
              Total Price: {order.total_price}
            </Stack>
          </Typography>
          <Typography variant="body" color="text.secondary">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <ReorderIcon /> Buying Quantity: {order.buying_quantity}
            </Stack>
          </Typography>
        </Stack>
      </CardContent>
      <Divider variant="middle" />
      <CardActions>{children}</CardActions>
    </Card>
  );
}
