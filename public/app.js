// Visor 3D con Three.js - Cubo rotativo con 6 imágenes
class ClothingViewer3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 2.5;
        
        this.cube = null;
        this.rotation = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.isDragging = false;
        this.previousMouse = { x: 0, y: 0 };
        
        this.setupLights();
        this.setupEventListeners();
        this.animate();
    }
    
    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }
    
    setupEventListeners() {
        this.renderer.domElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.renderer.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.renderer.domElement.addEventListener('mouseup', () => this.onMouseUp());
        this.renderer.domElement.addEventListener('mouseleave', () => this.onMouseUp());
        
        // Touch events para móvil
        this.renderer.domElement.addEventListener('touchstart', (e) => this.onTouchStart(e));
        this.renderer.domElement.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.renderer.domElement.addEventListener('touchend', () => this.onMouseUp());
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    onMouseDown(e) {
        this.isDragging = true;
        this.previousMouse = { x: e.clientX, y: e.clientY };
    }
    
    onMouseMove(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.previousMouse.x;
        const deltaY = e.clientY - this.previousMouse.y;
        
        this.targetRotation.y += deltaX * 0.01;
        this.targetRotation.x += deltaY * 0.01;
        
        this.previousMouse = { x: e.clientX, y: e.clientY };
    }
    
    onMouseUp() {
        this.isDragging = false;
    }
    
    onTouchStart(e) {
        this.isDragging = true;
        this.previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    
    onTouchMove(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.touches[0].clientX - this.previousMouse.x;
        const deltaY = e.touches[0].clientY - this.previousMouse.y;
        
        this.targetRotation.y += deltaX * 0.01;
        this.targetRotation.x += deltaY * 0.01;
        
        this.previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    createClothingCube(imageUrls) {
        // Remover cubo anterior si existe
        if (this.cube) {
            this.scene.remove(this.cube);
        }
        
        const geometry = new THREE.BoxGeometry(2, 2.5, 2);
        
        // Crear materiales con las 6 imágenes
        const materials = [];
        const textureLoader = new THREE.TextureLoader();
        
        // Orden: right, left, top, bottom, front, back
        const imageOrder = [
            imageUrls.derecha,   // right
            imageUrls.izquierda, // left
            imageUrls.arriba,    // top
            imageUrls.abajo,     // bottom
            imageUrls.frente,    // front
            imageUrls.atras      // back
        ];
        
        imageOrder.forEach((url, index) => {
            const texture = textureLoader.load(url);
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            
            const material = new THREE.MeshPhongMaterial({
                map: texture,
                side: THREE.FrontSide,
                flatShading: false
            });
            materials.push(material);
        });
        
        this.cube = new THREE.Mesh(geometry, materials);
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        
        this.scene.add(this.cube);
    }
    
    rotateToView(view) {
        const rotations = {
            frente: { x: 0, y: 0 },
            atras: { x: 0, y: Math.PI },
            derecha: { x: 0, y: -Math.PI / 2 },
            izquierda: { x: 0, y: Math.PI / 2 },
            arriba: { x: -Math.PI / 2, y: 0 },
            abajo: { x: Math.PI / 2, y: 0 }
        };
        
        if (rotations[view]) {
            this.targetRotation = rotations[view];
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Suavizar rotación
        this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.1;
        this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.1;
        
        if (this.cube) {
            this.cube.rotation.x = this.rotation.x;
            this.cube.rotation.y = this.rotation.y;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Inicializar aplicación
let viewer3D;

document.addEventListener('DOMContentLoaded', () => {
    // Crear contenedor principal
    const root = document.getElementById('root');
    
    root.innerHTML = `
        <div class="container">
            <div class="header">
                <h1>🌀 Vortex Wear - Visualización 3D</h1>
                <p>Observa cada prenda desde todos los ángulos</p>
            </div>
            
            <div class="content">
                <div class="viewer-container">
                    <div id="viewer-3d"></div>
                    <div class="controls">
                        <button class="btn btn-primary" onclick="viewer3D.rotateToView('frente')">Frente</button>
                        <button class="btn btn-primary" onclick="viewer3D.rotateToView('atras')">Atrás</button>
                        <button class="btn btn-primary" onclick="viewer3D.rotateToView('derecha')">Derecha</button>
                        <button class="btn btn-primary" onclick="viewer3D.rotateToView('izquierda')">Izquierda</button>
                        <button class="btn btn-primary" onclick="viewer3D.rotateToView('arriba')">Arriba</button>
                        <button class="btn btn-primary" onclick="viewer3D.rotateToView('abajo')">Abajo</button>
                    </div>
                </div>
                
                <div class="product-panel">
                    <h2 class="product-title">Camiseta Premium</h2>
                    <div class="product-price">$49.99</div>
                    
                    <p class="product-description">
                        Camiseta de alta calidad hecha con 100% algodón orgánico. Perfecta para el día a día con un estilo moderno y cómodo.
                    </p>
                    
                    <div class="info-section">
                        <div class="info-label">Colores Disponibles</div>
                        <div class="color-selector">
                            <div class="color-option active" style="background-color: #000;" onclick="selectColor(this)"></div>
                            <div class="color-option" style="background-color: #fff; border: 3px solid #ccc;" onclick="selectColor(this)"></div>
                            <div class="color-option" style="background-color: #ff6b6b;" onclick="selectColor(this)"></div>
                            <div class="color-option" style="background-color: #4ecdc4;" onclick="selectColor(this)"></div>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-label">Talla</div>
                        <select style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            <option>XS</option>
                            <option>S</option>
                            <option selected>M</option>
                            <option>L</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </select>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-label">Cantidad</div>
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="changeQuantity(-1)">−</button>
                            <input type="number" id="quantity" class="quantity-input" value="1" min="1">
                            <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                        </div>
                    </div>
                    
                    <button class="add-to-cart" onclick="addToCart()">
                        🛒 Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar el visor 3D
    viewer3D = new ClothingViewer3D('viewer-3d');
    
    // Cargar imágenes de ejemplo (reemplazar con URLs reales)
    const exampleImages = {
        frente: 'https://via.placeholder.com/400x500?text=Frente',
        atras: 'https://via.placeholder.com/400x500?text=Atras',
        derecha: 'https://via.placeholder.com/400x500?text=Derecha',
        izquierda: 'https://via.placeholder.com/400x500?text=Izquierda',
        arriba: 'https://via.placeholder.com/400x500?text=Arriba',
        abajo: 'https://via.placeholder.com/400x500?text=Abajo'
    };
    
    viewer3D.createClothingCube(exampleImages);
});

// Funciones de utilidad
function selectColor(element) {
    document.querySelectorAll('.color-option').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
}

function changeQuantity(amount) {
    const input = document.getElementById('quantity');
    const newValue = Math.max(1, parseInt(input.value) + amount);
    input.value = newValue;
}

function addToCart() {
    const quantity = document.getElementById('quantity').value;
    alert(`¡Producto añadido al carrito! Cantidad: ${quantity}`);
}