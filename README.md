# Proyecto3-Yeny — Frontend

E-commerce completo desarrollado con React + Redux Toolkit, como parte del Bootcamp Full Stack Developer + IA (The Bridge). Incluye catálogo de productos, carrito, wishlist, panel de administración con CRUD, autenticación segura con cookies httpOnly, subida de imágenes a Cloudinary y pagos con Stripe.

## Tecnologías

- React 19 + Vite
- Redux Toolkit
- React Router DOM
- Axios

## Funcionalidades

- Catálogo de productos y detalle de producto
- Registro / Login / Logout con cookies httpOnly
- Carrito de compra y Wishlist
- Panel de administración (solo rol ADMIN):
  - CRUD completo de productos
  - Subida de imágenes reales a Cloudinary
- Checkout con pasarela de pago Stripe (modo test)
- Rutas protegidas por autenticación y por rol

## Instalación

Clona el repositorio e instala las dependencias:

\`\`\`bash
git clone https://github.com/YENYRC/tienda-feature-sprint16.git
cd tienda-feature-sprint16
npm install
\`\`\`

## Variables de entorno

Crea un archivo \`.env\` en la raíz del proyecto con:

\`\`\`
VITE_API_URL=http://localhost:3000
\`\`\`

En producción, cambia esta variable por la URL real del backend desplegado.

## Scripts disponibles

\`\`\`bash
npm run dev       # Arranca el servidor de desarrollo (Vite)
npm run build     # Genera la build de producción
npm run preview   # Sirve la build de producción localmente
\`\`\`

## Backend

Este frontend consume la API disponible en el siguiente repositorio: https://github.com/YENYRC/segundo-proyecto-backend.git

## Despliegue

Aplicación desplegada en Netlify: https://bejewelled-pasca-ba51ab.netlify.app