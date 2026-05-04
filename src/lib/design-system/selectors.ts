import { ROLE_ACCENTS, RoleLane } from './roleAccents';
import { PROJECT_ACCENT_RECIPES, ProjectAccent } from './projectAccents';
import { CATEGORY_ACCENTS, CategoryAccent } from './categoryAccents';
import { STATUS_COLORS } from './statusColors';

export const getRoleAccentRecipe = (lane: RoleLane) => ROLE_ACCENTS[lane];
export const getProjectAccentRecipe = (accent: ProjectAccent) => PROJECT_ACCENT_RECIPES[accent];
export const getCategoryAccentRecipe = (category: CategoryAccent) => CATEGORY_ACCENTS[category];
export const getStatusRecipe = (status: keyof typeof STATUS_COLORS) => STATUS_COLORS[status];
