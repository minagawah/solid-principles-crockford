/**
 * @module solid_crockford/4_interface_segragation/fp/after_bad
 */

/** @typedef {function(): void} Method */

/**
 * @typedef EmployeeContext
 * @type {Object}
 * @property {string} [context]
 * @property {Method} use_chopstikcs
 * @property {Method} eat_chow_mein
 * @property {Method} use_excel
 * @property {Method} use_visual_studio
 */

/**
 * We are implementing methods to make
 * 'EmployeeContext' which would best
 * represent the ideal employee for
 * our company.
 *
 * @returns {EmployeeContext}
 */
const employeeFactory = () =>
  Object.create({
    context: 'EmployeeContext',

    // Basic skills required
    use_chopsticks: () => {},
    eat_chow_mein: () => {},

    // Desired skills if any
    use_excel: () => {},
    use_visual_studio: () => {},
  });

{
  /*
   * It is likely, accountants will not
   * be using Visual Studio Code, and
   * so the method 'use_visual_studio'
   * will never get called. Then, we
   * would say 'EmployeeContext'
   * violates ISP (Interface
   * Segragation Principle).
   */
  const accountant = employeeFactory();
  accountant.use_excel();

  /*
   * Similarly, developers will never
   * have a chance in using Excel. So,
   * 'EmployeeContext' clearly violates
   * ISP (Interface Segragation Principle).
   */
  const developer = employeeFactory();
  developer.use_visual_studio();
}
