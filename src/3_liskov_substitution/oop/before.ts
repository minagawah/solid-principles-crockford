/**
 * @module solid_crockford/3_liskov_substitution/oop/before
 */

class Person {
  public add(args: number[]) {
    return this.simple_math(args);
  }

  private simple_math(args: number[]) {
    return args[0] + args[1];
  }
}

/**
 * Customize `Person` class to create
 * `Employee` class which aims to manage
 * ideal employees for a company. They
 * should be skillfull at using Excel
 * for calculations. With `Employee`
 * class we should be able to create
 * `accountant` instance.
 *  
 * Also, create `Developer` class using
 * which we would be able to create
 * `developer` who may be terrible
 * at Excel, but good at other means
 * for calculating numbers.
 */
class Employee extends Person {}
