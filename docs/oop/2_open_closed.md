# 2-1. SOLID Principles with OOP Examples

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](./oop.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)
- [FP (Functional Programming) Examples](../fp/fp.md)

## (2) Open-Closed Principle (OCP) with OOP

A module should be open for extension, but should be closed for modification.  
In another word, you should not bring in any breaking changes.

### ■ Solution

When you add a new feature, instead of fixing the existing mechanisms,
you should add a new mechanism.

### ■ Examples

#### (a) BEFORE

##### Assignment

> Fix the code so that you can apply a discount on 'price'.
> How would you do?

```ts
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
```

- [2_open_closed/oop/before.ts](../../src/2_open_closed/oop/before.ts)
  - Or, FP version:  
[2_open_closed/fp/before.js](../../src/2_open_closed/fp/before.js)


#### (b) AFTER (BAD)

You see a BAD example bellow:

```ts
class Product {
  private price: number;

  constructor(price: number) {
    this.price = price;
  }

  public getPrice(discount: number = 0): number {
    return this.price - discount;
  }
}

{
  const product = new Product(100);
  product.getPrice(15); // 85
}
```

You are making a breaking change on `getPrice`.  
Instead, you should have added a new method.

- [2_open_closed/oop/after_bad.ts](../../src/2_open_closed/oop/after_bad.ts)
  - Or, FP version:  
[2_open_closed/fp/after_bad.js](../../src/2_open_closed/fp/after_bad.js)


#### (c) AFTER (GOOD)

Instead of making a breaking change on `getPrice`,
you added `applyDiscount`.

```ts
class Product {
  private price: number;

  constructor(price: number) {
    this.price = price;
  }

  public getPrice(): number {
    return this.price;
  }

  public applyDiscount(discount: number): void {
    this.price -= discount;
  }
}

{
  const product = new Product(100);
  product.getPrice(); // 100
  product.applyDiscount(15);
  product.getPrice(); // 85
}
```

- [2_open_closed/oop/after_good.ts](../../src/2_open_closed/oop/after_good.ts)
  - Or, FP version:  
[2_open_closed/fp/after_good.js](../../src/2_open_closed/fp/after_good.js)
