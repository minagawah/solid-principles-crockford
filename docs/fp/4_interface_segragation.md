# 2-1. SOLID Principles with FP Examples

## (4) Interface Segragation Principle (ISP) with FP

Or, see the corresponding [OOP version.](../oop/4_interface_segragation.md)

### ■ Description

You should not implement interfaces that are not used.

### ■ Solution

Divide your interfaces into smaller modules.

### ■ Examples

If you are in hurry,
you can [check out the shorter version.](#shorter_examples)

#### (a) BEFORE

This is a program about ideal employees.  
You will describes skills in the program that are  
required for becoming the best employee in the company.

##### Assignment

> To represent ideal employees for our company, they should  
> be able to use Excel, but at the same time, some of them should  
> also be able to use Visual Studio Code as well.  
> How would you define `Employee` context?

```js
const employeeFactory = () => {};
```

- [4_interface_segragation/fp/before.js](../../src/4_interface_segragation/fp/before.js)
  - Or, OOP version:  
[4_interface_segragation/oop/before.ts](../../src/4_interface_segragation/oop/before.ts)


#### (b) AFTER (BAD)

You see a BAD example bellow:

```js
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
```

It is likely, accountants will not be using Visual Studio Code,  
and so the method `use_visual_studio` will never get called.  
Then, we would say `EmployeeContext` violates  
ISP (Interface Segragation Principle).

```js
{
  const accountant = employeeFactory();
  accountant.use_excel();
```

Similarly, developers will never have a chance in using Excel.  
So, `EmployeeContext` clearly violates ISP.

```js
  const developer = employeeFactory();
  developer.use_visual_studio();
}
```

- [4_interface_segragation/fp/after_bad.js](../../src/4_interface_segragation/fp/after_bad.js)
  - Or, OOP version:  
[4_interface_segragation/oop/after_bad.ts](../../src/4_interface_segragation/oop/after_bad.ts)

#### (c) AFTER (GOOD)

We defined 3 segregated interfaces that are designed to accomplish  
what matters the most for roles expected for each.

```js
const employeeInterface = arg => {
  const { use_chopsticks, eat_chow_mein } = arg;
  return {
    context: 'EmployeeInterface',
    use_chopsticks,
    eat_chow_mein,
  };
};

const accountantInterface = arg => {
  const { use_excel } = arg;
  return { context: 'AccountantInterface', use_excel };
};

const developerInterface = arg => {
  const { use_visual_studio } = arg;
  return {
    context: 'DeveloperInteface',
    use_visual_studio,
  };
};
```

Accountants will no longer need to deal with using Visual Studio Code.

```js
const accountantFactory = () => {
  const employee = employeeInterface({
    use_chopsticks: () => {},
    eat_chow_mein: () => {},
  });

  const accountant = accountantInterface({
    use_excel: () => {},
  });

  const proto = {
    ...employee,
    ...accountant,
    context: 'AccountantContext',
  };

  return Object.create(proto);
};
```

Developers will no longer need to deal with using Excel at work.

```js
const developerFactory = () => {
  const employee = employeeInterface({
    use_chopsticks: () => {},
    eat_chow_mein: () => {},
  });

  const developer = developerInterface({
    use_visual_studio: () => {},
  });

  return Object.create({
    ...employee,
    ...developer,
    context: 'DeveloperContext',
  });
};

{
  const accountant = accountantFactory();
  accountant.use_excel();

  const developer = developerFactory();
  developer.use_visual_studio();
}
```

- [4_interface_segragation/fp/after_good.js](../../src/4_interface_segragation/fp/after_good.js)
  - Or, OOP version:  
[4_interface_segragation/oop/after_good.ts](../../src/4_interface_segragation/oop/after_good.ts)

<a name="shorter_examples"></a>
### ■ SHORTER EXAMPLES

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

See some of the methods are not in use.

```js
const employeeFactory = () =>
  Object.create({
    // Basic skills
    use_chopsticks: () => {},
    eat_chow_mein: () => {},

    // Desired skills
    use_excel: () => {},
    use_visual_studio: () => {},
  })

{
  const accountant = employeeFactory()
  accountant.use_excel()

  const developer = employeeFactory()
  developer.use_visual_studio()
}
```

#### GOOD

You should put them in the appropriate contexts.

```js
const employeeInterface = arg => {
  const {
    use_chopsticks,
    eat_chow_mein
  } = arg

  return {
    use_chopsticks,
    eat_chow_mein
  }
};

const accountantInterface = arg => {
  const { use_excel } = arg;
  return { use_excel }
}

const developerInterface = arg => {
  const { use_visual_studio } = arg;
  return {
    use_visual_studio
  };
}

const accountantFactory = () => {
  const employee = employeeInterface({
    use_chopsticks: () => {},
    eat_chow_mein: () => {}
  });

  const accountant = accountantInterface({
    use_excel: () => {}
  })

  const proto = {
    ...employee,
    ...accountant,
  }

  return Object.create(proto)
}

const developerFactory = () => {
  const employee = employeeInterface({
    use_chopsticks: () => {},
    eat_chow_mein: () => {}
  })

  const developer = developerInterface({
    use_visual_studio: () => {}
  })

  return Object.create({
    ...employee,
    ...developer,
  })
}

{
  const accountant = accountantFactory()
  accountant.use_excel()

  const developer = developerFactory()
  developer.use_visual_studio()
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
