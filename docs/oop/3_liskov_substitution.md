# 2-2. SOLID Principles with OOP Examples

## (3) Liskov Substitution Principle (LSP) with OOP

Or, see the corresponding [FP version.](../fp/3_liskov_substitution.md)

### ■ Description

> Let P(y) be a property provable about objects y of type A.  
> Then P(x) should be true for objects x of type B where B is a subtype of A.

Sounds complicated, doesn't it?  
Let me break it down for you.

**A** being the *"parent"* while **B** being its *"sub-class"*.  
Let's say, the program was working with **A** (parent).  
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
you can [check out the shorter version.](#nutshell)

#### (a) BEFORE

This is a program for managing employees.  
While accountants are good at using Excel sheets, often a time, developers are not.  
You will need to design the program so that it will not break.

##### Assignment

> Customize `Person` class to create `Employee` class  
> which aims to manage ideal employees for a company.  
> They should be skillfull at using Excel for calculations.  
> With `Employee` class we should be able to create  
> `accountant` instance.
>  
> Also, implement `Developer` class with which  
> we are creating `developer` who sucks at Excel,  
> but good at coming up with different ideas  
> to calculate numbers.

```ts
class Person {
  public add(args: number[]) {
    return this.simple_math(args);
  }

  private simple_math(args: number[]) {
    return args[0] + args[1];
  }
}

class Employee extends Person {}
```

- [3_liskov_substitution/oop/before.ts](../../src/3_liskov_substitution/oop/before.ts)
  - Or, FP version:  
[3_liskov_substitution/fp/before.js](../../src/3_liskov_substitution/fp/before.js)


#### (b) AFTER (BAD)

You see a BAD example bellow:

```ts
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

  // Employee is sophisticated enough
  // to use Excel.
  protected excel(args: number[]): number {
    return args[0] + args[1];
  }
}

class Developer extends Employee {
  // It is a blashphemy for developers
  // to use Excel for adding numbers.
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

  // 2nd developer throws Error!
  const dev_1 = new Developer();
  dev_1.add([1, 1]); // Error!
}
```

2nd developer throws an error when using Excel.  
It worked fine when creating `developer` with `Person`.  
However, it fails when creating `developer` with `Developer`.

We failed to design `Employee` to properly work for everyone.  
When a sub-class fails to substitute, it is said to violate LSP.

- [3_liskov_substitution/oop/after_bad.ts](../../src/3_liskov_substitution/oop/after_bad.ts)
  - Or, FP version:  
[3_liskov_substitution/fp/after_bad.js](../../src/3_liskov_substitution/fp/after_bad.js)


#### (c) AFTER (GOOD)

One way to fix would be to fix `Employee` class.  
But, another way would be to create a new class  
`Developer` extended from `Person` class.

Now, with the new class `Developer`,  
developers no longer need to use Excel.

```ts
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
```

- [3_liskov_substitution/oop/after_good.ts](../../src/3_liskov_substitution/oop/after_good.ts)
  - Or, FP version:  
[3_liskov_substitution/fp/after_good.js](../../src/3_liskov_substitution/fp/after_good.js)

<a name="nutshell"></a>
### ■ SHORTER EXAMPLES

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

An instance of `Developer` class will throw Error when using `excel`.

```js
class Person {
  public add(args) {
    return this.simple_math(args)
  }

  private simple_math(args): number
}

class Employee extends Person {
  public add(args) {
    return this.excel(args)
  }

  protected excel(args): number
}

class Developer extends Employee {
  // Error when using 'excel'
  protected excel(args) {
    throw new Error('Error!')
  }
}
```

#### GOOD

Fix `Developer` class to derive from `Person` class (instead of `Employee` class).

```js
class Person {
  public add(args) {
    return this.simple_math(args)
  }

  private simple_math(args): number
}

class Employee extends Person {
  public add(args) {
    return this.excel(args)
  }

  protected excel(args): number
}

class Developer extends Person {
  // No more error!
  public add(args) {
    return this.programming(args)
  }

  private programming(args): number
}
```

Do you see how they differ?

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](./index.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)
- [FP (Functional Programming) Examples](../fp/index.md)
