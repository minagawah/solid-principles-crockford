# 2-1. SOLID Principles with FP Examples

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](../oop/oop.md)
- [FP (Functional Programming) Examples](./fp.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)

## (5) Dependency Inversion Principle (DIP) with FP

HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

### ■ Solution

Fix the HIGH-LEVEL modules to depend on abstractions.  
In aonther word, depend on an interface rather than a class.

### ■ Examples

#### (a) BEFORE

##### Assignment

> How would you implement `ProfileContext`?

```js
const COOKIE_DAYS = 90;

/**
 * LOW-LEVEL
 *
 * @returns {CookiesContext}
 */
const cookiesFactory = name => {
  const save = data => {
    const d = new Date();
    d.setTime(
      d.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${name}=${JSON.stringify(data)}`,
      `expires=${d.toUTCString()}`,
      `path=/`,
    ].join('; ');
  };

  const fetch = () => {
    const match = `${name}=`;
    const arr = document.cookie.split('');
    for (let i = 0; i < arr.length; i++) {
      let c = arr[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(match) === 0)
        return JSON.parse(
          c.substring(match.length, c.length)
        );
    }
  };

  return Object.create({
    context: 'CookiesContext',
    cookie_name: name,
    save,
    fetch,
  });
};

/**
 * HIGH-LEVEL
 *
 * @returns {ProfileContext}
 */
const profileFactory = () =>
  Object.create({
    context: 'ProfileContext',
    save: () => {},
    fetch: () => {},
  });

{
  const data = { name: 'Joe', age: 10 };

  // Later, we want the following:
  //
  // const profile = profileFactory();
  // profile.save(data);
}
```

- [src/5_dependency_inversion/fp/before.js](../../src/5_dependency_inversion/fp/before.js)
  - Or, OOP version:  
[src/5_dependency_inversion/oop/before.ts](../../src/5_dependency_inversion/oop/before.ts)


#### (b) AFTER (BAD)

You see a BAD version bellow:

```js
const COOKIE_DAYS = 90;

/**
 * LOW-LEVEL
 *
 * @returns {CookiesContext}
 */
const cookiesFactory = name => {
  const save = data => {
    ...
    ...
  };

  const fetch = () => {
    ...
    ...
  };

  return Object.create({
    context: 'CookiesContext',
    cookie_name: name,
    save,
    fetch,
  });
};

/**
 * HIGH-LEVEL
 *
 * @returns {ProfileContext}
 */
const profileFactory = () => {
  const cookies = cookiesFactory('profile'); // No!!!!
  const { save, fetch } = cookies;

  return Object.create({
    context: 'ProfileContext',
    cookies_name: name,
    save,
    fetch,
  });
};

{
  const profile = profileFactory();
  profile.save({ name: 'Joe', age: 10 });
}
```

As DIP (Dependency Inversion Principle) suggests, we should avoid  
having the HIGH-LEVEL component (`ProfileContext`) to depend on  
the LOW-LEVEL (`CookiesContext`).

- [src/5_dependency_inversion/fp/after_bad.js](../../src/5_dependency_inversion/fp/after_bad.js)
  - Or, OOP version:  
[src/5_dependency_inversion/oop/after_bad.ts](../../src/5_dependency_inversion/oop/after_bad.ts)


#### (c) AFTER (GOOD)

Instead of the HIGH-LEVEL (`ProfileContext`) depends on  
the LOW-LEVEL (`CookiesContext`), we want to reverse  
the dependency, and have the HIGH-LEVEL (`ProfileContext`)  
depends on the newly introduced abstraction (`GenericStorageInterface`).

```js
const COOKIE_DAYS = 90;

const genericStorageInterface = storage => {
  const { save, fetch } = storage;
  return {
    context: 'GenericStorageInterface',
    save,
    fetch,
  };
};

/**
 * LOW-LEVEL
 *
 * @returns {CookiesContext}
 */
const cookiesFactory = name => {
  const save = data => {
    ...
    ...
  };

  const fetch = () => {
    ...
    ...
  };

  // Good!
  const generic = genericStorageInterface({ save, fetch });

  return Object.create({
    ...generic,
    context: 'CookiesContext',
    cookie_name: name,
  });
};

/**
 * HIGH-LEVEL
 *
 * @returns {ProfileContext}
 */
const profileFactory = storage => {
  const { save, fetch } = storage;
  return Object.create({
    context: 'ProfileContext',
    save,
    fetch,
  });
};

{
  const cookies = cookiesFactory('profile');

  const profile = profileFactory(cookies);
  profile.save({ name: 'Joe', age: 10 });
}
```

`ProfileContext` no longer depends on the LOW-LEVEL, but it now depends  
on the abstraction (`GenericStorageInterface`).

- [5_dependency_inversion/fp/after_good.js](../../src/5_dependency_inversion/fp/after_good.js)
  - Or, OOP version:  
[5_dependency_inversion/oop/after_good.ts](../../src/5_dependency_inversion/oop/after_good.ts)

