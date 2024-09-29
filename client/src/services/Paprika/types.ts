// RECIPES
interface Recipe {
    uid: string;
}

interface FullRecipe {
    uid: string;
    name: string;
    ingredients: string;
    directions: string;
    description: string;
    notes?: string;
    nutritional_info?: string;
    servings?: string;
    difficulty?: string;
    prep_time?: string;
    cook_time?: string;
    total_time?: string;
    source: string;
    source_url: string;
    image_url: string;
    photo?: string;
    photo_hash?: string;
    photo_large?: string;
    scale?: string;
    hash: string;
    categories: string[];
    rating?: number;
    in_trash?: boolean;
    is_pinned?: boolean;
    on_favorites?: boolean;
    on_grocery_list?: boolean;
    created: string;
    photo_url: string;
}

// only send props we need
interface MappedFullRecipe {
    uid: string;
    name: string;
    ingredients: string;
    directions: string;
    description: string;
    servings?: string;
    prep_time?: string;
    cook_time?: string;
    total_time?: string;
    source: string;
    categories: string[];
    photo_url: string;
    image_url: string;
}

//CATEGORIES
interface Category {
    uid: string;
    order_flag: number;
    name: string;
    parent_uid: string | null;
};