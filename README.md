![Vortex Wear 3D Shopping](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)

# 🌀 Vortex Wear - Tienda 3D de Ropa

**Moda sin sorpresas.** Explora cada prenda en 360° y descubre cómo se ve desde cualquier perspectiva antes de comprar.

---

## 📋 Descripción

Vortex Wear es una plataforma de comercio electrónico revolucionaria que utiliza visualización 3D para mostrar prendas de ropa desde todos los ángulos. Los clientes pueden rotar interactivamente cada prenda y verla desde frente, atrás, lados, arriba y abajo.

### Características Principales

✅ **Visor 3D 360°** - Visualiza cada prenda desde todos los ángulos sin límites  
✅ **6 Perspectivas** - Frente, atrás, lado derecho, lado izquierdo, arriba y abajo  
✅ **Interacción Fluida** - Rotación suave con mouse o táctil  
✅ **Panel Admin** - Sube fácilmente 6 fotos para crear una prenda 3D  
✅ **Responsive Design** - Funciona en desktop, tablet y móvil  
✅ **Sistema de Carrito** - Selecciona talla, color y cantidad  

---

## 🏗️ Estructura del Proyecto

```
Vortex-Wear-3D-shopping/
├── public/
│   ├── index.html          # Página principal con visor 3D
│   ├── app.js              # Lógica del visor Three.js
│   └── styles.css          # Estilos de la tienda
│
├── admin/
│   ├── upload.html         # Panel para subir productos
│   ├── admin-script.js     # Validación y manejo de archivos
│   └── admin-styles.css    # Estilos del panel admin
│
└── README.md
```

---

## 🚀 Inicio Rápido

### Abre los archivos en tu navegador:

1. **Tienda (Cliente)**: Abre `public/index.html` en tu navegador
2. **Panel Admin**: Abre `admin/upload.html` para agregar productos

---

## 📸 Cómo Usar el Panel Admin

### Paso 1: Acceder al Panel
Abre `admin/upload.html`

### Paso 2: Cargar Producto
1. **Rellena la información:**
   - Nombre del producto
   - Precio
   - Categoría
   - Descripción

2. **Sube 6 imágenes (obligatorio):**
   - 📷 **Frente** - Vista frontal de la prenda
   - 📷 **Atrás** - Vista trasera
   - 📷 **Lado Derecho** - Perspectiva lateral derecha
   - 📷 **Lado Izquierdo** - Perspectiva lateral izquierda
   - 📷 **Arriba** - Vista superior (como se ve de arriba)
   - 📷 **Abajo** - Vista inferior (como se ve de abajo)

3. **Configura opciones:**
   - Selecciona tallas disponibles
   - Define colores
   - Marca como activo

4. **Guarda el producto** ✅

---

## 🎮 Controles del Visor 3D

| Acción | Control |
|--------|----------|
| **Rotar** | Click + Arrastrar (mouse) |
| **Rotar** | Dedo + Arrastrar (táctil) |
| **Vista Frente** | Botón "Frente" |
| **Vista Atrás** | Botón "Atrás" |
| **Vista Lado Der.** | Botón "Derecha" |
| **Vista Lado Izq.** | Botón "Izquierda" |
| **Vista Superior** | Botón "Arriba" |
| **Vista Inferior** | Botón "Abajo" |

---

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura
- **CSS3** - Diseño responsivo
- **JavaScript** - Interactividad
- **Three.js** - Motor 3D (v128)

---

## 📐 Arquitectura 3D

El visor 3D utiliza **Three.js** para crear un cubo que:
- Tiene 6 caras (una para cada imagen)
- Permite rotación suave e interactiva
- Se centra automáticamente en vistas predefinidas
- Funciona en todos los navegadores modernos

### Caras del Cubo
```
       [Arriba]
[Izq][Frente][Der][Atrás]
       [Abajo]
```

---

## 🎨 Personalización

### Cambiar Colores del Tema
En `public/styles.css`, busca:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Cambiar Tamaño del Cubo
En `public/app.js`, busca:
```javascript
const geometry = new THREE.BoxGeometry(2, 2.5, 2);
```

---

## 📱 Responsive

La tienda es completamente responsive:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Móvil (< 768px)

---

## 🛒 Funcionalidades Futuras

- [ ] Backend con Node.js + Express
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Sistema de autenticación
- [ ] Carrito de compras funcional
- [ ] Procesamiento de pagos (Stripe)
- [ ] Sistema de reseñas
- [ ] Filtros de búsqueda avanzados

---

## 🤝 Contribuir

¿Tienes ideas para mejorar Vortex Wear?

1. Haz un fork del proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo licencia MIT.

---

## 👨‍💻 Autor

**kreunox2**
- GitHub: [@kreunox2](https://github.com/kreunox2)

---

**Hecho con ❤️ por [kreunox2](https://github.com/kreunox2)**

⭐ Si te gusta el proyecto, ¡no olvides dar una estrella!