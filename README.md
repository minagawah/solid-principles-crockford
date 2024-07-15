# solid-principles-crockford

## 1. About

This is an attempt in providing resources for understanding SOLID principles.
Often a time, SOLID principles are considered practices only applicable to OOP.
However, they are highly beneficial to FP as well.
We will first begin with OOP examples. Then, we will move on to FP examples.
By comparing examples in OOP and FP, the material should bring you unique insights.

## 2. Notes

As you may notice, the term "FP" is not used in a strict sense.
It means of a style which:

- Has no ES6 syntaxes
- No `this` keyword
- Instead of `new`, use factory patterns.
- Using prototypal inheritance to extend variants.

In another word, it follows the pattern known as [Crockford's method](https://www.crockford.com/javascript/prototypal.html).

## 3. Understanding SOLID Principles

Comparing 2 different programming styles,
it should bring you a new perspective on SOLID principles.

- [2-1. OOP (Object Oriented Programming)](./docs/oop/oop.md)
- [2-2. FP (Functional Programming)](./docs/fp/fp.md)

Here's the excerpts from the above documents:

1. **Single Responsibility Principle (SRP)** • [OOP](./docs/oop/1_single_responsibility.md) • [FP](./docs/fp/1_single_responsibility.md)  
There should be only one reason to change a module.
2. **Open-Closed Principle (OCP)** • [OOP](./docs/oop/2_open_closed.md) • [FP](./docs/fp/2_open_closed.md)  
A module should be open for extension, but should be closed for modification.
3. **Liskov Substitution Principle (LSP)** • [OOP](./docs/oop/3_liskov_substitution.md) • [FP](./docs/fp/3_liskov_substitution.md)  
If you substitute a sub-class for the parent, and breaks, then the sub-class violates LCP.
4. **Interface Segragation Principle (ISP)** • [OOP](./docs/oop/4_interface_segragation.md) • [FP](./docs/fp/4_interface_segragation.md)  
You should not implement interfaces that are not used.
5. **Dependency Inversion Principle (DIP)** • [OOP](./docs/oop/5_dependency_inversion.md) • [FP](./docs/fp/5_dependency_inversion.md)  
HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

Bonus:  
- [2-3. React Examples](./docs/react.md)

## 4. For Developers

If I were to only provide code samples, I could have written a Gist.
But, I made it into a Github repo because I wanted to make this a showcase for **JSDoc** usage as well.


### 4-1. Development

To generate `*.d.ts` files to `/types`:

```
npm run type:generate
```

To generate JSDoc documents to `/jsdoc`:

```
npm run jsdoc
```

### 4-2. Installed NPM Packages

#### Babel

- core-js
- @babel/cli
- @babel/core
- @babel/preset-env
- babel-loader

#### ESLint & Prettier

- prettier
- eslint
- eslint-config-prettier
  - Filters out all the ESLint rules which conflict with Prettier.
- eslint-plugin-prettier
  - Orchestrates ESLint and Prettier together.
- @stylistic/eslint-plugin
  - New way of setting rules

#### JSDoc

- jsdoc
- jsdoc-tsimport-plugin
- jsdoc-plugin-intersection
- typescript

#### Jest

- jest
- babel-jest

#### Others

- ramda
- @types/ramda

```
npm install --save core-js ramda;

npm install --save-dev @babel/cli @babel/core @babel/preset-env babel-loader \
  prettier eslint eslint-config-prettier eslint-plugin-prettier @stylistic/eslint-plugin \
  jsdoc jsdoc-tsimport-plugin jsdoc-plugin-intersection \
  typescript jest babel-jest;
```

## 5. License

Dual-licensed under either of the followings.  
Choose at your option.
The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE)) MIT license ([LICENSE.MIT](LICENSE.MIT))
