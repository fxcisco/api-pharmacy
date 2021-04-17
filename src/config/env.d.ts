interface SERVER_URLS {
  CLIENT_DOMAIN: string;
  CLIENT_ADDRESS: string;
}

interface SERVER_INTERNALS {
  MONGO_CLOUD: string;
}

interface SERVER_DATABASES {}
interface SERVER_API_KEYS {}

declare namespace NodeJS {
  export interface ProcessEnv
    extends SERVER_URLS,
      SERVER_INTERNALS,
      SERVER_DATABASES,
      SERVER_API_KEYS {}
}
