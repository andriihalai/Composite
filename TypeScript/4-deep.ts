type Product = {
  name: string;
  price: number;
};

type NestedOrder = Product | NestedOrder[] | { [key: string]: NestedOrder };

const calculateTotal = (order: NestedOrder) => {
  const items = Array.isArray(order) ? order : Object.values(order);
  return items.reduce((sum, item) => {
    if (typeof item.price === 'number') return sum + item.price;
    else return sum + calculateTotal(item);
  }, 0);
};

const purchase: NestedOrder = [
  {
    Electronics: {
      Computers: [
        { name: 'Laptop', price: 1500 },
        { name: 'Desktop', price: 1200 },
      ],
      Accessories: [
        { name: 'Mouse', price: 25 },
        { name: 'Keyboard', price: 100 },
        { name: 'Webcam', price: 50 },
        [
          { name: 'HDMI cable', price: 10 },
          { name: 'USB Hub', price: 20 },
        ],
      ],
    },
    Textile: [
      { name: 'Bag', price: 50 },
      { name: 'Mouse pad', price: 5 },
      { name: 'Laptop Sleeve', price: 20 },
    ],
  },
  { name: 'T-shirt', price: 15 },
  { name: 'Cap', price: 12 },
  { name: 'Jacket', price: 60 },
];

const main = async () => {
  try {
    console.dir(purchase, { depth: null });
    const total = calculateTotal(purchase);
    console.log({ total });
  } catch (err) {
    console.error(err);
  }
};

main();
