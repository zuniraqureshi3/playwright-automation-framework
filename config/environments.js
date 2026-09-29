/**
 * @typedef {'qa' | 'staging'} EnvironmentName
 */

/** @type {Record<EnvironmentName, {baseURL: string}>} */
const environments = {
    qa: {
        baseURL: 'https://www.saucedemo.com'
    },

    staging: {
        baseURL: 'https://www.saucedemo.com'
    }
};

export { environments };