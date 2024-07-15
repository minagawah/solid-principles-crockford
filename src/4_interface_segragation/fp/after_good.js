/**
 * @module solid_crockford/4_interface_segragation/fp/after_good
 */

/**
 * @callback Method
 */

/**
 * @typedef {Record<string, Method>} Arg
 */

/*
 * We defined 3 segregated interfaces
 * that are designed to accomplish
 * what matters the most for roles
 * expected for each.
 */

/**
 * @typedef EmployeeInterface
 * @type {Object}
 * @property {string} [context]
 * @property {Method} use_chopsticks
 * @property {Method} eat_chow_mein
 */

/**
 * @typedef AccountantInterface
 * @type {Object}
 * @property {string} [context]
 * @property {Method} use_excel
 */

/**
 * @typedef DeveloperInterface
 * @type {Object}
 * @property {string} [context]
 * @property {Method} use_visual_studio
 */

/**
 * @param {Arg} arg
 * @returns {EmployeeInterface}
 */
const employeeInterface = arg => {
  const { use_chopsticks, eat_chow_mein } = arg;
  return {
    context: 'EmployeeInterface',
    use_chopsticks,
    eat_chow_mein,
  };
};

/**
 * @param {Arg} arg
 * @returns {AccountantInterface}
 */
const accountantInterface = arg => {
  const { use_excel } = arg;
  return { context: 'AccountantInterface', use_excel };
};

/**
 * @param {Arg} arg
 * @returns {DeveloperInterface}
 */
const developerInterface = arg => {
  const { use_visual_studio } = arg;
  return {
    context: 'DeveloperInteface',
    use_visual_studio,
  };
};

/*
 * Union in JSDOC!!!!
 * Having 'jsdoc-plugin-intersection'
 * allows you to convert '&' of TS
 * into '|' of JSDoc.
 */

/**
 * Accountants will no longer need to
 * deal with using Visual Studio Code.
 *
 * @returns {EmployeeInterface & AccountantInterface}
 */
const accountantFactory = () => {
  const employee = employeeInterface({
    use_chopsticks: () => {},
    eat_chow_mein: () => {},
  });

  const accountant = accountantInterface({
    use_excel: () => {},
  });

  const proto = {
    ...employee,
    ...accountant,
    context: 'AccountantContext',
  };

  return Object.create(proto);
};

/**
 * Developers will no longer need to
 * deal with using Excel at work.
 *
 * @returns {EmployeeInterface & DeveloperInterface}
 */
const developerFactory = () => {
  /** @type {EmployeeInterface} */
  const employee = employeeInterface({
    use_chopsticks: () => {},
    eat_chow_mein: () => {},
  });

  /** @type {DeveloperInterface} */
  const developer = developerInterface({
    use_visual_studio: () => {},
  });

  return Object.create({
    ...employee,
    ...developer,
    context: 'DeveloperContext',
  });
};

{
  const accountant = accountantFactory();
  accountant.use_excel();

  const developer = developerFactory();
  developer.use_visual_studio();
}
