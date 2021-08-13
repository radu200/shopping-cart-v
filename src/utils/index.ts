import * as types from "../types";

export function buildCart(
  products: Array<types.CartProduct> | [],
  newProduct: types.Product
) {
  //if there is no prodcuts in the cart
  if (!products.length) {
    return [
      {
        ...newProduct,
        quantity: 1,
        totalPrice: newProduct.price,
      },
    ];
  }

  //if there is prodcuts in the cart but new product is not in the cart
  const productExist = products.filter(
    (product) => product.name === newProduct.name
  );

  if (!productExist.length) {
    return [
      ...products,
      {
        ...newProduct,
        quantity: 1,
        totalPrice: newProduct.price,
      },
    ];
  }
  //if the new product is in the cart
  const product = products.map((product) => {
    if (product.name === newProduct.name) {
      const quantity = product.quantity + 1;
      const totalPrice = product.price * quantity;
      return {
        ...product,
        quantity,
        totalPrice,
      };
    }
    return product;
  });
  return product;
}

export function removeProduct(
  products: Array<types.CartProduct>,
  productId: string
) {
  return products.filter((product) => product.name !== productId);
}

export function addZeroes(num: number) {
  return num.toFixed(2);
}
export function getTotal(products: Array<types.CartProduct>) {
  const totalPrice = products.reduce(
    (accumulator, current) => accumulator + current.totalPrice,
    0
  );

  const totalQuantity = products.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0
  );

  return { totalPrice, totalQuantity };
}

export function checkVitaminsLimit(
  products: Array<types.CartProduct>,
  configProducts: Array<types.ConfigProduct>
) {
  const vitamins = groupVitamin(products);

  let isAllowed = true;
  for (const [key, value] of Object.entries(vitamins)) {
    configProducts.forEach((confProduct) => {
      if (key === confProduct.id && value.totalAmount > confProduct.amount) {
        isAllowed = false;
        return false;
      }
    });
  }

  return isAllowed;
}

function groupVitamin(products: Array<types.CartProduct>) {
  const groupVitamins: Record<string, any> = {};
  products.forEach((product) =>
    product.nutrients.forEach((vitamin) => {
      let obj = groupVitamins;
      if (!obj[vitamin.id]) {
        obj[vitamin.id] = {
          id: vitamin.id,
          amount: vitamin.amount,
          quantity: product.quantity,
        };
      } else {
        obj[vitamin.id].quantity = obj[vitamin.id].quantity + 1;
      }
      obj[vitamin.id].totalAmount =
        obj[vitamin.id].quantity * obj[vitamin.id].amount;
    })
  );
  return groupVitamins;
}
