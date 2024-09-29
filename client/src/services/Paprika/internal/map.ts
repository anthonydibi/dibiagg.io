export const mapRecipe = (recipe: FullRecipe): MappedFullRecipe => {
    return {
        uid: recipe.uid,
        name: recipe.name,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        description: recipe.description,
        servings: recipe.servings,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        total_time: recipe.total_time,
        source: recipe.source,
        categories: recipe.categories,
        photo_url: recipe.photo_url,
        image_url: recipe.image_url,
    };
}

export const mapToRecipesById = (recipes: FullRecipe[]): Record<string, MappedFullRecipe> => {
    return recipes.reduce((acc, recipe) => {
        acc[recipe.uid] = mapRecipe(recipe);
        return acc;
    }, {} as Record<string, MappedFullRecipe>);
}

export const mapToRecipeIdsByCategoryId = (recipes: FullRecipe[]): Record<string, string[]> => {
    return recipes.reduce((acc, recipe) => {
        recipe.categories.forEach(categoryId => {
            if (!acc[categoryId]) {
                acc[categoryId] = [];
            }
            acc[categoryId].push(recipe.uid);
        });
        return acc;
    }, {} as Record<string, string[]>);
}

export const mapToRecipeIdByRecipeName = (recipes: FullRecipe[]): Record<string, string> => {
    return recipes.reduce((acc, recipe) => {
        acc[recipe.name] = recipe.uid;
        return acc;
    }, {} as Record<string, string>);
}

export const mapToCategoriesById = (categories: Category[]): Record<string, Category> => {
    return categories.reduce((acc, category) => {
        acc[category.uid] = category;
        return acc;
    }, {} as Record<string, Category>);
}