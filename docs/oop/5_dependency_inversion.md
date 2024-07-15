# 2-1. SOLID Principles with OOP Examples

- [Top](../../README.md)
- [OOP (Object Oriented Programming) Examples](./oop.md)
  - [(1) Single Responsibility Principle (SRP)](1_single_responsibility.md)
  - [(2) Open-Closed Principle (OCP)](2_open_closed.md)
  - [(3) Liskov Substitution Principle (LSP)](3_liskov_substitution.md)
  - [(4) Interface Segragation Principle (ISP)](4_interface_segragation.md)
  - [(5) Dependency Inversion Principle (DIP)](5_dependency_inversion.md)
- [FP (Functional Programming) Examples](../fp/fp.md)

## (5) Dependency Inversion Principle (DIP) with OOP

HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

### ■ Solution

Fix the HIGH-LEVEL modules to depend on abstractions.  
In aonther word, depend on an interface rather than a class.

### ■ Examples

#### (a) BEFORE

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
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public save(data: T) {
    const d = new Date();
    d.setTime(
      d.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${this.key}=${JSON.stringify(data)}`,
      `expires=${d.toUTCString()}`,
      `path=/`,
    ].join('; ');
  }
}

/**
 * HIGH-LEVEL
 */
class Profile {
  private storage;
  constructor() {}
  public save() {}
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
 * LOW-LEVEL
 */
class Cookies<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public save(data: T) {
    ...
    ...
  }
}

/**
 * HIGH-LEVEL
 */
class Profile {
  private storage: Cookies<ProfileData>;

  // No!!!!
  constructor(storage: Cookies<ProfileData>) {
    this.storage = storage;
  }

  public save(data: ProfileData) {
    this.storage.save(data);
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
}

/**
 * LOW-LEVEL
 */
class Cookies<T> implements GenericStorage<T> { // Good!
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public save(data: T) {
    ...
    ...
  }
}

/*
 * HIGH-LEVEL
 */
class Profile {
  private storage: GenericStorage<ProfileData>;

  constructor(storage: GenericStorage<ProfileData>) {
    this.storage = storage;
  }

  public save(data: ProfileData) {
    this.storage.save(data);
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
