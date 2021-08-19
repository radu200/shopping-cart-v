import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Spinner from '../components/progress/Spinner';
import Product from '../components/Product'
import ProductCart from '../components/ProductCart'
import * as types from '../types';
import { addZeroes } from '../utils'

interface IProductsPage {
  products: Array<types.Product>
  cart: types.Cart
  currency: string
  removeFromCart: (productId: string) => void
  addToCart: (product: types.Product) => void
  spinner: boolean,
  error: string

}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 960,
    margin: "0 auto",
    marginTop: 50
  },
  productsContainer: {
    marginTop: 50
  }
}));

export default function ProductsPage({ currency, products, cart, addToCart, removeFromCart, spinner, error }: IProductsPage) {
  const classes = useStyles();
  return (

    <div className={classes.root}>
      <Typography gutterBottom variant="h5" component="h4">
        Basket - Quantity: {cart.totalQuantity} Price: {addZeroes(cart.totalPrice)} {currency}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          {!cart.products.length && "Add products to cart"}
        </Grid>
        {cart.products.map(product => (
          <Grid key={product.name} item xs={12} md={4}>
            <ProductCart onClick={() => removeFromCart(product.name)} product={product} currency={currency} />
          </Grid>
        ))}
      </Grid>
      {spinner ? <Spinner /> :
        <div className={classes.productsContainer}>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography gutterBottom variant="h5" component="h4">
            Products
          </Typography>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid key={product.name} item xs={12} md={4}>
                <Product onClick={() => addToCart(product)} product={product} currency={currency} />
              </Grid>
            ))}
          </Grid>
        </div>
      }
    </div>
  );
}