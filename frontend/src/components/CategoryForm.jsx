import { useState } from "react";
import api from "../services/api";

export default function CategoryForm({ onSave }) {
const [name, setName] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();
try {
await api.post("/api/categories", { name });
alert("Categoría creada correctamente");
setName("");
onSave && onSave();
} catch (err) {
console.error("Error al crear categoría", err);
alert("Error al crear categoría");
}
};

return (
<form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
<input
type="text"
placeholder="Nombre de la categoría"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>
<button type="submit">Guardar</button>
</form>
);
}