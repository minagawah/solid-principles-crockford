/**
 * @module solid_crockford/1_single_responsibility/fp/after_bad
 */

const PaymentMethod = {
  CreditCard: 0,
  DebitCard: 1,
  PayPal: 2,
  Combini: 3,
  CashOnDelivery: 4,
};

/**
 * @typedef PaymentMethodValues
 * @type {import('../../d.ts/types.d.ts').ValueOf<PaymentMethod>}
 */

/**
 * @callback UpdateAddress
 * @param {string} address
 */

/**
 * @callback GetAddress
 * @returns {string}
 */

/**
 * @callback Pay
 * @param {Object} args
 * @param {PaymentMethodValues} args.method
 * @param {number} args.price
 */

/**
 * @typedef PaymentContext
 * @type {Object}
 * @property {UpdateAddress} update_address
 * @property {GetAddress} get_address
 * @property {Pay} pay
 */

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
 *
 * @function
 * @returns {PaymentContext}
 */
const paymentFactory = () => {
  /** @private */
  let _addr;

  /** @type {Pay} */
  const pay = arg => {
    const { method } = arg;

    /* eslint-disable */
    if (method === PaymentMethod['CreditCard']) {
    }
    if (method === PaymentMethod['DebitCard']) {
    }
    if (method === PaymentMethod['Combini']) {
    }
    if (method === PaymentMethod['CashOnDelivery']) {
    }
    /* eslint-enable */
  };

  /**
   * @type {UpdateAddress}
   */
  const update_address = address => {
    _addr = address;
  };

  /**
   * @type {GetAddress}
   */
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
