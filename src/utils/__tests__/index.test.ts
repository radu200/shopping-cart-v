import * as utils from "../";

describe("Build Cart", () => {
  it(" should add new product to empty cart", () => {
    const newProduct = {
      name: "vitamin-a",
      price: 6,
      nutrients: [
        {
          amount: 800,
          id: "vitamin-a",
        },
      ],
    };

    const output = [
      {
        name: "vitamin-a",
        price: 6,
        quantity: 1,
        totalPrice: 6,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
    ];

    expect(utils.buildCart([], newProduct)).toEqual(output);
  });
  it("should add new product to cart with existing products", () => {
    const cartProducts = [
      {
        name: "vitamin-a",
        price: 6,
        quantity: 2,
        totalPrice: 12,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
    ];

    const newProduct = {
      name: "vitamin-c",
      price: 6,
      nutrients: [
        {
          amount: 800,
          id: "vitamin-c",
        },
      ],
    };

    const output = [
      {
        name: "vitamin-a",
        price: 6,
        quantity: 2,
        totalPrice: 12,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
      {
        name: "vitamin-c",
        price: 6,
        quantity: 1,
        totalPrice: 6,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-c",
          },
        ],
      },
    ];

    expect(utils.buildCart(cartProducts, newProduct)).toEqual(output);
  });

  it("should change quantity to existing product", () => {
    const cartProducts = [
      {
        name: "vitamin-a",
        price: 6,
        quantity: 2,
        totalPrice: 12,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
    ];

    const newProduct = {
      name: "vitamin-a",
      price: 6,
      nutrients: [
        {
          amount: 800,
          id: "vitamin-a",
        },
      ],
    };

    const output = [
      {
        name: "vitamin-a",
        price: 6,
        quantity: 3,
        totalPrice: 18,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
    ];

    expect(utils.buildCart(cartProducts, newProduct)).toEqual(output);
  });
});

describe("Remove from cart", () => {
  it("should remove item from cart", () => {
    const cartProducts = [
      {
        name: "vitamin_a",
        price: 6,
        quantity: 2,
        totalPrice: 12,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
    ];

    const productId = "vitamin_a";

    expect(utils.removeProduct(cartProducts, productId)).toEqual([]);
  });
});

describe("Decimals", () => {
  it("should add zero to decimal", () => {
    const num = 4.5;
    const output = "4.50";
    expect(utils.addZeroes(num)).toEqual(output);
  });

  it("should limit to two decimals and round up 1 decimal", () => {
    const num = 4.5557777;
    const output = "4.56";
    expect(utils.addZeroes(num)).toEqual(output);
  });

  it("should limit to two decimals", () => {
    const num = 4.555;
    const output = "4.55";
    expect(utils.addZeroes(num)).toEqual(output);
  });
});

describe("Cart total", () => {
  it("should output total price and total quantity of products", () => {
    const cartProducts = [
      {
        name: "vitamin_a",
        price: 6,
        quantity: 2,
        totalPrice: 12,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
      {
        name: "vitamin_c",
        price: 12,
        quantity: 2,
        totalPrice: 24,
        nutrients: [
          {
            amount: 800,
            id: "vitamin_c",
          },
        ],
      },
    ];

    const output = { totalPrice: 36, totalQuantity: 4 };

    expect(utils.getTotal(cartProducts)).toEqual(output);
  });
});

describe("Cart allowance", () => {
  const configProducts = [
    {
      id: "vitamin-a",
      amount: 1500,
      unit: "mcg",
    },
    {
      id: "vitamin-c",
      amount: 1000,
      unit: "mg",
    },
    {
      id: "vitamin-d",
      amount: 75,
      unit: "mcg",
    },
    {
      id: "vitamin-e",
      amount: 540,
      unit: "mg",
    },
    {
      id: "zinc",
      amount: 25,
      unit: "mg",
    },
  ];

  it("Should be falsy", () => {
    const cartProducts = [
      {
        name: "Vitamin A",
        price: 6,
        quantity: 1,
        totalPrice: 6,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
      {
        name: "Vitamins A, C & E",
        price: 10.0,
        quantity: 1,
        totalPrice: 10,
        nutrients: [
          {
            id: "vitamin-a",
            amount: 800,
          },
          {
            id: "vitamin-c",
            amount: 500,
          },
          {
            id: "vitamin-e",
            amount: 500,
          },
        ],
      },
    ];

    expect(utils.checkVitaminsLimit(cartProducts, configProducts)).toBeFalsy();
  });

  it("Should be truthy", () => {
    const cartProducts = [
      {
        name: "Vitamin A",
        price: 6,
        quantity: 1,
        totalPrice: 6,
        nutrients: [
          {
            amount: 800,
            id: "vitamin-a",
          },
        ],
      },
      {
        name: "Vitamin C and Zinc",
        price: 5.6,
        quantity: 1,
        totalPrice: 5.6,
        nutrients: [
          {
            id: "vitamin-c",
            amount: 500,
          },
          {
            id: "zinc",
            amount: 15,
          },
        ],
      },
    ];

    expect(utils.checkVitaminsLimit(cartProducts, configProducts)).toBeTruthy();
  });
});
