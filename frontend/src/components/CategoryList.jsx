import { useEffect, useState } from "react";
import api from "../services/api";

export default function CategoryList() {
const [categories, setCategories] = useState([]);
const [searchId, setSearchId] = useState("");
const [editingId, setEditingId] = useState(null);
const [editName, setEditName] = useState("");

const fetchAll = () => {
api.get("/api/categories")
.then((res) => setCategories(res.data))
.catch((err) => console.error("Error al cargar categorías", err));
};

useEffect(() => {
fetchAll();
}, []);

const handleSearch = async () => {
if (!searchId) { fetchAll(); return; }
try {
const res = await api.get(`/api/categories/${searchId}`);
setCategories(res.data ? [res.data] : []);
} catch (err) {
console.error("Error al buscar categoría", err);
alert("Categoría no encontrada");
setCategories([]);
}
};

const startEdit = (cat) => {
setEditingId(cat.id);
setEditName(cat.name);
};

const cancelEdit = () => {
setEditingId(null);
setEditName("");
};

const saveEdit = async () => {
try {
await api.put(`/api/categories/${editingId}`, { name: editName });
alert("Categoría actualizada");
cancelEdit();
fetchAll();
} catch (err) {
console.error("Error al actualizar categoría", err);
alert("No se pudo actualizar");
}
};

const deleteItem = async (id) => {
if (!confirm("¿Eliminar esta categoría?")) return;
try {
await api.delete(`/api/categories/${id}`);
alert("Categoría eliminada");
fetchAll();
} catch (err) {
console.error("Error al eliminar categoría", err);
alert("No se pudo eliminar");
}
};

return (
<div>
<h2>Categorías</h2>
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
<th>Acciones</th>
</tr>
</thead>
<tbody>
{categories.length === 0 ? (
<tr><td colSpan="3">No hay categorías</td></tr>
) : (
categories.map((cat) => (
<tr key={cat.id}>
<td>{cat.id}</td>
<td>
{editingId === cat.id ? (
<input value={editName} onChange={(e) => setEditName(e.target.value)} />
) : (
cat.name
)}
</td>
<td>
{editingId === cat.id ? (
<>
<button onClick={saveEdit} style={{ marginRight: "0.5rem" }}>Guardar</button>
<button onClick={cancelEdit}>Cancelar</button>
</>
) : (
<>
<button onClick={() => startEdit(cat)} style={{ marginRight: "0.5rem" }}>Editar</button>
<button onClick={() => deleteItem(cat.id)}>Eliminar</button>
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