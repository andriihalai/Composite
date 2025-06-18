abstract class AbstractProduct {
  abstract name: string;
  abstract get price(): number;
}

class Product extends AbstractProduct {
  constructor(public name: string, private _price: number) {
    super();
  }

  get price(): number {
    return this._price;
  }
}

class Collection extends AbstractProduct {
  name: string;
  products: Set<AbstractProduct>;

  constructor(name: string, ...products: AbstractProduct[]) {
    super();
    this.name = name;
    this.products = new Set(products);
  }

  get price(): number {
    let total = 0;
    for (const product of this.products) {
      total += product.price;
    }
    return total;
  }
}

const p1 = new Product('Laptop', 1500);
const p2 = new Product('Mouse', 25);
const p3 = new Product('Keyboard', 100);
const p4 = new Product('HDMI cable', 10);
const electronics = new Collection('Electronics', p1, p2, p3, p4);

const p5 = new Product('Bag', 50);
const p6 = new Product('Mouse pad', 5);
const textile = new Collection('Textile', p5, p6);

const purchase = new Collection('Purchase', electronics, textile);

console.dir(purchase, { depth: null });
console.log(`Total is ${purchase.price}`);
