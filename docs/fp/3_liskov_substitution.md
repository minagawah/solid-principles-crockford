# 2-1. SOLID Principles with FP Examples

## (3) Liskov Substitution Principle (LSP) with FP

Or, see the corresponding [OOP version.](../oop/3_liskov_substitution.md)

### ■ Description

> Let P(y) be a property provable about objects y of type A.  
> Then P(x) should be true for objects x of type B where B is a subtype of A.

Sounds complicated, doesn't it?  
Let me break it down for you.

**A** being the *"parent"* while **B** being its *"sub-class"*.  
Let's say, the program was working fine when using **A** (parent).  
However, once replaced with **B** (sub-class), it stopped working.  
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

If you are in hurry,
you can [check out the shorter version.](#shorter_examples)

#### (a) BEFORE

This is a program for managing employees.  
While accountants are good at using Excel sheets, often a time, developers are not.  
You will need to design the program so that it will not break.

##### Assignment

> Customize `PersonContext` to create `EmployeeContext`  
> which aims to manage ideal employees for a company.  
> They should be skillfull at using Excel for calculations.  
> With `EmployeeContext` we should be able to create  
> `accountant` instance.
>  
> Also, implement `DeveloperContext` with which  
> we are creating `developer` who sucks at Excel,  
> but good at coming up with different ideas  
> to calculate numbers.

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

<a name="shorter_examples"></a>
### ■ SHORTER EXAMPLES

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

An instance of `DeveloperContext` will throw Error when using `excel`.

```js
const personFactory = () => {
  const simple_math = () => {}
  return Object.create({
    add: simple_math
  })
}

const employeeFactory = () => {
  const excel = () => {}
  const person = personFactory()
  return Object.create({
    ...Object.getPrototypeOf(person),
    add: excel
  })
}

const developerFactory = () => {
  // Error when using 'excel'
  const excel = () => throw new Error('bad')
  const person = employeeFactory()
  return Object.create({
    ...Object.getPrototypeOf(person),
    add: excel
  });
}
```

#### GOOD

Fix `DeveloperContext` to derive from `PersonContext` (instead of `EmployeeContext`).

```js
const personFactory = () => {
  const simple_math = () => {}
  return Object.create({
    add: simple_math
  })
}

const employeeFactory = () => {
  const excel = () => {}
  const person = personFactory()
  return Object.create({
    ...Object.getPrototypeOf(person),
    add: excel
  })
}

const developerFactory = () => {
  const programming = () => {}
  const person = personFactory()
  return Object.create({
    ...Object.getPrototypeOf(person),
    add: programming
  })
}
```

Do you see how they differ?

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](../oop/index.md)
- [FP (Functional Programming) Examples](./index.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)
