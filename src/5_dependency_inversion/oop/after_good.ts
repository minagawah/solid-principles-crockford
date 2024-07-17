/**
 * @module solid_crockford/5_dependency_inversion/oop/after_good
 */

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
 * LOW-LEVEL
 *
 * Instead of the HIGH-LEVEL ('Profile')
 * depends on the LOW-LEVEL ('Cookies'),
 * we want to reverse the dependency,
 * and have the HIGH-LEVEL ('Profile')
 * depends on the newly introduced
 * abstraction ('GenericStorage').
 */
class Cookies<T> implements GenericStorage<T> {
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
  /**
   * 'Profile' no longer depends on the
   * LOW-LEVEL, but it now depends on
   * the abstraction ('GenericStorage').
   */
  private storage: GenericStorage<ProfileData>;

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
