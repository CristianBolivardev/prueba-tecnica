import db from "../config/db.js";

export const getAllProducts = (callback) => {

    db.query("SELECT * FROM productos", callback);
};

export const getProductById = (id, callback) => {
    db.query("SELECT * FROM productos WHERE id = ?", [id], callback);
};

export const createProduct = (data, callback) => {
    const { name, description, price, category_id  } = data;
    db.query("INSERT INTO productos (name, description, price, category_id) VALUES (?, ?, ?, ?)", 
        [name, description, price, category_id], callback
    );
};

export const updateProduct = (id, data, callback) => {
    const { name, description, price, category_id } = data;
    db.query("UPDATE productos SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?", 
        [name, description, price, category_id, id], callback
    );
};

export const deleteProduct = (id, callback) => {
    db.query("DELETE FROM productos WHERE id = ?", [id], callback);
};