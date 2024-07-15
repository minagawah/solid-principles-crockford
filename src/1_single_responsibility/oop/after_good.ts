/**
 * @module solid_crockford/1_single_responsibility/oop/after_good
 */

enum PaymentMethod {
  CreditCard = 0,
  DebitCard = 1,
  PayPal = 2,
  Combini = 3,
  CashOnDelivery = 4,
}

/*
 * To avoid the violation of SRP (Single
 * Responsibility Principle), we should
 * separate the class into 2 so that
 * each would be responsible for only
 * 1 action.
 */

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
    if (method === PaymentMethod.CreditCard) {
    }
    if (method === PaymentMethod.DebitCard) {
    }
    if (method === PaymentMethod.PayPal) {
    }
    if (method === PaymentMethod.Combini) {
    }
    if (method === PaymentMethod.CashOnDelivery) {
    }
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
