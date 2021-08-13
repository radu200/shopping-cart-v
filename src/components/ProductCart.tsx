import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VitaminImage from '../assets/vitamin.jpg'
import * as types from '../types';
import { addZeroes } from '../utils'

interface IProduct {
  product: types.CartProduct,
  currency: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ProductCart({ product, currency, onClick }: IProduct) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          height="140"
          image={VitaminImage}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="body1">
            Price: {addZeroes(product.totalPrice)} {currency}
          </Typography>
          <Typography gutterBottom variant="body1">
            Quantity: {product.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={onClick} fullWidth variant='contained' size="small" color="primary" disableElevation>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}