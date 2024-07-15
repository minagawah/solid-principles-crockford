/**
 * @module solid_crockford/3_liskov_substitution/oop/after_good
 */

class Person {
  public add(args: number[]) {
    return this.simple_math(args);
  }

  private simple_math(args: number[]) {
    return args[0] + args[1];
  }
}

class Employee extends Person {
  public add(args: number[]): number {
    return this.excel(args);
  }

  protected excel(args: number[]): number {
    return args[0] + args[1];
  }
}

/**
 * One way to fix would be to fix
 * `Employee` class. But, another way
 * would be to create a new class
 * `Developer` extended from
 * `Person` class.
 *
 * Now, with the new class
 * `DeveloperContext`, developers
 * no longer need to use Excel.
 */
class Developer extends Person {
  // They are better off Excel!
  public add(args: number[]): number {
    return this.programming(args);
  }

  private programming(args: number[]): number {
    return args.reduce((acc, n) => acc + n, 0);
  }
}

{
  const acc = new Employee();
  acc.add([1, 1]); // 2

  // No errors!
  const dev = new Developer();
  dev.add([1, 1]); // 2
}
