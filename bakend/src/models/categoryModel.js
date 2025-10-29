import db from "../config/db.js";

export const getAllCategories = (callback) => {
    db.query("SELECT * FROM categorias", callback);
};

export const getCategoryById = (id, callback) => {
    db.query("SELECT * FROM categorias WHERE id = ?", [id], callback);
};

export const createCategory = (data, callback) => {
    const { name } = data;

    db.query("INSERT INTO categorias (name) VALUES (?)", [name], callback);
};

export const updateCategory = (id, data, callback) => {
    const { name } = data;
    db.query("UPDATE categorias SET name = ? WHERE id = ?", [name, id], callback);
};

export const deleteCategory = (id, callback) => {
    db.query("DELETE FROM categorias WHERE id = ?", [id], callback);
};