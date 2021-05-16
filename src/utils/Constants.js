// export const AUTH_URL = "http://167.172.220.53/api/auth";
// export const BASE_URL = "http://167.172.220.53/api/app";
// export const BILLING_URL = "http://167.172.220.53/api/payment";

export const apiBaseUrl = process.env.API_BASE_URL;

export const AUTH_URL = `${apiBaseUrl}/auth`;
export const BASE_URL = `${apiBaseUrl}/app`;
export const BILLING_URL = `${apiBaseUrl}/payment`;
