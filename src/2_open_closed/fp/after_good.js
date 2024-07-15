/**
 * @module solid_crockford/2_open_closed/fp/after_good
 */

/**
 * @callback GetPrice
 * @returns {number}
 */

/**
 * @callback ApplyDiscount
 * @param {number} [discount=0]
 * @returns {number}
 */

/**
 * @typedef ProductContext
 * @type {Object}
 * @property {GetPrice} get_price
 * @property {ApplyDiscount} apply_discount
 */

/**
 * @function
 * @param {number} [price=0]
 * @returns {ProductContext}
 */
const productFactory = (price = 0) => {
  /** @private */
  let p = price;

  /** @type {GetPrice} */
  const get_price = () => p;

  /**
   * Instead of making a breaking
   * change on `get_price`,
   * you added `apply_discount`.
   *
   * @type {ApplyDiscount}
   */
  const apply_discount = (discount = 0) => {
    p -= discount;
    return p;
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
