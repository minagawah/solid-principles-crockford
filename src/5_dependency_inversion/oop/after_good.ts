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
}

/**
 * Low-level
 *
 * Instead of the HIGH-LEVEL ('Profile')
 * depends on the LOW-LEVEL ('Cookies'),
 * we want to reverse the dependency,
 * and have the HIGH-LEVEL ('Profile')
 * depends on the newly introduced
 * abstraction ('GenericStorage').
 */
class Cookies<T> implements GenericStorage<T> {
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
}

{
  const data: ProfileData = { name: 'Joe', age: 10 };
  const storage = new Cookies('profile');
  const prof = new Profile(storage);
  prof.save(data);
}
