import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductList() {
const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const [searchId, setSearchId] = useState("");
const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({ name: "", description: "", price: "", category_id: "" });

const fetchAll = () => {
api.get("/api/products")
.then((res) => setProducts(res.data))
.catch((err) => console.error("Error al cargar productos", err));
};

useEffect(() => {
fetchAll();
api.get("/api/categories")
.then((res) => setCategories(res.data))
.catch((err) => console.error("Error al cargar categorías", err));
}, []);

const handleSearch = async () => {
if (!searchId) { fetchAll(); return; }
try {
const res = await api.get(`/api/products/${searchId}`);
setProducts(res.data ? [res.data] : []);
} catch (err) {
console.error("Error al buscar producto", err);
alert("Producto no encontrado");
setProducts([]);
}
};

const startEdit = (p) => {
setEditingId(p.id);
setEditForm({ name: p.name, description: p.description, price: p.price, category_id: p.category_id });
};

const cancelEdit = () => {
setEditingId(null);
setEditForm({ name: "", description: "", price: "", category_id: "" });
};

const saveEdit = async () => {
try {
await api.put(`/api/products/${editingId}`, editForm);
alert("Producto actualizado");
cancelEdit();
fetchAll();
} catch (err) {
console.error("Error al actualizar producto", err);
alert("No se pudo actualizar");
}
};

const deleteItem = async (id) => {
if (!confirm("¿Eliminar este producto?")) return;
try {
await api.delete(`/api/products/${id}`);
alert("Producto eliminado");
fetchAll();
} catch (err) {
console.error("Error al eliminar producto", err);
alert("No se pudo eliminar");
}
};

return (
<div>
<h2>Productos</h2>
<div style={{ marginBottom: "0.75rem" }}>
<input
type="number"
placeholder="Buscar por ID"
value={searchId}
onChange={(e) => setSearchId(e.target.value)}
style={{ marginRight: "0.5rem" }}
/>
<button onClick={handleSearch} style={{ marginRight: "0.5rem" }}>Buscar</button>
<button onClick={() => { setSearchId(""); fetchAll(); }}>Limpiar</button>
</div>
<table border="1" cellPadding="5">
<thead>
<tr>
<th>ID</th>
<th>Nombre</th>
<th>Descripción</th>
<th>Precio</th>
<th>Categoría</th>
<th>Acciones</th>
</tr>
</thead>
<tbody>
{products.length === 0 ? (
<tr><td colSpan="6">No hay productos</td></tr>
) : (
products.map((p) => (
<tr key={p.id}>
<td>{p.id}</td>
<td>
{editingId === p.id ? (
<input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
) : (
p.name
)}
</td>
<td>
{editingId === p.id ? (
<input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
) : (
p.description
)}
</td>
<td>
{editingId === p.id ? (
<input type="number" step="0.01" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
) : (
`$${p.price}`
)}
</td>
<td>
{editingId === p.id ? (
<select value={editForm.category_id} onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value })}>
<option value="">Selecciona categoría</option>
{categories.map((c) => (
<option key={c.id} value={c.id}>{c.name}</option>
))}
</select>
) : (
p.category_id
)}
</td>
<td>
{editingId === p.id ? (
<>
<button onClick={saveEdit} style={{ marginRight: "0.5rem" }}>Guardar</button>
<button onClick={cancelEdit}>Cancelar</button>
</>
) : (
<>
<button onClick={() => startEdit(p)} style={{ marginRight: "0.5rem" }}>Editar</button>
<button onClick={() => deleteItem(p.id)}>Eliminar</button>
</>
)}
</td>
</tr>
))
)}
</tbody>
</table>
</div>
);
}