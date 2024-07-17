# 2-3. SOLID Principles in React examples

Examples on React should help those who write React codes.

## (1) Single Responsibility Principle (SRP)

### ■ Description

There should be only one reason to change a module.  
For instance, you fixed a part in your module which manages A.  
Yet, you found out it impacted another part of the module which manages B.  
If such the case, then you are violating SRP (Single Responsibility Principle).

### ■ Solution

Split the jobs into different modules.

### BAD

The bellow component handles too many things at once:

```jsx
const Payments = () => {
  const payments = await fetchPayments();
  return <div>
    {payments.map(payment => (
      <div key={payment.id}>
        <div>{payment.name}</div>
        <div>{payment.price}</div>
      </div>
    ))}
  </div>;
}
```

### GOOD

Introduce a new component to split roles:

```jsx
const Payment = ({ payment } => (
  <div key={payment.id}>
    <div>{payment.name}</div>
    <div>{payment.price}</div>
  </div>
);

// Ask 'Payment' to handle the visuals.
const Payments = () => {
  const payments = await fetchPayments();
  return <div>
    {payments.map(payment => (
      <Payment key={payment.id} payment={payment} />
    ))}
  </div>;
}
```

## (2) Open-Closed Principle (OCP)

### ■ Description

A module should be open for extension, but should be closed for modification.  
In another word, you should not bring in any breaking changes.

### ■ Solution

When you add a new feature, instead of fixing the existing mechanisms,
you should add a new mechanism.

### BEFORE

#### Assignment

> For the following, pass `discount`.

```jsx
const Price = ({ price }) => (
  <div>
    <div>{price} JPY</div>
  </div>
);

const Product = product => (
  <div>
    <div>{product.name}</div>
    <Price price={product.price} />
  </div>
);
```

### BAD

Don't you dare change existing codes.

```jsx
// Avoid modifying existing components
const Price = ({ price, discount }) => (
  <div>
    <div>{price} JPY</div>
    <div>{discount} JPY</div>
  </div>
);

const Product = product => (
  <div>
    <div>{product.name}</div>
    <Price
      price={product.price}
      discount={product.discount}
    />
  </div>
);
```

### GOOD

Instead of bringing in a breaking change to  
the existing components, add a new component.

```jsx
// A new component (1)
const DiscountPrice = ({ price, discount }) => (
  <div>
    <Price price={price} />
    <div>{discount} JPY</div>
  </div>
);

// A new component (2)
const Price = ({ price }) => <div>{price} JPY</div>;

const Product = ({ product }) => (
  <div>
    <div>{product.name}</div>
    <DiscountPrice
      price={product.price}
      discount={product.discount}
    />
  </div>
);
```

## (3) Liskov Substitution Principle (LSP)

### ■ Description

> Let P(y) be a property provable about objects y of type A.  
> Then P(x) should be true for objects x of type B where B is a subtype of A.

Sounds complicated, doesn't it?  
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

### BAD

When using `Person` (parent), it works.  
When using `Developer` (sub-class), it throws an error  
because you forget to pass `food` in `Developer` component.

```jsx
const Person = ({ food, drink, place }) => (
  <span>
    I eat {food()}, drink {drink()}, and sleep at {place()}.
  </span>
);

const Developer = ({ drink, place }) => {
  const developerDrink = () => 'coffee';
  return (
    <Person
      drink={developerDrink}
      place={place}
    />
  );
};

const Home = () => {
  const food = () => 'bread';
  const drink = () => 'water';
  const place = () => 'home';
  return (
    <Developer food={food} drink={drink} place={place} />
  );
};
```

### GOOD

Fix `Developer` to not fail.  
Note, for this time, we are passing `{...props}`.

```jsx
const Person = ({ food, drink, place }) => (
  <span>
    I eat {food()}, drink {drink()}, and sleep at {place()}.
  </span>
);

const Developer = ({ drink, place, ...props }) => {
  const developerDrink = () => 'coffee';
  return (
    <Person
      drink={developerDrink}
      place={place}
      {...props}
    />
  );
};

const Home = () => {
  const food = () => 'bread';
  const drink = () => 'water';
  const place = () => 'home';
  return (
    <Developer food={food} drink={drink} place={place} />
  );
};
```


## (4) Interface Segragation Principle (ISP)

### ■ Description

You should not implement interfaces that are not used.

### ■ Solution

Divide your interfaces into smaller modules.

### BAD

You are passing too many stuff to `Drink`.

```jsx
const Drink = ({ data }) => (
  <div>
    I drink {data.drink}.
  </div>
);

const Person = () => {
  const data = {
    food: 'bread',
    drink: 'water',
    place: 'home',
  };

  return <Drink data={data} />;
};
```

### GOOD

Pass only `drink` to `Drink` component.

```jsx
const Drink = ({ drink }) => (
  <div>
    I drink {drink}.
  </div>
);

const Person = () => {
  const data = {
    eat: 'bread',
    drink: 'water',
    sleep: 'home',
  };

  return <Drink drink={drink} />;
};
```


## (5) Dependency Inversion Principle (DIP)

### ■ Description

HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

### ■ Solution

Fix the HIGH-LEVEL modules to depend on abstractions.  
In aonther word, depend on an interface rather than a class.

### BAD

`Profile` (HIGH-LEVEL) depends on `useCookies` which is too specific.

```jsx
// LOW-LEVEL
const useCookies = key => {
  const write = data => {
    const date = new Date();
    date.setTime(
      date.getTime() + 24 * 60 * 60 * 1000 * 90
    );
    document.cookie = [
      `${this.key}=${JSON.string(data)}`,
      `expires=${date.toUTCString()}`,
      `path=/`,
    ].join('; ');
  };
  return [write];
};

// HIGH-LEVEL
const Profile = () => {
  const [saveCookies] = useCookies('profile');
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <button
          onClick={() => saveCookies({
            name: 'Joe',
            age: 10,
          })}
        />
    </div>
  );
};
```

### GOOD

Introduce `useStorage` as a proxy for `useCookies`  
so that `Profile` (HIGH-LEVEL) will depend on  
more an abstraction.

```jsx
// ABSTRACTION
const useStorage = callback => {
  const save = data => {
    callback(data);
  };
  return [save];
};

// LOW-LEVEL
const useCookies = key => {
  const write = data => {
    const date = new Date();
    date.setTime(
      date.getTime() + 24 * 60 * 60 * 1000 * 90
    );
    document.cookie = [
      `${this.key}=${JSON.string(data)}`,
      `expires=${date.toUTCString()}`,
      `path=/`,
    ].join('; ');
  };
  return [write];
};

// HIGH-LEVEL
const Profile = () => {
  const [saveCookies] = useCookies('profile');
  const [saveStorage] = useStorage(saveCookies);
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <button
          onClick={() => saveStorage({
            name: 'Joe',
            age: 10,
          })}
        />
      </div>
    </div>
  );
};
```

