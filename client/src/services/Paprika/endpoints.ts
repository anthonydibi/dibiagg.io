const v1BaseURL = 'https://www.paprikaapp.com/api/v1';
const v2BaseURL = 'https://www.paprikaapp.com/api/v2';

export const PaprikaEndpoints = {
  Auth: `${v1BaseURL}/account/login`,
  GetRecipes: `${v2BaseURL}/sync/recipes`,
  GetRecipe: `${v2BaseURL}/sync/recipe/:uid`,
  GetCategories: `${v2BaseURL}/sync/categories`,
};
