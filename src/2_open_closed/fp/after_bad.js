/**
 * @module solid_crockford/2_open_closed/fp/after_bad
 */

/**
 * @callback GetPrice
 * @param {number} [discount=0]
 * @returns {number}
 */

/**
 * @typedef ProductContext
 * @type {Object}
 * @property {GetPrice} get_price
 */

/**
 * @function
 * @param {number} [price=0]
 * @returns {ProductContext}
 */
const productFactory = (price = 0) => {
  /** @private */
  let p = price;

  /**
   * Violating OCP because you are
   * bringing in a breaking change to
   * `get_price`. Instead, you should
   * have added a new method.
   *
   * @type {GetPrice}
   */
  const get_price = (discount = 0) => {
    p -= discount;
    return p;
  };

  return Object.create({ get_price });
};

{
  const product = productFactory(100);
  product.get_price(15); // 85
}
