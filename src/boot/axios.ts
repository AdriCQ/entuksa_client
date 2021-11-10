import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { IDictionary } from 'src/types';
import { userStore } from 'src/modules';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties
  {
    $axios: AxiosInstance;
  }
}
const baseURL = process.env.DEV ? 'http://localhost:3000' : 'https://srv.entuksa.nairda.net';
const APP_TOKEN = '1|$argon2i$v=19$m=4096,t=3,p=1$EOHefdy1LeKmgLhRRj7Qow$rRPr4sO3+O9Aa/8YqZDnxTMPzQ/BUo4ZShXn5P5oeBE';

const api = axios.create({
  baseURL,
  timeout: 30000,
  timeoutErrorMessage: 'Error en la red',
});

export default boot(async ({ app }) =>
{
  await userStore.load();
  /**
   * Api request Interceptor
   */
  api.interceptors.request.use((_request) =>
  {
    /* Append content type header if its not present */
    if (!(_request.headers as IDictionary)['Content-Type'])
    {
      (_request.headers as IDictionary)['Content-Type'] = 'application/json';
    }

    /* Check if authorization is set */
    if (!(_request.headers as IDictionary)['Authorization'])
    {
      /* Check if the user is authenticated to send Bearer token */
      const token = userStore.authToken;
      if (token && token.length > 0)
      {
        (_request.headers as IDictionary).Authorization = 'Bearer ' + token;
      } else
      {
        /* Send the application authentication as Bearer token */
        (_request.headers as IDictionary).Authorization = 'Bearer ApiToken';
      }
    }
    if (!(_request.headers as IDictionary)['X-App-Token'])
    {
      (_request.headers as IDictionary)['X-App-Token'] = APP_TOKEN;

    }
    return _request;
  });

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
