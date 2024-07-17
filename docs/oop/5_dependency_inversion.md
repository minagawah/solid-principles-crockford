# 2-2. SOLID Principles with OOP Examples

## (5) Dependency Inversion Principle (DIP) with OOP

Or, see the corresponding [FP version.](../fp/5_dependency_inversion.md)

### ■ Description

HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

### ■ Solution

Fix the HIGH-LEVEL modules to depend on abstractions.  
In aonther word, depend on an interface rather than a class.

### ■ Examples

If you are in hurry,
you can [check out the shorter version.](#good_vs_bad)

#### (a) BEFORE

This is a program for managing profile data. You will implement a program  
so that it would save the data to cookies, and also to fetch them.

##### Assignment

> How would you implement `Profile`?

```ts
const COOKIE_DAYS = 90;

type ProfileData = {
  name: string;
  age: number;
};

/**
 * LOW-LEVEL
 */
class Cookies<T> {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public save(data: T) {
    const d = new Date();
    d.setTime(
      d.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${this.name}=${JSON.stringify(data)}`,
      `expires=${d.toUTCString()}`,
      `path=/`,
    ].join('; ');
  }

  public fetch(): T {
    const match = `${this.name}=`;
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
  }
}

/**
 * HIGH-LEVEL
 *
 * How would you implement 'Profile'?
 */
class Profile {
  private storage;
  constructor() {}
  public save() {}
  public fetch() {}
}

{
  const data: ProfileData = { name: 'Joe', age: 10 };
  // Later, we want the following:
  //
  // const storage = new Cookies('profile');
  // const prof = new Profile(storage);
  // prof.save(data);
}
```

- [5_dependency_inversion/oop/before.ts](../../src/5_dependency_inversion/oop/before.ts)
  - Or, FP version:  
[5_dependency_inversion/fp/before.js](../../src/5_dependency_inversion/fp/before.js)


#### (b) AFTER (BAD)

You see a BAD version bellow:

```ts
const COOKIE_DAYS = 90;

type ProfileData = {
  name: string;
  age: number;
};

/**
 * Low-level
 */
class Cookies<T> {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public save(data: T) {
    const d = new Date();
    d.setTime(
      d.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${this.name}=${JSON.stringify(data)}`,
      `expires=${d.toUTCString()}`,
      `path=/`,
    ].join('; ');
  }

  public fetch(): T {
    const match = `${this.name}=`;
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
  }
}

/**
 * HIGH-LEVEL
 */
class Profile {
  private storage: Cookies<ProfileData>; // No!!!

  constructor(storage: Cookies<ProfileData>) {
    this.storage = storage;
  }

  public save(data: ProfileData) {
    this.storage.save(data);
  }

  public fetch(): ProfileData {
    return this.storage.fetch();
  }
}

{
  const data: ProfileData = { name: 'Joe', age: 10 };
  const storage = new Cookies('profile');
  const prof = new Profile(storage);
  prof.save(data);
}
```

As DIP (Dependency Inversion Principle) suggests, we should avoid  
having the HIGH-LEVEL class (`Profile`) to depend on  
the LOW-LEVEL class (`Cookies`).

- [5_dependency_inversion/oop/after_bad.ts](../../src/5_dependency_inversion/oop/after_bad.ts)
  - Or, FP version:  
[5_dependency_inversion/fp/after_bad.js](../../src/5_dependency_inversion/fp/after_bad.js)


#### (c) AFTER (GOOD)

Instead of the HIGH-LEVEL (`Profile`) depends on  
the LOW-LEVEL (`Cookies`), we want to reverse  
the dependency, and have the HIGH-LEVEL (`Profile`)  
depends on the newly introduced abstraction (`GenericStorage`).

```ts
const COOKIE_DAYS = 90;

type ProfileData = {
  name: string;
  age: number;
};

// A new abstraction introduced.
interface GenericStorage<T> {
  save(data: T): void;
  fetch(): T;
}

/**
 * Low-level
 */
class Cookies<T> implements GenericStorage<T> { // Good!
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public save(data: T) {
    const d = new Date();
    d.setTime(
      d.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${this.name}=${JSON.stringify(data)}`,
      `expires=${d.toUTCString()}`,
      `path=/`,
    ].join('; ');
  }

  public fetch(): T {
    const match = `${this.name}=`;
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
  }
}

/**
 * HIGH-LEVEL
 */
class Profile {
  private storage: GenericStorage<ProfileData>; // Good!

  constructor(storage: GenericStorage<ProfileData>) {
    this.storage = storage;
  }

  public save(data: ProfileData) {
    this.storage.save(data);
  }

  public fetch(): ProfileData {
    return this.storage.fetch();
  }
}

{
  const data: ProfileData = { name: 'Joe', age: 10 };
  const storage = new Cookies('profile');
  const prof = new Profile(storage);
  prof.save(data);
}
```

`Profile` no longer depends on the LOW-LEVEL,  
but it now depends on the abstraction (`GenericStorage`).

- [5_dependency_inversion/oop/after_good.ts](../../src/5_dependency_inversion/oop/after_good.ts)
  - Or, FP version:  
[5_dependency_inversion/fp/after_good.js](../../src/5_dependency_inversion/fp/after_good.js)

<a name="good_vs_bad"></a>
### ■ GOOD vs BAD

To quickly grasp the idea behind, have a look at this shorter version:

#### BAD

See how `Profile` class depends on `Cookie` class?

```js
// LOW-LEVEL
class Cookies<T> {
  constructor
  save(data: T): void
  fetch(): T
}

// HIGH-LEVEL
class Profile {
  // Too specific!
  storage: Cookies<ProfileData>; // No!!!

  constructor(storage: Cookies<ProfileData>)
  save(data: ProfileData): void
  fetch(): ProfileData
}
```

#### GOOD

Reverse the dependency (avoid `Profile` class to depend on `Cookie` class),  
and let `Cookie` class depend on `GenericStorage` interface.

```js
// ABSTRACTION!
interface GenericStorage<T> {
  save(data: T): void;
  fetch(): T;
}

// LOW-LEVEL
class Cookies<T> implements GenericStorage<T> { // Good!
  save(data: T): void
  fetch(): T
}

// HIGH-LEVEL
class Profile {
  // Depending on abstraction!
  storage: GenericStorage<ProfileData>; // Good!

  constructor(storage: GenericStorage<ProfileData>)
  save(): void
  fetch(): ProfileData
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
