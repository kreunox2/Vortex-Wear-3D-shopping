# 🎩 ATELIER 360° - Visor Interactivo de Prendas 3D

Plataforma premium de e-commerce con visor 360° basado en imágenes para tiendas de ropa de lujo.

## 📋 Características

### 👁️ Visor 360° Interactivo (`viewer360.html`)
- ✅ **Rotación 360°** suave y fluida
- ✅ **Controles intuitivos**:
  - Arrastra el ratón para rotar
  - Rueda del ratón para zoom (1x - 3x)
  - Doble-click para resetear vista
  - Flechas del teclado para rotación manual
- ✅ **Auto-rotate automático**
- ✅ **Carga de imágenes** drag & drop
- ✅ **Preview grid** con ángulos marcados
- ✅ **Descarga de configuración** en JSON
- ✅ **Estadísticas en tiempo real**

### 🏢 Panel Administrativo (`admin-panel.html`)
- ✅ **Dashboard** con métricas clave
- ✅ **Gestión de productos**: Crear, editar, eliminar
- ✅ **Upload de múltiples imágenes**
- ✅ **Configuración de tienda**
- ✅ **Persistencia con LocalStorage**

### 🔧 Backend API (`server.js`)
- ✅ **Endpoints CRUD completos**
- ✅ **Upload de múltiples imágenes**
- ✅ **Validación de archivos**
- ✅ **Base de datos JSON** (`database.json`)
- ✅ **CORS habilitado**
- ✅ **Manejo de errores robusto**

## 🚀 Instalación Rápida

### Opción 1: Solo Frontend
```bash
open viewer360.html    # Visor
open admin-panel.html  # Admin
```

### Opción 2: Con Backend
```bash
npm install
node server.js
# API en http://localhost:5000
```

## 📁 Estructura

```
├── viewer360.html     # Visor 360°
├── admin-panel.html   # Panel admin
├── server.js          # Backend
├── database.json      # Base de datos
└── package.json       # Dependencias
```

## 🎨 Funcionalidades Principales

### Visor 360°
1. Carga imágenes desde arriba, abajo, lados
2. Rotar con el ratón
3. Zoom con rueda
4. Auto-rotate
5. Descarga configuración

### Admin Panel
1. Crear productos
2. Cargar imágenes múltiples
3. Editar/Eliminar
4. Ver estadísticas
5. Configurar tienda

### API REST
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/stats`

## 💡 Cómo Usar

**Para dueños:**
1. Abre `admin-panel.html`
2. Crea nuevo producto
3. Sube 4-8 imágenes
4. Configura precio y detalles

**Para clientes:**
1. Abre `viewer360.html` o página principal
2. Arrastra para rotar
3. Usa rueda para zoom
4. Descubre el producto

## 🎁 Incluido

✅ 3 productos de ejemplo
✅ Sistema de vistas
✅ Ratings y reseñas
✅ Estadísticas en tiempo real
✅ Responsive design

## 🔐 Seguridad

- Validación de imágenes
- Límite de 10MB por archivo
- Solo formatos: PNG, JPG, WEBP
- CORS configurado
- Error handling

## 📊 Productos de Ejemplo

1. **Essential Wool Coat** - $1,250
2. **Architectural Wool Blazer** - $890
3. **Heritage Trench Coat** - $1,150

## 🌐 Endpoints

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/products` | Todos los productos |
| GET | `/api/products/:id` | Producto específico |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:id` | Actualizar |
| DELETE | `/api/products/:id` | Eliminar |
| GET | `/api/stats` | Estadísticas |

## 🚀 Próximas Mejoras

- [ ] Autenticación JWT
- [ ] Carrito de compras
- [ ] Integración Stripe
- [ ] Reviews/Ratings
- [ ] Multi-idioma
- [ ] Notificaciones email

## 📞 Soporte

📧 kreunox@gmail.com
🐙 GitHub: kreunox2

---

**ATELIER 360° - Elevando la experiencia digital del lujo** 🎩