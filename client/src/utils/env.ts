export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD

interface ClientConfig {
  serverUrl: string
  appVersion: string
  baseUrl: string
}

export function getClientConfig(): ClientConfig {
  if (window.__CLIENT_CONFIG__) {
    return window.__CLIENT_CONFIG__
  }
  return {
    serverUrl: '',
    appVersion: '',
    baseUrl: '/client/',
  }
}
