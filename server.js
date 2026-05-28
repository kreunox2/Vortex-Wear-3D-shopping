// ATELIER 360° Backend API
// Node.js + Express

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
});

// Database
const DATABASE_FILE = path.join(__dirname, 'database.json');

function getDatabase() {
    if (!fs.existsSync(DATABASE_FILE)) {
        fs.writeFileSync(DATABASE_FILE, JSON.stringify({ products: [], users: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(DATABASE_FILE, 'utf8'));
}

function saveDatabase(data) {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2));
}

// RUTAS

// GET: Obtener todos los productos
app.get('/api/products', (req, res) => {
    try {
        const db = getDatabase();
        res.json({ success: true, data: db.products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET: Obtener producto por ID
app.get('/api/products/:id', (req, res) => {
    try {
        const db = getDatabase();
        const product = db.products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST: Crear nuevo producto
app.post('/api/products', upload.array('images', 8), (req, res) => {
    try {
        const { name, sku, description, price, category } = req.body;
        const db = getDatabase();

        const product = {
            id: Date.now(),
            name,
            sku,
            description,
            price: parseFloat(price),
            category,
            images: req.files.map((file, index) => ({
                url: `/uploads/${file.filename}`,
                angle: Math.round((index / req.files.length) * 360),
                fileName: file.originalname,
                size: (file.size / 1024 / 1024).toFixed(2)
            })),
            views: 0,
            createdAt: new Date().toISOString(),
            status: 'active'
        };

        db.products.push(product);
        saveDatabase(db);

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT: Actualizar producto
app.put('/api/products/:id', upload.array('images', 8), (req, res) => {
    try {
        const db = getDatabase();
        const productIndex = db.products.findIndex(p => p.id === parseInt(req.params.id));

        if (productIndex === -1) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const { name, description, price, category } = req.body;
        
        db.products[productIndex] = {
            ...db.products[productIndex],
            name: name || db.products[productIndex].name,
            description: description || db.products[productIndex].description,
            price: price ? parseFloat(price) : db.products[productIndex].price,
            category: category || db.products[productIndex].category,
            ...(req.files && req.files.length > 0 && {
                images: req.files.map((file, index) => ({
                    url: `/uploads/${file.filename}`,
                    angle: Math.round((index / req.files.length) * 360),
                    fileName: file.originalname
                }))
            }),
            updatedAt: new Date().toISOString()
        };

        saveDatabase(db);
        res.json({ success: true, data: db.products[productIndex] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE: Eliminar producto
app.delete('/api/products/:id', (req, res) => {
    try {
        const db = getDatabase();
        const productIndex = db.products.findIndex(p => p.id === parseInt(req.params.id));

        if (productIndex === -1) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const deletedProduct = db.products.splice(productIndex, 1);
        saveDatabase(db);

        res.json({ success: true, message: 'Producto eliminado', data: deletedProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST: Registrar vista de producto
app.post('/api/products/:id/view', (req, res) => {
    try {
        const db = getDatabase();
        const product = db.products.find(p => p.id === parseInt(req.params.id));

        if (product) {
            product.views = (product.views || 0) + 1;
            saveDatabase(db);
        }

        res.json({ success: true, views: product?.views || 0 });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET: Estadísticas
app.get('/api/stats', (req, res) => {
    try {
        const db = getDatabase();
        const stats = {
            totalProducts: db.products.length,
            totalViews: db.products.reduce((sum, p) => sum + (p.views || 0), 0),
            totalCategories: [...new Set(db.products.map(p => p.category))].length,
            avgPrice: db.products.length > 0 
                ? (db.products.reduce((sum, p) => sum + p.price, 0) / db.products.length).toFixed(2)
                : 0
        };
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'API ATELIER 360° funcionando ✓' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 ATELIER 360° API corriendo en puerto ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});