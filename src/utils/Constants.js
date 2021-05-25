const domain = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "staging.odfs.app" : "odfs.app";

export const AUTH_URL = `https://${domain}/api/auth`;
export const BASE_URL = `https://${domain}/api/app`;
export const BILLING_URL = `https://${domain}/api/payment`;
