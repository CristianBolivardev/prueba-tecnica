import { 
    getAllCategories as getAllCategoriesModel, 
    getCategoryById as getCategoryByIdModel, 
    createCategory as createCategoryModel, 
    updateCategory as updateCategoryModel, 
    deleteCategory as deleteCategoryModel } from "../models/categoryModel.js";

export const getAllCategories = (req, res) => {
    getAllCategoriesModel((err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener las categorias" });
        res.json(results);
    });
};

export const getCategoryById = (req, res) => {
    getCategoryByIdModel(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener la categoria" });
        res.json(results);
    });
};

export const createCategory = (req, res) => {
    createCategoryModel(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al crear la categoria" });
        res.json({ message: "Categoria creada correctamente", category: results });
    });
};

export const updateCategory = (req, res) => {
    updateCategoryModel(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al actualizar la categoria" });
        res.json({ message: "Categoria actualizada correctamente", category: results });
    });
};

export const deleteCategory = (req, res) => {
    deleteCategoryModel(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al eliminar la categoria" });
        res.json({ message: "Categoria eliminada correctamente", category: results });
    });
};