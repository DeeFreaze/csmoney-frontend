const env = process.env.VUE_APP_ENV;

let envApiUrl = '';
let frontEndUrl = '';
let apiBackWsUrl = '';

if (env === 'production') {
    envApiUrl = `https://${process.env.VUE_APP_API_DOMAIN_PROD}`;
    frontEndUrl = `https://${process.env.VUE_APP_DOMAIN_PROD}`;
    apiBackWsUrl = `wss://${process.env.VUE_APP_API_DOMAIN_PROD}`;
} else {
    envApiUrl = `http://${process.env.VUE_APP_DOMAIN_DEV}`;
    frontEndUrl = `http://${process.env.VUE_APP_REDIRECT_DEV}`;
    apiBackWsUrl = `ws://${process.env.VUE_APP_DOMAIN_DEV}`;
}

export const appName = process.env.VUE_APP_NAME;
export const apiUrl = envApiUrl;
export const frontUrl = frontEndUrl;
export const wsURL = apiBackWsUrl;