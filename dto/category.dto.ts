export interface CreateCategoryDTO {
    name: string;
    image: string;
    owner_id: number;
}
export interface UpdateCategoryDTO {
    name?: string;
    image?: string;
}