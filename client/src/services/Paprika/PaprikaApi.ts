import { buildEndpoint } from '../../utils/endpoints';
import { req } from '../../utils/request';
import { PaprikaEndpoints } from './endpoints';

type GetAuthTokenResponse = {
  result: {
    token: string;
  };
};
export const getAuthToken = (email: string, password: string) => {
  return req<GetAuthTokenResponse>(PaprikaEndpoints.Auth, {
    method: 'POST',
    signal: AbortSignal.timeout(5000),
    body: `email=${email}&password=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

type GetRecipesResponse = {
  result: Recipe[];
};
export const getRecipes = (token: string) => {
  return req<GetRecipesResponse>(PaprikaEndpoints.GetRecipes, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type GetRecipeResponse = {
  result: FullRecipe;
};
export const getRecipe = (token: string, uid: string) => {
  return req<GetRecipeResponse>(buildEndpoint(PaprikaEndpoints.GetRecipe, { uid }), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type GetCategoriesResponse = {
  result: Category[];
};
export const getCategories = (token: string) => {
  return req<GetCategoriesResponse>(PaprikaEndpoints.GetCategories, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
