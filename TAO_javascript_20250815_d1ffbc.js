// Navegación entre páginas
function showHome() {
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('category-page').classList.add('hidden');
    document.getElementById('subcategory-page').classList.add('hidden');
}

function showCategory(categoryId) {
    const category = categoriesData[categoryId];
    
    // Actualizar UI
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('category-page').classList.remove('hidden');
    document.getElementById('subcategory-page').classList.add('hidden');
    
    document.getElementById('category-title').textContent = category.title;
    document.getElementById('category-breadcrumb').textContent = category.title;
    
    // Generar subcategorías
    const subcategoriesGrid = document.getElementById('subcategories-grid');
    subcategoriesGrid.innerHTML = '';
    
    for (const [subId, subcategory] of Object.entries(category.subcategories)) {
        const card = document.createElement('div');
        card.className = 'subcategory-card';
        card.innerHTML = `
            <h3 class="subcategory-title">${subcategory.title}</h3>
            <p class="subcategory-count">${subcategory.links.length} tutoriales</p>
        `;
        card.addEventListener('click', () => showSubcategory(categoryId, subId));
        subcategoriesGrid.appendChild(card);
    }
}

function showSubcategory(categoryId, subcategoryId) {
    const subcategory = categoriesData[categoryId].subcategories[subcategoryId];
    
    // Actualizar UI
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('category-page').classList.add('hidden');
    document.getElementById('subcategory-page').classList.remove('hidden');
    
    document.getElementById('subcategory-title').textContent = subcategory.title;
    document.getElementById('subcategory-breadcrumb').textContent = subcategory.title;
    document.getElementById('parent-category-link').textContent = categoriesData[categoryId].title;
    document.getElementById('parent-category-link').onclick = () => showCategory(categoryId);
    document.getElementById('back-to-category').onclick = () => showCategory(categoryId);
    
    // Generar enlaces
    const linksGrid = document.getElementById('subcategory-links');
    linksGrid.innerHTML = '';
    
    subcategory.links.forEach(link => {
        const sourceIcon = link.source === 'youtube' 
            ? 'https://www.youtube.com/favicon.ico' 
            : 'https://www.google.com/favicon.ico';
        
        const card = document.createElement('div');
        card.className = 'link-card';
        card.innerHTML = `
            <div class="link-header">
                <img src="${sourceIcon}" alt="${link.source}" class="source-icon">
                <h3 class="link-title">${link.title}</h3>
            </div>
            <p class="link-description">${link.description}</p>
            <a href="${link.url}" class="link-button" target="_blank">Abrir enlace</a>
        `;
        linksGrid.appendChild(card);
    });
}

// Búsqueda en tiempo real
document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const noResults = document.getElementById('no-results');
    let hasResults = false;
    
    // Buscar en destacados
    document.querySelectorAll('#featured-links .link-card').forEach(card => {
        const title = card.querySelector('.link-title').textContent.toLowerCase();
        const desc = card.querySelector('.link-description').textContent.toLowerCase();
        const matches = title.includes(term) || desc.includes(term);
        
        card.style.display = matches ? 'block' : 'none';
        if (matches) hasResults = true;
    });
    
    noResults.classList.toggle('show', !hasResults);
});

// Inicializar
showHome();