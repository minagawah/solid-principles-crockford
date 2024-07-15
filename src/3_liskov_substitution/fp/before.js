/**
 * @module solid_crockford/3_liskov_substitution/fp/before
 */

/**
 * @template T
 * @typedef Args
 * @type {Array.<T>}
 */

/**
 * @callback Add
 * @param {Args<number>} args
 * @returns {number}
 */

/**
 * @typedef PersonContext
 * @type {Object}
 * @property {string} [context]
 * @property {Add} add
 */

/**
 * @function
 * @returns {PersonContext}
 */
/* eslint-disable-next-line no-unused-vars */
const personFactory = () => {
  /**
   * @private
   * @type {function(Args<number>):number}
   */
  const simple_math = args => args[0] + args[1];

  return Object.create({
    context: 'PersonContext',
    add: simple_math,
  });
};

/**
 * Customize `PersonContext` to create
 * `EmployeeContext` which aims to
 * manage ideal employees for a company.
 * They should be skillfull at using
 * Excel for calculations. With
 * `EmployeeContext` we should be able
 * to create `accountant` instance.
 *
 * Also, create `DeveloperContext` using
 * which we would be able to create
 * `developer` who may be terrible
 * at Excel, but good at other means for
 * calculating numbers.
 *
 * @function
 */
/* eslint-disable-next-line no-unused-vars */
const employeeFactory = () => {};

/**
 * Also, create `DeveloperContext` with
 * which we would create `developer` who
 * is not good at using Excel, but
 * something else.
 *
 * @function
 */
/* eslint-disable-next-line no-unused-vars */
const developerFactory = () => {};
