document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const bassGrid = document.querySelector('.bass-grid');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navButtons.classList.toggle('active');
    });

    // Filtrar solo los bajos de productData
    const basses = Object.values(productData).filter(product => product.type === 'bass');

    function renderBasses(bassesToRender) {
        bassGrid.innerHTML = '';
        bassesToRender.forEach(bass => {
            const bassCard = document.createElement('div');
            bassCard.className = 'bass-card';
            bassCard.innerHTML = `
                <img src="${bass.images[0]}" alt="${bass.name}">
                <div class="bass-card-content">
                    <h3>${bass.name}</h3>
                    <p>Precio: $${bass.price}</p>
                    <p>${bass.specs[0]}</p>
                    <p>${bass.specs[1]}</p>
                </div>
                <button class="favorite-btn" aria-label="Añadir a favoritos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            `;
            bassCard.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    window.location.href = `productos/product-details.html?id=${bass.id}`;
                }
            });
            bassGrid.appendChild(bassCard);
        });
    }

    bassGrid.addEventListener('click', (e) => {
        if (e.target.closest('.favorite-btn')) {
            e.target.closest('.favorite-btn').classList.toggle('active');
        }
    });

    function applyFilters() {
        const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
        const selectedStrings = Array.from(document.querySelectorAll('input[name="strings"]:checked')).map(input => input.value);
        const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);

        const filteredBasses = basses.filter(bass => 
            (selectedBrands.length === 0 || selectedBrands.includes(bass.specs[0].split(': ')[1].toLowerCase())) &&
            (selectedStrings.length === 0 || selectedStrings.includes(bass.specs[3].split(': ')[1].split(' ')[0])) &&
            (selectedTypes.length === 0 || bass.name.toLowerCase().includes(selectedTypes[0]))
        );

        renderBasses(filteredBasses);
    }

    applyFiltersBtn.addEventListener('click', applyFilters);

    // Renderizar todos los bajos inicialmente
    renderBasses(basses);
});