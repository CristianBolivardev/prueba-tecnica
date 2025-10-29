import { 
    getAllProducts as getAllProductsModel, 
    getProductById as getProductByIdModel, 
    createProduct as createProductModel, 
    updateProduct as updateProductModel, 
    deleteProduct as deleteProductModel } from "../models/productModel.js";

export const getAllProducts = (req, res) => {
    getAllProductsModel((err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener los productos" });
        res.json(results);
    });
};

export const getProductById = (req, res) => {
    getProductByIdModel(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener el producto" });
        res.json(results);
    });
};

export const createProduct = (req, res) => {
    createProductModel(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al crear el producto" });
        res.json({ message: "Producto creado correctamente", product: results });
    });
};

export const updateProduct = (req, res) => {
    updateProductModel(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al actualizar el producto" });
        res.json({ message: "Producto actualizado correctamente", product: results });
    });
};

export const deleteProduct = (req, res) => {
    deleteProductModel(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al eliminar el producto" });
        res.json({ message: "Producto eliminado correctamente", product: results });
    });
};