import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductForm({ onSave }) {
const [form, setForm] = useState({
name: "",
description: "",
price: "",
category_id: "",
});
const [categories, setCategories] = useState([]);

useEffect(() => {
api.get("/api/categories")
.then((res) => setCategories(res.data))
.catch((err) => console.error("Error al cargar categorías", err));
}, []);

const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
e.preventDefault();
try {
await api.post("/api/products", form);
alert("Producto creado correctamente");
setForm({ name: "", description: "", price: "", category_id: "" });
onSave && onSave();
} catch (err) {
console.error("Error al crear producto", err);
alert("Error al crear producto");
}
};

return (
<form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
<input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
<input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
<input name="price" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={handleChange} required />
<select name="category_id" value={form.category_id} onChange={handleChange} required >
<option value="">Selecciona categoría</option>
{categories.map((c) => (
<option key={c.id} value={c.id}>
{c.name}
</option>
))}
</select>
<button type="submit">Guardar</button>
</form>
);
}