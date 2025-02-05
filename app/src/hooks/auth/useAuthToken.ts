import { useStorage } from "@vueuse/core";
import AuthToken from "../../types/AuthToken";
const AUTH_TOKEN_NAME = "_app_authTkn";
const authTokenStorageState = useStorage(AUTH_TOKEN_NAME, "");

const useAuthToken = () => {
  function getToken(): string | null {
    return authTokenStorageState.value;
  }

  function hasToken(): boolean {
    return getToken() !== null && getToken()?.trim() !== "";
  }

  function setToken(token: string): void {
    authTokenStorageState.value = token;
  }

  function getAuthTokenStateValue(): AuthToken {
    return JSON.parse(authTokenStorageState.value);
  }

  function tokenHasValidExpirationDate(): boolean {
    const tokenExpirationDate = new Date(getAuthTokenStateValue().validade).toLocaleString('pt-BR');
    const currentDate = new Date().toLocaleString('pt-BR');

    return tokenExpirationDate > currentDate;
  }

  function clearToken(): void {
    authTokenStorageState.value = "";
  }

  return {
    AUTH_TOKEN_NAME,
    hasToken,
    getToken,
    setToken,
    getAuthTokenStateValue,
    tokenHasValidExpirationDate,
    clearToken
  };
};

export default useAuthToken;
