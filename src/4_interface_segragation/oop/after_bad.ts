/**
 * @module solid_crockford/4_interface_segragation/oop/after_bad
 */

/**
 * We are implementing methods to make
 * 'Employee' which would best represent
 * the ideal employee for our company.
 */
class Employee {
  // Basic skills required
  public use_chopsticks() {}
  public cook_chow_mein() {}

  // Desired skills if any
  public use_excel() {}
  public use_visual_studio() {}
}

{
  /*
   * It is likely, accountants will not
   * be using Visual Studio Code, and
   * so the method 'use_visual_studio'
   * will never get called. Then, we
   * would say 'Employee' violates
   * ISP (Interface Segragation
   * Principle).
   */
  const accountant = new Employee();
  accountant.use_excel();

  /*
   * Similarly, developers will never
   * have a chance in using Excel. So,
   * 'Employee' clearly violates ISP
   * (Interface Segragation Principle).
   */
  const developer = new Employee();
  developer.use_visual_studio();
}
