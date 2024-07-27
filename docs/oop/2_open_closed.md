# 2-2. SOLID Principles with OOP Examples

## (2) Open-Closed Principle (OCP) with OOP

Or, see the corresponding [FP version.](../fp/2_open_closed.md)

### ■ Description

A module should be open for extension, but should be closed for modification.  
In another word, you should not bring in any breaking changes.

### ■ Solution

When you add a new feature, instead of fixing the existing mechanisms,
you should add a new mechanism.

### ■ Examples

If you are in hurry,
you can [check out the shorter version.](#nutshell)

#### (a) BEFORE

This is a program for managing product's price.  
For this time, you will need to apply a discount.

##### Assignment

> Fix the code so that you can apply a discount on `price`.
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

  // Why bringing in
  // changes?
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


<a name="nutshell"></a>
### ■ NUTSHELL

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

You are breaking `getPrice`.

```js
class Product {
  private price

  constructor(price) {
    this.price = price
  }

  // Why bringing in
  // changes?
  public getPrice(discount) {
    return this.price - discount
  }
}
```

#### GOOD

Add a new method, `applyDiscount` instead.

```js
class Product {
  private price

  constructor(price) {
    this.price = price
  }

  public getPrice() {
    return this.price
  }

  public applyDiscount(discount) {
    this.price -= discount
  }
}
```

Do you see how they differ?

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](./index.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)
- [FP (Functional Programming) Examples](../fp/index.md)
