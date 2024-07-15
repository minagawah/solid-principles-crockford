/**
 * @module solid_crockford/1_single_responsibility/fp/after_good
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

/*
 * To avoid the violation of SRP (Single
 * Responsibility Principle), we should
 * separate the class into 2 so that
 * each would be responsible for only
 * 1 action.
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
 * @typedef AccountContext
 * @type {Object}
 * @property {UpdateAddress} update_address
 * @property {GetAddress} get_address
 */

/**
 * @function
 * @returns {AccountContext}
 */
const accountFactory = () => {
  /**
   * @private
   * @type {string}
   */
  let _addr;

  /**
   * @type {UpdateAddress}
   */
  const update_address = address => {
    _addr = address;
  };

  /**
   * @type {GetAddress}
   */
  const get_address = () => _addr;

  return Object.create({ update_address, get_address });
};

/**
 * @callback Pay
 * @param {Object} args
 * @param {AccountContext} args.account
 * @param {PaymentMethodValues} args.method
 * @param {number} args.price
 */

/**
 * @typedef PaymentContext
 * @type {Object}
 * @property {Pay} pay
 */

/**
 * @function
 * @returns {PaymentContext}
 */
const paymentFactory = () => {
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
