interface Nutrients {
  amount: number;
  id: string;
}

export interface Product {
  name: string;
  price: number;
  nutrients: Array<Nutrients>;
}

export interface CartProduct extends Product {
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  products: Array<CartProduct> | [];
  totalQuantity: number;
  totalPrice: number;
}

export interface ConfigProduct {
  id: string;
  amount: number;
  unit: string;
}
