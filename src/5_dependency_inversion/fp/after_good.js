/**
 * @module solid_crockford/5_dependency_inversion/oop/after_good
 */
const COOKIE_DAYS = 90;

/**
 * @template T
 * @callback Save
 * @param {T} data
 * @returns {void}
 */

/**
 * @template T
 * @callback Fetch
 * @returns {T} data
 */

/**
 * A new abstraction introduced.
 * @template T
 * @typedef GenericStorageInterface
 * @type {Object}
 * @property {string} [context]
 * @property {Save<T>} save
 * @property {Fetch<T>} fetch
 */

/**
 * @template U
 * @function
 * @param {GenericStorageInterface<U>} storage
 * @returns {GenericStorageInterface<U>}
 */
const genericStorageInterface = storage => {
  const { save, fetch } = storage;
  return {
    context: 'GenericStorageInterface',
    save,
    fetch,
  };
};

/**
 * @template T
 * @typedef CookiesContext
 * @type {Object}
 * @property {string} context
 * @property {string} cookie_name
 * @property {Save<T>} save
 * @property {Fetch<T>} fetch
 */

/**
 * LOW-LEVEL
 *
 * @template T
 * @function
 * @param {string} name
 * @returns {CookiesContext<T>}
 */
const cookiesFactory = name => {
  /** @type {Save<T>} */
  const save = data => {
    const d = new Date();
    d.setTime(
      d.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS
    );
    document.cookie = [
      `${name}=${JSON.stringify(data)}`,
      `expires=${d.toUTCString()}`,
      `path=/`,
    ].join('; ');
  };

  /** @type {Fetch<T>} */
  const fetch = () => {
    const match = `${name}=`;
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
  };

  /*
   * Instead of the high-level
   * ('ProfileContext') depends on
   * the low-level ('CookiesContext'),
   * we want to reverse the dependency,
   * and have the high-level
   * ('ProfileContext') depends on
   * the newly introduced abstraction
   * ('GenericStorageInterface').
   */

  /**
   * @type {GenericStorageInterface<T>}
   */
  const generic = genericStorageInterface({ save, fetch });

  return Object.create({
    ...generic,
    context: 'CookiesContext',
    cookie_name: name,
  });
};

/**
 * @typedef ProfileData
 * @type {Object}
 * @property {string} name
 * @property {number} age
 */

/**
 * @typedef ProfileContext
 * @type {Object}
 * @property {string} context
 * @property {Save<ProfileData>} save
 * @property {Fetch<ProfileData>} fetch
 */

/**
 * HIGH-LEVEL
 *
 * 'ProfileContext' no longer depends
 * on the low-level, but it now depends
 * on the abstraction
 * ('GenericStorageInterface').
 *
 * @function
 * @param {GenericStorageInterface<ProfileData>} storage
 * @returns {ProfileContext}
 */
const profileFactory = storage => {
  const { save, fetch } = storage;
  return Object.create({
    context: 'ProfileContext',
    save,
    fetch,
  });
};

{
  /** @type {CookiesContext<ProfileData>} */
  const cookies = cookiesFactory('profile');

  /** @type {ProfileContext} */
  const profile = profileFactory(cookies);
  profile.save({ name: 'Joe', age: 10 });

  // You can simplify the call
  // by using 'compose' of Ramda.

  // R.compose(
  //   profileFactory,
  //   cookiesFactory,
  // )('profile').save(data);
}
