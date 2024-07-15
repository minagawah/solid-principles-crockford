/**
 * @module solid_crockford/4_interface_segragation/oop/after_good
 */

/*
 * We defined 3 segregated interfaces
 * that are designed to accomplish
 * what matters the most for roles
 * expected for each.
 */

interface IEmployee {
  use_chopsticks(): void;
  cook_chow_mein(): void;
}

interface IAccountant {
  use_excel(): void;
}

interface IDeveloper {
  use_visual_studio(): void;
}

/**
 * Accountants will no longer need to
 * deal with using Visual Studio Code.
 */
class Accountant implements IEmployee, IAccountant {
  public use_chopsticks() {}
  public cook_chow_mein() {}

  public use_excel() {}
}

/**
 * Developers will no longer need to
 * deal with using Excel at work.
 */
class Developer implements IEmployee, IDeveloper {
  public use_chopsticks() {}
  public cook_chow_mein() {}

  public use_visual_studio() {}
}

{
  const accountant = new Accountant();
  accountant.use_excel();

  const developer = new Developer();
  developer.use_visual_studio();
}
