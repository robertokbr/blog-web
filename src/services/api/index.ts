import { AxiosAPI } from "./client";

const apiProviders = { axios: AxiosAPI };

export const Api = apiProviders.axios;

export const apiProvider = {
  useFactory: () => new Api(),
};
