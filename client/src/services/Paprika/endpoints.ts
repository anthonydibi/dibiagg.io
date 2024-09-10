const baseURL = 'https://www.paprikaapp.com/api/v2';

export const PaprikaEndpoints = {
  Auth: `${baseURL}/account/login`,
  GetRecipes: `${baseURL}/sync/recipes`,
  GetRecipe: `${baseURL}/sync/recipe/:uid`,
  GetCategories: `${baseURL}/sync/categories`,
};
