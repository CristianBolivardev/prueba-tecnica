import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

export default function App() {
const [view, setView] = useState("products");
const [reload, setReload] = useState(false);

const handleReload = () => setReload(!reload);

return (
<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
<h1>Gestión de Tienda</h1>
<nav style={{ marginBottom: "1rem" }}>
<button onClick={() => setView("products")}>Productos</button>
<button onClick={() => setView("categories")}>Categorías</button>
</nav>  {view === "products" ? (
    <>
      <ProductForm onSave={handleReload} />
      <ProductList key={reload} />
    </>
  ) : (
    <>
      <CategoryForm onSave={handleReload} />
      <CategoryList key={reload} />
    </>
  )}
</div>
);
}