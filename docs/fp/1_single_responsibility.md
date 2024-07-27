# 2-1. SOLID Principles with FP Examples

## (1) Single Responsibility Principle (SRP) with FP

Or, see the corresponding [OOP version.](../oop/1_single_responsibility.md)

### ■ Description

There should be only one reason to change a module.  
For instance, you fixed a part in your module which manages A.  
Yet, you found out it impacted another part of the module which manages B.  
If such the case, then you are violating SRP (Single Responsibility Principle).

### ■ Solution

Split the jobs into different modules.

### ■ Examples

If you are in hurry,
you can [check out the shorter version.](#shorter_examples)

#### (a) BEFORE

This is a program for managing payment methods and address.  
You will implement corresponding methods, and see if you designed the program  
in a way which would not go against SRP (Single Responsibility Principle).

##### Assignment

> For the following context, implement:  
> 1. A method for making payments (e.g. "14.99 USD").
> 1. A method for updating address (e.g. "Scarsdale, New York 10583")  

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
    const { method } = arg;
    if (method === PaymentMethod['CreditCard']) {}
    if (method === PaymentMethod['DebitCard']) {}
    if (method === PaymentMethod['Combini']) {}
    if (method === PaymentMethod['CashOnDelivery']) {}
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

<a name="shorter_examples"></a>
### ■ SHORTER EXAMPLES

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

When fixing `pay`, it will affect `update_address`.

```js
const paymentFactory = () => {
  let _addr

  // Job #1
  const pay = arg => {
    const { method } = arg
    if (method === 'CreditCard') {}
    if (method === 'DebitCard') {}
    if (method === 'Combini') {}
    if (method === 'CashOnDelivery') {}
  };

  // Job #2
  const update_address = address => {
    _addr = address
  }

  return Object.create({
    pay,
    update_address,
    get_address: () => _addr
  })
}
```

#### GOOD

Split them into different contexts so that your fix will not affect others.

```js
// Split #1
const accountFactory = () => {
  let _addr

  const update_address = address => {
    _addr = address
  }

  return Object.create({
    update_address,
    get_address: () => _addr,
  })
}

// Split #2
const paymentFactory = () => {
  const pay = arg => {
    const { method } = arg
    if (method === 'CreditCard') {}
    if (method === 'DebitCard') {}
    if (method === 'Combini') {}
    if (method === 'CashOnDelivery') {}
  }
  return Object.create({ pay })
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
