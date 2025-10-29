# Prueba Técnica: Tienda (Backend + Frontend)

Aplicación full‑stack para gestionar productos y categorías.

- Backend: Node.js + Express + MySQL (esta carpeta)
- Frontend: React + Vite (carpeta hermana `../frontend`)

## Requisitos

- Node.js 18+
- MySQL 8+
- Git
- (Opcional) GitHub CLI (`gh`)

## Variables de entorno

La conexión MySQL actualmente está definida en `src/config/db.js`. Para producción se recomienda `.env`.

Ejemplo recomendado de `.env` si se refactoriza `db.js`:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=productos
```

Mientras tanto, edita `src/config/db.js` con tus credenciales locales.

## Instalación (backend)

```
npm install
```

Crear BD si no existe:

```
CREATE DATABASE productos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Ejecución (backend)

```
npm run dev   # desarrollo con nodemon
# o
npm start     # ejecución simple
```

La API quedará en `http://localhost:3000/api`.

Endpoints:
- GET /api/products
- POST /api/products
- GET /api/categories
- POST /api/categories

## Frontend (referencia)

Desde `../frontend`:

```
npm install
npm run dev
```

Se abrirá en `http://localhost:5173` (puede variar). Ajusta el origen de API si cambias el puerto/host del backend.

## Publicar en GitHub (repo público)

Si deseas publicar el proyecto completo, ejecuta estos comandos desde la carpeta raíz del proyecto (la que contiene `bakend/` y `frontend/`). Si solo vas a publicar el backend, ejecuta desde esta carpeta.

### Con GitHub CLI

```
git init
git add .
git commit -m "chore: initial commit"
# crea repo público y hace push
gh repo create NOMBRE_DEL_REPO --public --source . --remote origin --push
```

### Manual (sin `gh`)

1) Crea un repo público vacío en GitHub.  
2) Luego:

```
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/USUARIO/NOMBRE_DEL_REPO.git
git push -u origin main
```

## Notas

- No subas credenciales reales; usa `.env` y mantenlo ignorado.
- Si cambias el puerto del backend, actualiza el origen de API en el frontend.
