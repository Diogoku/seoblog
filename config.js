export const API = process.env.NEXT_PUBLIC_PRODUCTION
  ? process.env.NEXT_PUBLIC_API_PRODUCTION
  : process.env.NEXT_PUBLIC_API_DEVELOPMENT;

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const DOMAIN = process.env.NEXT_PUBLIC_PRODUCTION
  ? process.env.NEXT_PUBLIC_DOMAIN_PRODUCTION
  : process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT;

export const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

export const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
