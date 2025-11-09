import { users } from "./auth.model.ts";
import { category } from "./category.model.ts";
import { product } from "./products.model.ts";

category.hasMany(product, {
    foreignKey: "category_id",
    as: "products",
});
product.belongsTo(category, {
    foreignKey: "category_id",
    as: "category",
});

category.belongsTo(users, {
    foreignKey: "owner_id",
    as: "owner",
});

users.hasMany(category, {
    foreignKey: "owner_id",
    as: "categories",
});

category.belongsTo(users, {
    foreignKey: "user_id",
    as: "user_belongsTo",
});

users.hasMany(product, {
    foreignKey: "user_id",
    as: "product_hasMany",
});


export { category, product, users }