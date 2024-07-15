# 2-3. SOLID Principles in React examples

Let's understand SOLID principles with code examples written in React.

## (1) Single Responsibility Principle (SRP)

There should be only one reason to change a module.  
For instance, you fixed a part in your module which manages A.  
Yet, you found out it impacted another part in the module which manages B.  
If such the case, then you are violating SRP (Single Responsibility Principle).

### ■ Solution

Split the jobs into different modules.

### BAD

Responsible for too much actions!!

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

Split the role!

```jsx
const Payment = ({ payment } => (
  <div key={payment.id}>
    <div>{payment.name}</div>
    <div>{payment.price}</div>
  </div>
);

// Split the role!
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

A module should be open for extension, but should be closed for modification.  
In another word, you should not bring in any breaking changes.

### ■ Solution

When you add a new feature, instead of fixing the existing mechanisms,
you should add a new mechanism.

### BEFORE

For the following, pass `discount`.

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

```jsx
// Don't modify the existing component!!
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

```jsx
// Create a new component instead!!
const DiscountPrice = ({ price, discount }) => (
  <div>
    <Price price={price} />
    <div>{discount} JPY</div>
  </div>
);

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

> Let P(y) be a property provable about objects y of type A.  
> Then P(x) should be true for objects x of type B where B is a subtype of A.

Sounds complicated, right?  
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

```jsx
const Person = ({ food, drink, place }) => (
  <span>
    I eat {food()}, drink {drink()}, and sleep at {place()}.
  </span>
);

// This will result in error...
const Developer = ({ drink, place }) => {
  const developerDrink = () => 'coffee';
  return (
    {/* Are you not passing 'food'? */}
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

```jsx
const Person = ({ food, drink, place }) => (
  <span>
    I eat {food()}, drink {drink()}, and sleep at {place()}.
  </span>
);

// Passing the rest!!
const Developer = ({ drink, place, ...props }) => {
  const developerDrink = () => 'coffee';
  return (
    {/* We are passing '...props' now */}
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

You should not implement interfaces that are not used.

### ■ Solution

Divide your interfaces into smaller modules.

### BAD

```jsx
const Drink = ({ data }) => (
  <div>
    I eat {data.food} and drink {data.drink}.
  </div>
);

const Person = () => {
  const data = {
    food: 'bread',
    drink: 'water',
    place: 'home',
  };

  // Avoid passing stuff unused!
  return <Drink data={data} />;
};
```

### GOOD

```jsx
const Drink = ({ food, drink }) => (
  <div>
    I eat {food} and drink {drink}.
  </div>
);

const Person = () => {
  const data = {
    eat: 'bread',
    drink: 'water',
    sleep: 'home',
  };

  // Pass only the stuff being used.
  return <Drink drink={drink} />;
};
```


## (5) Dependency Inversion Principle (DIP)

HIGH-LEVEL modules should not depend on LOW-LEVEL modules.

### ■ Solution

Fix the HIGH-LEVEL modules to depend on abstractions.  
In aonther word, depend on an interface rather than a class.

### BAD

```jsx
const COOKIE_DAYS = 90;
const data = { name: 'Joe', age: 10 };

// Low-level
const useCookies = key => {
  const write = data => {
    const date = new Date();
    date.setTime(
      date.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${this.key}=${JSON.string(data)}`,
      `expires=${date.toUTCString()}`,
      `path=/`,
    ].join('; ');
  };
  return [write];
};

// High-level
const Profile = () => {
  // 'Profile' depends on 'saveCookies'
  const [saveCookies] = useCookies('profile');
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => saveCookies(data)} />
    </div>
  );
};
```

### GOOD

```jsx
const data = { name: 'Joe', age: 10 };

// Abstraction
// Takes a function to execute
const useStorage = f => {
  const save = data => {
    // ...
    f(data);
  };
  return [save];
};

// Low-level
const useCookies = key => {
  const write = data => {
    const date = new Date();
    date.setTime(
      date.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${this.key}=${JSON.string(data)}`,
      `expires=${date.toUTCString()}`,
      `path=/`,
    ].join('; ');
  };
  return [write];
};

// High-level
const Profile = () => {
  // Passing 'saveCookies' to 'useStorage'
  // and it is no longer tightly coupled.
  const [saveCookies] = useCookies('profile');
  const [saveStorage] = useStorage(saveCookies);
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => saveStorage(data)} />
    </div>
  );
};
```

