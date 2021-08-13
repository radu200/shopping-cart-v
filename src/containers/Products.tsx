import { useEffect, useState } from "react"
import * as API from '../api/Products';
import ProductsPage from '../pages/Products';
import * as types from '../types';
import { buildCart, removeProduct, getTotal, checkVitaminsLimit } from '../utils';


interface IState {
  products: Array<types.Product>
  configProducts: Array<types.ConfigProduct>
  currency: string,
  spinner: boolean,
  error: string
  cart: types.Cart
}

export default function Products() {
  const [state, setState] = useState<IState>({
    products: [],
    configProducts: [],
    currency: "",
    spinner: true,
    error: "",
    cart:
    {
      products: [],
      totalQuantity: 0,
      totalPrice: 0,
    }
  })


  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setState(state => ({ ...state, spinner: true }))
      const res = await API.getProducts()
      if (res.status === 200) {
        const { products, config } = res.data;
        setState(state => ({ ...state, products, currency: config.currency, configProducts: config.tolerableUpperLimits, spinner: false }))
      }
    } catch (err) {
      setState(state => ({ ...state, spinner: false }))
    }
  }

  async function addToCart(product: types.Product) {
    const products = buildCart(state.cart.products, product)
    const isAllowed = checkVitaminsLimit(products, state.configProducts)
    if (!isAllowed) {
      setState(state => ({
        ...state, error: "Sorry this product is not allowed"
      }))

      return
    }

    const total = getTotal(products)
    setState(state => ({
      ...state, cart: {
        ...state.cart,
        totalQuantity: total.totalQuantity,
        totalPrice: total.totalPrice, products: products
      }
    }))
  }

  function removeFromCart(productId: string) {
    const products = removeProduct(state.cart.products, productId)
    const total = getTotal(products)
    setState(state => ({
      ...state, cart: {
        ...state.cart,
        totalQuantity: total.totalQuantity,
        totalPrice: total.totalPrice,
        products: products
      }
    }))
  }

  return <ProductsPage
    currency={state.currency}
    products={state.products}
    cart={state.cart}
    addToCart={addToCart}
    removeFromCart={removeFromCart}
    spinner={state.spinner}
    error={state.error}
  />
}