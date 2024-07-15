# 2-1. SOLID Principles with OOP Examples

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](./oop.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)
- [FP (Functional Programming) Examples](../fp/fp.md)

## (1) Single Responsibility Principle (SRP) with OOP

There should be only one reason to change a module.  
For instance, you fixed a part in your module which manages A.  
Yet, you found out it impacted another part in the module which manages B.  
If such the case, then you are violating SRP (Single Responsibility Principle).

### ■ Solution

Split the jobs into different modules.

### ■ Examples

#### (a) BEFORE

##### Assignment

> For the following class, implement methods:  
> 1. for updating address (e.g. "Scarsdale, New York 10583")  
> 1. for making payments (e.g. "14.99 USD").

```ts
enum PaymentMethod {
  CreditCard = 0,
  DebitCard = 1,
  PayPal = 2,
  Combini = 3,
  CashOnDelivery = 4,
}

class Payment {}
```

- [1_single_responsibility/oop/before.ts](../../src/1_single_responsibility/oop/before.ts)
  - Or, FP version:  
[1_single_responsibility/fp/before.js](../../src/1_single_responsibility/fp/before.js)


#### (b) AFTER (BAD)

In short, the bellow code has a problem
for having 2 different jobs within 1 class.

```ts
enum PaymentMethod {
  CreditCard = 0,
  DebitCard = 1,
  PayPal = 2,
  Combini = 3,
  CashOnDelivery = 4,
}

class Payment {
  private address: string;

  public update_address(address: string) {
    this.address = address;
  }

  public pay(method: PaymentMethod, price: number) {
    if (method === PaymentMethod.CreditCard) {}
    if (method === PaymentMethod.DebitCard) {}
    if (method === PaymentMethod.PayPal) {}
    if (method === PaymentMethod.Combini) {}
    if (method === PaymentMethod.CashOnDelivery) {}
  }
}

{
  const payment = new Payment();

  // Updating the address
  payment.update_address('Scarsdale, New York 10583');

  // Make a payment
  payment.pay(PaymentMethod.PayPal, 14.99);
}
```

SRP (Single Responsibility Principle) states  
there should be only one reason to change a module.

If you were asked to add a new payment method,  
it means nothing more than adding a new payment method.  
But, with the above, it clearly has an impact on another part,  
where the fix may cause the program to fail in updating user's address.

[1_single_responsibility/oop/after_bad.ts](../../src/1_single_responsibility/oop/after_bad.ts)
  - Or, FP version:  
[1_single_responsibility/fp/after_bad.js](../../src/1_single_responsibility/fp/after_bad.js)


#### (c) AFTER (GOOD)

Instead, we should separate the class into 2 classes  
so that each would contain only 1 action.

```ts
enum PaymentMethod {
  CreditCard = 0,
  DebitCard = 1,
  PayPal = 2,
  Combini = 3,
  CashOnDelivery = 4,
}

// Here's the first class.
class Account {
  private address: string;

  public update_address(address: string) {
    this.address = address;
  }
}

// Here's the second class.
class Payment {
  public pay(
    account: Account,
    method: PaymentMethod,
    price: number
  ) {
    ...
    ...
  }
}

{
  // Updating the address
  const account = new Account();
  account.update_address('Scarsdale, New York 10583');

  // Make a payment
  const payment = new Payment();
  payment.pay(account, PaymentMethod.PayPal, 14.99);
}
```

[1_single_responsibility/oop/after_good.ts](../../src/1_single_responsibility/oop/after_good.ts)
  - Or, FP version:  
[1_single_responsibility/fp/after_good.js](../../src/1_single_responsibility/fp/after_good.js)
