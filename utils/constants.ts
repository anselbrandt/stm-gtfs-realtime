// Expose environment variables to the browser by prefixing with NEXT_PUBLIC_

export const APIKEY = process.env.NEXT_PUBLIC_APIKEY as string;
export const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
export const IS_PROD = process.env.VERCEL_ENV === "production" ? true : false;
