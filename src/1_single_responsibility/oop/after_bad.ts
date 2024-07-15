/**
 * @module solid_crockford/1_single_responsibility/oop/after_bad
 */

enum PaymentMethod {
  CreditCard = 0,
  DebitCard = 1,
  PayPal = 2,
  Combini = 3,
  CashOnDelivery = 4,
}

/**
 * SRP (Single Responsibility Principle)
 * states there should be only one reason
 * to change a module.
 *
 * If you were asked to add a new payment
 * method, it means nothing more than
 * adding a new payment method. But, with
 * the above, it clearly has an impact
 * on another part, where the fix may
 * cause the program to fail in updating
 * user's address.
 */
class Payment {
  private address: string;

  public update_address(address: string) {
    this.address = address;
  }

  public pay(method: PaymentMethod, price: number) {
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
  const payment = new Payment();
  // Updating the address
  payment.update_address('Scarsdale, New York 10583');
  // Make a payment
  payment.pay(PaymentMethod.PayPal, 14.99);
}
