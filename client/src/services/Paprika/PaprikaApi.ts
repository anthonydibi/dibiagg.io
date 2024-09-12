import { buildEndpoint } from '../../utils/endpoints';
import { PaprikaEndpoints } from './endpoints';

export const getAuthToken = (email: string, password: string) => {
  return fetch(PaprikaEndpoints.Auth, {
    method: 'POST',
    signal: AbortSignal.timeout(5000),
    body: `email=${email}&password=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const getRecipes = (token: string) => {
  return fetch(PaprikaEndpoints.GetRecipes, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRecipe = (token: string, uid: string) => {
  return fetch(buildEndpoint(PaprikaEndpoints.GetRecipe, { uid }), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategories = (token: string) => {
  return fetch(PaprikaEndpoints.GetCategories, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
