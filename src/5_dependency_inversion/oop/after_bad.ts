/**
 * @module solid_crockford/5_dependency_inversion/oop/after_bad
 */

const COOKIE_DAYS = 90;

type ProfileData = {
  name: string;
  age: number;
};

/**
 * Low-level
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
  /**
   * As DIP (Dependency Inversion
   * Principle) suggests, we should
   * avoid having the HIGH-LEVEL class
   * ('Profile') to depend on the low-
   * level class ('Cookies').
   */
  private storage: Cookies<ProfileData>;

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
