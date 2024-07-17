/* eslint-disable no-unused-vars */
/**
 * @module solid_crockford/5_dependency_inversion/fp/before
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
 * @template T
 * @typedef CookiesContext
 * @type {Object}
 * @property {string} context
 * @property {Save<T>} save
 * @property {Fetch<T>} fetch
 */

/**
 * @template T
 * @function
 * @param {string} name
 * @returns {CookiesContext<T>}
 */
const cookiesFactory = name => {
  /**
   * @type {Save<T>}
   */
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

  /**
   * @type {Fetch<T>}
   */
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

  return Object.create({
    context: 'CookiesContext',
    cookie_name: name,
    save,
    fetch,
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
 * @function
 * @returns {ProfileContext}
 */
const profileFactory = () =>
  Object.create({
    context: 'ProfileContext',
    save: () => {},
    fetch: () => {},
  });

{
  const data = { name: 'Joe', age: 10 };

  // Later, we want the following:
  //
  // const profile = profileFactory();
  // profile.save(data);
}
