/**
 * @module solid_crockford/2_open_closed/oop/before
 */

/**
 * Let's apply a discount on price.
 * How would you do?
 */
export class Product {
  private price: number;

  constructor(price: number) {
    this.price = price;
  }

  public getPrice() {
    return this.price;
  }
}

{
  const product = new Product(100);
  product.getPrice(); // --> 100
}
