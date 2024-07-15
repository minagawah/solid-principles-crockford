# 2-1. SOLID Principles with OOP Examples

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](./oop.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)
- [FP (Functional Programming) Examples](../fp/fp.md)

## (4) Interface Segragation Principle (ISP) with OOP

You should not implement interfaces that are not used.

### ■ Solution

Divide your interfaces into smaller modules.

### ■ Examples

#### (a) BEFORE

##### Assignment

> To represent ideal employees for our company, they should  
> be able to use Excel, but at the same time, some of them should  
> also be able to use Visual Studio Code as well.  
> How would you define `Employee` class?

```ts
class Employee {}
```

- [4_interface_segragation/oop/before.ts](../../src/4_interface_segragation/oop/before.ts)
  - Or, FP version:  
[4_interface_segragation/fp/before.js](../../src/4_interface_segragation/fp/before.js)


#### (b) AFTER (BAD)

You see a BAD example bellow:

```ts
class Employee {
  // Basic skills required
  public use_chopsticks() {}
  public cook_chow_mein() {}

  // Desired skills if any
  public use_excel() {}
  public use_visual_studio() {}
}
```

It is likely, accountants will not be using Visual Studio Code,  
and so the method 'use_visual_studio' will never get called.  
Then, we would say `Employee` violates ISP (Interface Segragation Principle).

```ts
{
  const accountant = new Employee();
  accountant.use_excel();
```

Similarly, developers will never have a chance in using Excel.  
So, `Employee` clearly violates ISP.

```ts
  const developer = new Employee();
  developer.use_visual_studio();
}
```

- [4_interface_segragation/oop/after_bad.ts](../../src/4_interface_segragation/oop/after_bad.ts)
  - Or, FP version:  
[4_interface_segragation/fp/after_bad.js](../../src/4_interface_segragation/fp/after_bad.js)


#### (c) AFTER (GOOD)

We defined 3 segregated interfaces that are designed to accomplish  
what matters the most for roles expected for each.

```ts
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
```

Accountants will no longer need to deal with using Visual Studio Code.

```ts
class Accountant implements IEmployee, IAccountant {
  public use_chopsticks() {}
  public cook_chow_mein() {}

  public use_excel() {}
}
```

Developers will no longer need to deal with using Excel at work.

```ts
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
```

- [4_interface_segragation/oop/after_good.ts](../../src/4_interface_segragation/oop/after_good.ts)
  - Or, FP version:  
[4_interface_segragation/fp/after_good.js](../../src/4_interface_segragation/fp/after_good.js)
