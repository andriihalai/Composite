/* 
  Even though the calculateTotal function cares about the type of the order (node)
  and does not rely on polymorphism, it still follows the Composite spirit.
  We keep our nodes (items) in a structured way and do not rely too much on the type of the node.
  That's a trade-off of using object literals instead of classes.
*/


interface BaseNode {
  name: string;
}

interface Product extends BaseNode {
  price: number;
}

interface Group extends BaseNode {
  children: Item[];
}

type Item = Product | Group;

const calculateTotal = (order: Item): number => {
  if ('price' in order) {
    return order.price;
  }

  return order.children.reduce((sum, child) => sum + calculateTotal(child), 0);
};

const purchase: Item = {
  name: 'Root',
  children: [
    {
      name: 'Electronics',
      children: [
        {
          name: 'Computers',
          children: [
            { name: 'Laptop', price: 1500 },
            { name: 'Desktop', price: 1200 },
          ],
        },
        {
          name: 'Accessories',
          children: [
            { name: 'Mouse', price: 25 },
            { name: 'Keyboard', price: 100 },
            { name: 'Webcam', price: 50 },
            {
              name: 'Cables',
              children: [
                { name: 'HDMI cable', price: 10 },
                { name: 'USB Hub', price: 20 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Textile',
      children: [
        { name: 'Bag', price: 50 },
        { name: 'Mouse pad', price: 5 },
        { name: 'Laptop Sleeve', price: 20 },
      ],
    },
    { name: 'T-shirt', price: 15 },
    { name: 'Cap', price: 12 },
    { name: 'Jacket', price: 60 },
  ],
};

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
