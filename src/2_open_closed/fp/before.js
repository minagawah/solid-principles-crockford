/**
 * @module solid_crockford/2_open_closed/fp/before
 */

/**
 * @callback GetPrice
 */

/**
 * @typedef ProductContext
 * @type {Object}
 * @property {GetPrice} get_price
 */

/**
 * Let's apply a discount on price.
 * How would you do?
 *
 * @function
 * @param {number} [price=0]
 * @returns {ProductContext}
 */
const productFactory = (price = 0) => {
  /** @private */
  let _price = price;

  /** @type {GetPrice} */
  const get_price = () => _price;

  return Object.create({ get_price });
};

{
  const product = productFactory(100);
  product.get_price(); // 100
}
