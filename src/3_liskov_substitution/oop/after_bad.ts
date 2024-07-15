/**
 * @module solid_crockford/3_liskov_substitution/oop/after_bad
 */

class Person {
  public add(args: number[]): number {
    return this.simple_math(args);
  }

  private simple_math(args: number[]): number {
    return args[0] + args[1];
  }
}

class Employee extends Person {
  public add(args: number[]): number {
    return this.excel(args);
  }

  /**
   * Employee is sophisticated enough
   * to use Excel.
   */
  protected excel(args: number[]): number {
    return args[0] + args[1];
  }
}

class Developer extends Employee {
  /**
   * It is a blashphemy for developers
   * to use Excel for adding numbers.
   * @throws {Error}
   */
  protected excel(args: number[]): number {
    throw new Error('No way using Excel');
  }
}

{
  // 1st accountant uses 'simple_math'
  const acc_0 = new Person();
  acc_0.add([1, 1]); // 2

  // 2nd accountant uses 'excel'
  const acc_1 = new Employee();
  acc_1.add([1, 1]); // 2

  // 1st developer uses 'simple_math'
  const dev_0 = new Person();
  dev_0.add([1, 1]); // 2

  /*
   * 2nd developer throws an error when
   * using Excel. It worked fine when
   * creating `developer` with
   * `Person`. However, it fails when
   * creating `developer` with
   * `Developer`.
   *
   * We failed to design `Employee`
   * to properly work for everyone.
   * When a sub-class fails to substitute,
   * it is said to violate LSP.
   */
  const dev_1 = new Developer();
  dev_1.add([1, 1]); // Error!
}
