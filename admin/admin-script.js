// Variables globales
const imageInputs = {
    imageFront: document.getElementById('imageFront'),
    imageBack: document.getElementById('imageBack'),
    imageRight: document.getElementById('imageRight'),
    imageLeft: document.getElementById('imageLeft'),
    imageTop: document.getElementById('imageTop'),
    imageBottom: document.getElementById('imageBottom')
};

const imagePreviews = {
    imageFront: document.getElementById('previewFront'),
    imageBack: document.getElementById('previewBack'),
    imageRight: document.getElementById('previewRight'),
    imageLeft: document.getElementById('previewLeft'),
    imageTop: document.getElementById('previewTop'),
    imageBottom: document.getElementById('previewBottom')
};

// Configurar eventos de carga de imágenes
Object.keys(imageInputs).forEach(key => {
    const input = imageInputs[key];
    input.addEventListener('change', handleImageSelect);
    
    // Hacer clickeable toda la caja
    input.parentElement.addEventListener('click', () => {
        input.click();
    });
});

// Manejar selección de imágenes
function handleImageSelect(e) {
    const input = e.target;
    const preview = imagePreviews[input.id];
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            preview.style.backgroundImage = `url('${event.target.result}')}`;
            preview.classList.add('active');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Drag and drop para imágenes
Object.keys(imageInputs).forEach(key => {
    const input = imageInputs[key];
    const uploadBox = input.parentElement;
    
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#764ba2';
        uploadBox.style.background = '#f0f0f8';
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.borderColor = '#667eea';
        uploadBox.style.background = '#f8f9ff';
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#667eea';
        uploadBox.style.background = '#f8f9ff';
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            input.files = e.dataTransfer.files;
            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
        }
    });
});

// Agregar color input adicional
function addColorInput() {
    const colorGroup = document.querySelector('.color-input-group');
    const newInput = document.createElement('input');
    newInput.type = 'color';
    newInput.value = '#000000';
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '✕';
    removeBtn.style.cssText = `
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 8px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    `;
    removeBtn.onmouseover = () => removeBtn.style.transform = 'scale(1.1)';
    removeBtn.onmouseout = () => removeBtn.style.transform = 'scale(1)';
    removeBtn.onclick = (e) => {
        e.preventDefault();
        newInput.remove();
        removeBtn.remove();
    };
    
    colorGroup.insertBefore(newInput, colorGroup.querySelector('.btn-add-color'));
    colorGroup.insertBefore(removeBtn, colorGroup.querySelector('.btn-add-color'));
}

// Manejar envío del formulario
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar que todas las imágenes estén cargadas
    const allImagesLoaded = Object.keys(imageInputs).every(key => {
        return imageInputs[key].files.length > 0;
    });
    
    if (!allImagesLoaded) {
        alert('❌ Por favor, sube las 6 imágenes requeridas');
        return;
    }
    
    // Validar que el formulario sea válido
    if (!document.getElementById('uploadForm').checkValidity()) {
        alert('❌ Por favor, completa todos los campos requeridos');
        return;
    }
    
    // Crear FormData con todas las imágenes
    const formData = new FormData();
    
    // Agregar información del producto
    formData.append('productName', document.getElementById('productName').value);
    formData.append('productPrice', document.getElementById('productPrice').value);
    formData.append('productCategory', document.getElementById('productCategory').value);
    formData.append('productDescription', document.getElementById('productDescription').value);
    
    // Agregar imágenes
    Object.keys(imageInputs).forEach(key => {
        if (imageInputs[key].files[0]) {
            formData.append(key, imageInputs[key].files[0]);
        }
    });
    
    // Agregar tallas seleccionadas
    const selectedSizes = Array.from(document.querySelectorAll('input[name="sizes"]:checked'))
        .map(el => el.value);
    formData.append('sizes', JSON.stringify(selectedSizes));
    
    // Agregar colores
    const colors = Array.from(document.querySelectorAll('.color-input-group input[type="color"]'))
        .map(el => el.value);
    formData.append('colors', JSON.stringify(colors));
    
    // Agregar si está activo
    formData.append('activeProduct', document.getElementById('activeProduct').checked);
    
    try {
        // Simular envío (reemplazar con URL de tu backend)
        console.log('Datos a enviar:', {
            productName: document.getElementById('productName').value,
            productPrice: document.getElementById('productPrice').value,
            productCategory: document.getElementById('productCategory').value,
            productDescription: document.getElementById('productDescription').value,
            images: Object.keys(imageInputs).map(key => imageInputs[key].files[0]?.name),
            sizes: selectedSizes,
            colors: colors
        });
        
        // Para demostración, simulamos éxito
        showSuccessMessage();
        resetForm();
        
    } catch (error) {
        console.error('Error al subir el producto:', error);
        alert('❌ Error al subir el producto. Intenta de nuevo.');
    }
});

// Mostrar mensaje de éxito
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
            successMessage.style.opacity = '1';
        }, 500);
    }, 3000);
}

// Limpiar formulario
function resetForm() {
    document.getElementById('uploadForm').reset();
    
    // Limpiar previsualizaciones
    Object.keys(imagePreviews).forEach(key => {
        imagePreviews[key].classList.remove('active');
        imagePreviews[key].style.backgroundImage = '';
    });
    
    // Resetear colores a los por defecto
    document.querySelectorAll('.color-input-group input[type="color"]').forEach((el, index) => {
        const defaultColors = ['#000000', '#FFFFFF', '#FF6B6B'];
        el.value = defaultColors[index] || '#000000';
    });
}

// Validación en tiempo real del nombre del producto
document.getElementById('productName').addEventListener('input', (e) => {
    e.target.value = e.target.value.trim();
});

// Validación del precio
document.getElementById('productPrice').addEventListener('blur', (e) => {
    const price = parseFloat(e.target.value);
    if (price < 0) {
        e.target.value = '0.00';
    }
});

console.log('✅ Panel de administración cargado correctamente');