/**
 * @module solid_crockford/5_dependency_inversion/oop/before
 */

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
