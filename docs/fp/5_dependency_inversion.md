# 2-1. SOLID Principles with FP Examples

## (5) Dependency Inversion Principle (DIP) with FP

Or, see the corresponding [OOP version.](../oop/5_dependency_inversion.md)

### ■ Description

HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

### ■ Solution

Fix the HIGH-LEVEL modules to depend on abstractions.  
In aonther word, depend on an interface rather than a class.

### ■ Examples

If you are in hurry,
you can [check out the shorter version.](#nutshell)

#### (a) BEFORE

This is a program for managing profile data. You will implement a program  
so that it would save the data to cookies, and also to fetch them.

##### Assignment

> How would you implement `ProfileContext`?

```js
const COOKIE_DAYS = 90;

/**
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
    name,
    save,
    fetch,
  });
};

/**
 * HIGH-LEVEL
 *
 * @returns {ProfileContext}
 */
const profileFactory = cookies => {
  // Too specific!
  const { save, fetch } = cookies;

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

As DIP (Dependency Inversion Principle) suggests, we should avoid  
having the HIGH-LEVEL component (`ProfileContext`) to depend on  
the LOW-LEVEL (`CookiesContext`).

- [src/5_dependency_inversion/fp/after_bad.js](../../src/5_dependency_inversion/fp/after_bad.js)
  - Or, OOP version:  
[src/5_dependency_inversion/oop/after_bad.ts](../../src/5_dependency_inversion/oop/after_bad.ts)


#### (c) AFTER (GOOD)

Instead of HIGH-LEVEL (`ProfileContext`) to depend on  
the LOW-LEVEL (`CookiesContext`), we want to reverse  
the dependency, and have HIGH-LEVEL (`ProfileContext`)  
to depend on the newly introduced abstraction (`GenericStorageInterface`).

```js
const COOKIE_DAYS = 90;

const genericStorageInterface = storage => {
  const { name, save, fetch } = storage;
  return {
    context: 'GenericStorageInterface',
    name,
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

  /**
   * Abstract!
   * @type {GenericStorageInterface}
   */
  const generic = genericStorageInterface({
    name,
    save,
    fetch,
  });

  return Object.create({
    ...generic,
    context: 'CookiesContext',
  });
};

/**
 * HIGH-LEVEL
 *
 * @returns {ProfileContext}
 */
const profileFactory = storage => {
  // Abstract!
  const { save, fetch } = storage;

  return Object.create({
    context: 'ProfileContext',
    save,
    fetch,
  });
};

{
  const storage = cookiesFactory('profile');

  const profile = profileFactory(storage);
  profile.save({ name: 'Joe', age: 10 });
}
```

`ProfileContext` no longer depends on the LOW-LEVEL, but it now depends  
on the abstraction (`GenericStorageInterface`).

- [5_dependency_inversion/fp/after_good.js](../../src/5_dependency_inversion/fp/after_good.js)
  - Or, OOP version:  
[5_dependency_inversion/oop/after_good.ts](../../src/5_dependency_inversion/oop/after_good.ts)


<a name="nutshell"></a>
### ■ NUTSHELL

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

See how `ProfileContext` depends on `CookieContext`?

```js
// LOW-LEVEL
const cookiesFactory = () => {
  const save = () => {}
  const fetch = () => {}
  return Object.create({
    save,
    fetch,
  })
}

// HIGH-LEVEL
const profileFactory = cookies => {
  // Too specific!
  const { save, fetch } = cookies;

  return Object.create({ save, fetch });
};
```

#### GOOD

Reverse the dependency (avoid `ProfileContext` to depend on `CookieContext`),  
and let `CookieContext` depend on `GenericStorageContext`.

```js
// ABSTRACTION!
const genericStorageInterface = storage => {
  const { save, fetch } = storage;
  return {
    save,
    fetch,
  }
}

// LOW-LEVEL
const cookiesFactory = name => {
  const save = () => {}
  const fetch = () => {}

  // Abstract!
  const generic = genericStorageInterface({
    save,
    fetch,
  })

  return Object.create({
    ...generic,
  })
}

// HIGH-LEVEL
const profileFactory = storage => {
  // Abstract!
  const { save, fetch } = storage;

  return Object.create({
    save,
    fetch,
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
