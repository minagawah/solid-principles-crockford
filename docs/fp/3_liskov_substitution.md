# 2-1. SOLID Principles with FP Examples

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](../oop/oop.md)
- [FP (Functional Programming) Examples](./fp.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)

## (3) Liskov Substitution Principle (LSP) with FP

> Let P(y) be a property provable about objects y of type A.  
> Then P(x) should be true for objects x of type B where B is a subtype of A.

Sounds complicated, right?  
Let me break it down for you.

**A** being the "parent".  
**B** being its "sub-class".  
Let's say, the program was working with **A** (parent).  
But, once replaced with **B** (sub-class), it stopped working.  
If that happens, then **B** (sub-class) is said to violate LCP.

In another word,  
if you substitute a sub-class for the parent, and breaks,  
then the sub-class violates LCP.

### ■ Solution

Fix the sub-class **B**.  
Make sure it won't break the behaviors of its super-class **A**.  
Or, another way would be to introduce a new class **C**  
which is the approach taken in the bellow example.

### ■ Examples

#### (a) BEFORE

##### Assignment

> Customize `PersonContext` to create `EmployeeContext`  
> which aims to manage ideal employees for a company.  
> They should be skillfull at using Excel for calculations.  
> With `EmployeeContext` we should be able to create  
> `accountant` instance.
>  
> Also, create `DeveloperContext` using which we would be  
> able to create `developer` who may be terrible at Excel,  
> but good at other means for calculating numbers.

```js
/**
 * @returns {PersonContext}
 */
const personFactory = () => {
  const simple_math = args => args[0] + args[1];

  return Object.create({
    context: 'PersonContext',
    add: simple_math,
  });
};

const employeeFactory = () => {};
const developerFactory = () => {};
```

- [3_liskov_substitution/fp/before.js](../../src/3_liskov_substitution/fp/before.js)
  - Or, OOP version:  
[3_liskov_substitution/oop/before.ts](../../src/3_liskov_substitution/oop/before.ts)

#### (b) AFTER (BAD)

You see a BAD example bellow:

```js
/**
 * @returns {PersonContext}
 */
const personFactory = () => {
  const simple_math = args => args[0] + args[1];

  return Object.create({
    context: 'PersonContext',
    add: simple_math,
  });
};

/**
 * @returns {EmployeeContext}
 */
const employeeFactory = () => {
  // Employee is sophisticated enough
  // to use Excel.
  const excel = args => args[0] + args[1];

  const person = personFactory();

  return Object.create({
    ...Object.getPrototypeOf(person),
    context: 'DeveloperContext',
    add: excel,
  });
};

/**
 * @returns {DeveloperContext}
 */
const developerFactory = () => {
  // It is a blashphemy for developers
  // to use Excel for adding numbers.
  const excel = args => {
    throw new Error('No way using Excel');
  };

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

  // 2nd developer throws Error!
  const dev_1 = developerFactory();
  dev_1.add([1, 1]); // Error!
}
```

2nd developer throws an error when using Excel.  
It worked fine when creating `developer` with `PersonContext`.  
However, it fails when creating `developer` with `DeveloperContext`.

We failed to design `EmployeeContext` to properly work for everyone.  
When a sub-class fails to substitute, it is said to violate LSP.

- [3_liskov_substitution/fp/after_bad.js](../../src/3_liskov_substitution/fp/after_bad.js)
  - Or, OOP version:  
[3_liskov_substitution/oop/after_bad.ts](../../src/3_liskov_substitution/oop/after_bad.ts)


#### (c) AFTER (GOOD)

One way to fix would be to fix `EmployeeContext`.  
But, another way would be to create a new context  
`DeveloperContext` extended from `PersonContext`.

Now, with the new context `DeveloperContext`,  
developers no longer need to use Excel.

```js
/**
 * @returns {PersonContext}
 */
const personFactory = () => {
  const simple_math = args => args[0] + args[1];

  return Object.create({
    context: 'PersonContext',
    add: simple_math,
  });
};

/**
 * @returns {EmployeeContext}
 */
const employeeFactory = () => {
  const excel = args => args[0] + args[1];

  const person = personFactory();

  return Object.create({
    ...Object.getPrototypeOf(person),
    context: 'DeveloperContext',
    add: excel,
  });
};

/**
 * @returns {DeveloperContext}
 */
const developerFactory = () => {
  // They are better off Excel!
  const programming = args => args.reduce((acc, n) => acc + n, 0);

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
```

- [3_liskov_substitution/fp/after_good.js](../../src/3_liskov_substitution/fp/after_good.js)
  - Or, OOP version:  
[3_liskov_substitution/oop/after_good.ts](../../src/3_liskov_substitution/oop/after_good.ts)
