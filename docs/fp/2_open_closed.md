# 2-1. SOLID Principles with FP Examples

## (2) Open-Closed Principle (OCP) with FP

Or, see the corresponding [OOP version.](../oop/2_open_closed.md)

### ■ Description

A module should be open for extension, but should be closed for modification.  
In another word, you should not bring in any breaking changes.

### ■ Solution

When you add a new feature, instead of fixing the existing mechanisms,
you should add a new mechanism.

### ■ Examples

If you are in hurry,
you can [check out the shorter version.](#shorter_examples)

#### (a) BEFORE

This is a program for managing product's price.  
For this time, you are applying a discount.

##### Assignment

> Fix the code so that you can apply a discount on `price`.
> How would you do?

```js
/**
 * @returns {ProductContext}
 */
const productFactory = (price = 0) => {
  let _price = price;
  const get_price = () =>  _price;
  return Object.create({ get_price });
};


{
  const product = productFactory(100);
  product.get_price(100); // 100
}
```

- [2_open_closed/fp/before.js](../../src/2_open_closed/fp/before.js)
  - Or, OOP version:  
[2_open_closed/oop/before.ts](../../src/2_open_closed/oop/before.ts)


#### (b) AFTER (BAD)

You see a BAD example bellow:

```js
/**
 * @returns {ProductContext}
 */
const productFactory = (price = 0) => {
  let _price = price;

  // Why bringing in
  // changes?
  const get_price = (discount = 0) => {
    _price -= discount;
    return _price;
  };

  return Object.create({ get_price });
};


{
  const product = productFactory(100);
  product.get_price(15); // 85
}
```

You are making a breaking change on `get_price`.  
Instead, you should have added a new method.

- [2_open_closed/fp/after_bad.js](../../src/2_open_closed/fp/after_bad.js)
  - Or, OOP version:  
[2_open_closed/oop/after_bad.ts](../../src/2_open_closed/oop/after_bad.ts)


#### (c) AFTER (GOOD)

Instead of making a breaking change on `get_price`,
you added `apply_discount`.

```js
/**
 * @returns {ProductContext}
 */
const productFactory = (price = 0) => {
  let _price = price;

  const get_price = () => _price;

  // A method dedicated for the feature.
  const apply_discount = (discount = 0) => {
    _price -= discount;
    return _price;
  };

  return Object.create({
    get_price,
    apply_discount,
  });
};

{
  const product = productFactory(100);
  product.get_price(); // 100
  product.apply_discount(15);
  product.get_price(); // 85
}
```

- [2_open_closed/fp/after_good.js](../../src/2_open_closed/fp/after_good.js)
  - Or, OOP version:  
[2_open_closed/oop/after_good.ts](../../src/2_open_closed/oop/after_good.ts)

<a name="shorter_examples"></a>
### ■ SHORTER EXAMPLES

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

You are breaking `get_price`.

```js
const productFactory = (price = 0) => {
  let _price = price

  // Why bringing in
  // changes?
  const get_price = (discount = 0) => {
    _price -= discount
    return _price
  }

  return Object.create({
    get_price,
  })
}
```

#### GOOD

Add a new method, `apply_discount` instead.

```js
const productFactory = (price = 0) => {
  let _price = price

  const get_price = () => _price

  // New method!
  const apply_discount = (discount = 0) => {
    _price -= discount
    return _price
  };

  return Object.create({
    get_price,
    apply_discount
  })
}
```

Do you see how they differ?

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](../oop/index.md)
- [FP (Functional Programming) Examples](./index.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)

