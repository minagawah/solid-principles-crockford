# solid-principles-crockford

## 1. About

It is often considered SOLID principles are for OOP only, but it applies to FP as well.

We will first look into OOP examples. Once grasped the basic ideas, we will move on to FP examples.
With this comparison, we should be able to see the benefits in applying SOLID principles on FP.

The aim here is to encourage you in writing more FP codes for your future projects,
and to let you enjoy the fruits of FP while preventing your codes from violating SOLID principles.

### 1-1. FP

As you may have noticed, the term *"FP"* is not used here in regular terms.  
For FP in our examples means:

- No ES6 `class` syntaxes
- No `this` keywords
- Uses a factory pattern instead of `new` keywords
- Uses the prototypal inheritance when extending variants

In another word, it follows the pattern known as
[Crockford's method](https://www.crockford.com/javascript/prototypal.html).

### 1-2. JSDoc

If I were to only give examples, I could have used Gist.
But, I curated into a Github repo so that it should give you a showcase of *JSDoc* usages.

If you are interested in more *JSDoc* examples,
[I have another project](https://github.com/minagawah/rawjs-generate)
in which I have a plenty of *JSDoc* comments
which focuses on describing module relations.

## 2. Understanding SOLID Principles

1. **Single Responsibility Principle (SRP)**
• [OOP](./docs/oop/1_single_responsibility.md) • [FP](./docs/fp/1_single_responsibility.md)  
There should be only one reason to change a module.
2. **Open-Closed Principle (OCP)**
• [OOP](./docs/oop/2_open_closed.md) • [FP](./docs/fp/2_open_closed.md)  
A module should be open for extension, but should be closed for modification.
3. **Liskov Substitution Principle (LSP)**
• [OOP](./docs/oop/3_liskov_substitution.md) • [FP](./docs/fp/3_liskov_substitution.md)  
If you substitute a sub-class for the parent, and breaks, then the sub-class violates LCP.
4. **Interface Segragation Principle (ISP)**
• [OOP](./docs/oop/4_interface_segragation.md) • [FP](./docs/fp/4_interface_segragation.md)  
You should not implement interfaces that are not used.
5. **Dependency Inversion Principle (DIP)**
• [OOP](./docs/oop/5_dependency_inversion.md) • [FP](./docs/fp/5_dependency_inversion.md)  
HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

Bonus:  
- [2-3. React Examples](./docs/react.md)

## 3. For Developers

### 3-1. Development

To generate `*.d.ts` files to `/types`:

```
npm run type:generate
```

To generate JSDoc documents to `/jsdoc`:

```
npm run jsdoc
```

### 3-2. Installed NPM Packages

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

## 4. License

Dual-licensed under either of the followings.  
Choose at your option.
The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE)) MIT license ([LICENSE.MIT](LICENSE.MIT))
