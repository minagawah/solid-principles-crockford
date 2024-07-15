# 2-1. SOLID Principles with FP Examples

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](../oop/oop.md)
- [FP (Functional Programming) Examples](./fp.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)

## (1) Single Responsibility Principle (SRP) with FP

There should be only one reason to change a module.  
For instance, you fixed a part in your module which manages A.  
Yet, you found out it impacted another part in the module which manages B.  
If such the case, then you are violating SRP (Single Responsibility Principle).

### ■ Solution

Split the jobs into different modules.

### ■ Examples

#### (a) BEFORE

##### Assignment

> For the following context, implement methods:  
> 1. for updating address (e.g. "Scarsdale, New York 10583")  
> 1. for making payments (e.g. "14.99 USD").

```js
const PaymentMethod = {
  CreditCard: 0,
  DebitCard: 1,
  PayPal: 2,
  Combini: 3,
  CashOnDelivery: 4,
};

/**
 * @returns {PaymentContext}
 */
const paymentFactory = () => {};
```

- [1_single_responsibility/fp/before.js](../../src/1_single_responsibility/fp/before.js)
  - Or, OOP version:  
[1_single_responsibility/oop/before.ts](../../src/1_single_responsibility/oop/before.ts)


#### (b) AFTER (BAD)

In short, the bellow code has a problem
for having different 2 jobs within 1 context.

```js
const PaymentMethod = {
  CreditCard: 0,
  DebitCard: 1,
  PayPal: 2,
  Combini: 3,
  CashOnDelivery: 4,
};

/**
 * @returns {PaymentContext}
 */
const paymentFactory = () => {
  let _addr;

  const pay = arg => {
    const { method } = arg;
    if (method === PaymentMethod['CreditCard']) {}
    if (method === PaymentMethod['DebitCard']) {}
    if (method === PaymentMethod['Combini']) {}
    if (method === PaymentMethod['CashOnDelivery']) {}
  };

  const update_address = address => {
    _addr = address;
  };

  const get_address = _addr;

  return Object.create({
    pay,
    update_address,
    get_address,
  });
};

{
  const payment = paymentFactory();

  // Updating the address
  payment.update_address('Scarsdale, New York 10583');

  // Make a payment
  payment.pay({
    method: PaymentMethod.PayPal,
    price: 14.99,
  });
}
```

SRP (Single Responsibility Principle) states  
there should be only one reason to change a module.

If you were asked to add a new payment method,  
it means nothing more than adding a new payment method.  
But, with the above, it clearly has an impact on another part,  
where the fix may cause the program to fail in updating user's address.

- [1_single_responsibility/fp/after_bad.js](../../src/1_single_responsibility/fp/after_bad.js)
  - Or, OOP version:  
[1_single_responsibility/oop/after_bad.ts](../../src/1_single_responsibility/oop/after_bad.ts)


#### (c) AFTER (GOOD)

Instead, we should separate the context into 2 contexts  
so that each would contain only 1 action.

```js
const PaymentMethod = {
  CreditCard: 0,
  DebitCard: 1,
  PayPal: 2,
  Combini: 3,
  CashOnDelivery: 4,
};

/**
 * @returns {AccountContext}
 */
const accountFactory = () => {
  let _addr;

  const update_address = address => {
    _addr = address;
  };

  const get_address = () => _addr;

  return Object.create({
    update_address,
    get_address,
  });
};

/**
 * @returns {PaymentContext}
 */
const paymentFactory = () => {
  const pay = arg => {
    ...
    ...
  };

  return Object.create({ pay });
};

{
  // Updating the address
  const account = accountFactory();
  account.update_address('Scarsdale, New York 10583');

  // Make a payment
  const payment = paymentFactory();

  payment.pay({
    account,
    method: PaymentMethod.PayPal,
    price: 14.99,
  });
}
```

- [1_single_responsibility/fp/after_good.js](../../src/1_single_responsibility/fp/after_good.js)
  - Or, OOP version:  
[1_single_responsibility/oop/after_good.ts](../../src/1_single_responsibility/oop/after_good.ts)
