/**
 * @module solid_crockford/2_open_closed/oop/after_bad
 */

class Product {
  private price: number;

  constructor(price: number) {
    this.price = price;
  }

  /**
   * Violating OCP because you are
   * bringing in a breaking change to
   * `getPrice`. Instead, you should
   * have added a new method.
   */
  public getPrice(discount: number = 0): number {
    return this.price - discount;
  }
}

{
  const product = new Product(100);
  product.getPrice(15); // 85
}
