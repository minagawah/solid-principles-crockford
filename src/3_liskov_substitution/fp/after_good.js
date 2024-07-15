/**
 * @module solid_crockford/3_liskov_substitution/fp/after_good
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
 * Notice, instead of 'EmployeeContext',
 * it now overwrites 'PersonContext'!
 *
 * @typedef {PersonContext & {}} DeveloperContext
 */

/**
 * One way to fix would be to fix
 * `EmployeeContext`. But, another way
 * would be to create a new context
 * `DeveloperContext` extended from
 * `PersonContext`.
 *
 * Now, with the new context
 * `DeveloperContext`, developers
 * no longer need to use Excel.
 *
 * @function
 * @returns {DeveloperContext}
 */
const developerFactory = () => {
  /**
   * They are better off Excel!
   * @private
   * @type {function(Args<number>):number}
   */
  const programming = args =>
    args.reduce((acc, n) => acc + n, 0);

  /** @type {PersonContext} */
  const person = personFactory();

  return Object.create({
    ...Object.getPrototypeOf(person),
    context: 'DeveloperContext',
    add: programming,
  });
};

{
  const acc = employeeFactory();
  acc.add([1, 1]); // 2

  // No errors!
  const dev = developerFactory();
  dev.add([1, 1]); // 2
}
