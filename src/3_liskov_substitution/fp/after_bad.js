/**
 * @module solid_crockford/3_liskov_substitution/fp/after_bad
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

/*
 * Union in JSDOC!!!!
 * Having 'jsdoc-plugin-intersection'
 * allows you to convert '&' of TS
 * into '|' of JSDoc.
 */

/**
 * @typedef {PersonContext & {}} EmployeeContext
 */

/**
 * @function
 * @returns {EmployeeContext}
 */
const employeeFactory = () => {
  /**
   * Employee is sophisticated enough
   * to use Excel.
   *
   * @private
   * @type {function(Args<number>):number}
   */
  const excel = args => args[0] + args[1];

  /** @type {PersonContext} */
  const person = personFactory();

  return Object.create({
    ...Object.getPrototypeOf(person),
    context: 'DeveloperContext',
    add: excel,
  });
};

/**
 * You see, it is based on
 * 'EmployeeContext'. This is
 * where the trouble starts...
 *
 * @typedef {EmployeeContext & {}} DeveloperContext
 */

/**
 * @function
 * @returns {DeveloperContext}
 */
const developerFactory = () => {
  /**
   * It is a blashphemy for developers
   * to use Excel for adding numbers.
   *
   * @private
   * @type {function(Args<number>):number}
   * @throws {Error}
   */
  const excel = () => {
    throw new Error('No way using Excel');
  };

  /** @type {PersonContext} */
  const person = employeeFactory();

  return Object.create({
    ...Object.getPrototypeOf(person),
    context: 'DeveloperContext',
    add: excel,
  });
};

{
  // 1st accountant uses 'simple_math'
  const acc_0 = personFactory();
  acc_0.add([1, 1]); // 2

  // 2nd accountant uses 'excel'
  const acc_1 = employeeFactory();
  acc_1.add([1, 1]); // 2

  // 1st developer uses 'simple_math'
  const dev_0 = personFactory();
  dev_0.add([1, 1]); // 2

  /*
   * 2nd developer throws an error when
   * using Excel. It worked fine when
   * creating `developer` with
   * `PersonContext`. However, it fails
   * when creating `developer` with
   * `DeveloperContext`.
   *
   * We failed to design `EmployeeContext`
   * to properly work for everyone.
   * When a sub-class fails to substitute,
   * it is said to violate LSP.
   */
  const dev_1 = developerFactory();
  dev_1.add([1, 1]); // Error!
}
