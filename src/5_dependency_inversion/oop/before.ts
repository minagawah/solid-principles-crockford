/**
 * Using localStorage:
 * window.localStorage.setItem(this.key, JSON.stringify(data));
 *
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
 *
 * How would you implement 'Profile'?
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
