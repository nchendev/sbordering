import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderDev(props) {
  const taxRate = 0.09;
  const classes = useStyles();
  const calcSubtotal = () => {
    let subtotal = 0;
    props.order.forEach((orderItem) => {
      subtotal += parseInt(orderItem.amount) * parseInt(orderItem.price);
    });
    return subtotal;
  };

  const calcTax = () => {
    let tax = calcSubtotal() * taxRate;
    return tax;
  };

  const calcDeliveryFee = () => {
    if (props.pd == 2) {
      return 3;
    } else {
      return 0;
    }
  };

  const calcTotal = () => {
    let subtotal = calcSubtotal();
    let tax = calcTax();
    let fee = calcDeliveryFee();
    let total = subtotal + tax + fee;
    props.handlePriceChange("subtotal", subtotal.toFixed(2));
    props.handlePriceChange("tax", tax.toFixed(2));
    props.handlePriceChange("fee", fee.toFixed(2));
    props.handlePriceChange("total", total.toFixed(2));

    return total;
  };

  return (
    <div>
      <List disablePadding>
        {props.order.map((orderItem, itemIndex) => (
          <ListItem className={classes.listItem} key={orderItem.english}>
            <ListItemText
              primary={orderItem.english}
              secondary={orderItem.note}
            />
            <Typography variant='body2'>
              {orderItem.amount} x ${orderItem.price}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary='Estimated Subtotal' />
          <Typography variant='subtitle1' className={classes.total}>
            ${calcSubtotal()}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Estimated Tax' />
          <Typography variant='subtitle1' className={classes.total}>
            ${calcTax()}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Estimated Delivery Fee' />
          <Typography variant='subtitle1' className={classes.total}>
            ${calcDeliveryFee()}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Estimated Total' />
          <Typography variant='subtitle1' className={classes.total}>
            ${calcTotal()}
          </Typography>
        </ListItem>
      </List>
    </div>
  );
}
