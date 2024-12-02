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

    const basses = [
    { id: 1, name: "Fender Precision", brand: "Fender", strings: "4", type: "Standard", image: "fender_precision.png" },
    { id: 2, name: "Music Man StingRay", brand: "MusicMan", strings: "5", type: "Standard", image: "musicman_stingray.png" },
    { id: 3, name: "Ibanez SR500", brand: "Ibanez", strings: "4", type: "Standard", image: "ibanez_sr500.png" },
    { id: 4, name: "Warwick Thumb", brand: "Warwick", strings: "5", type: "Signature", image: "warwick_thumb.png" },
];


    // Filtrar solo los bajos de productData
    const basses = Object.values(productData).filter(product => product.type === 'bass');

    function renderBasses(bassesToRender) {
        bassGrid.innerHTML = '';
        bassesToRender.forEach(bass => {
            const bassCard = document.createElement('div');
            bassCard.className = 'bass-card';
            bassCard.innerHTML = `
                <img src="${bass.image}" alt="${bass.name}">
                <div class="bass-card-content">
                    <h3>${bass.name}</h3>
                    <p>Marca: ${bass.brand}</p>
                    <p>Cuerdas: ${bass.strings}</p>
                    <p>Tipo: ${bass.type}</p>
                </div>
                </div>
                <button class="favorite-btn" aria-label="Añadir a favoritos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            `;
            bassCard.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    window.location.href = `product-details.html?id=${bass.id}`;
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
    (selectedBrands.length === 0 || selectedBrands.includes(bass.brand.toLowerCase())) &&
    (selectedStrings.length === 0 || selectedStrings.includes(bass.strings)) &&
    (selectedTypes.length === 0 || selectedTypes.includes(bass.type.toLowerCase()))
);

        renderBasses(filteredBasses);
    }

    applyFiltersBtn.addEventListener('click', applyFilters);

    // Renderizar todos los bajos inicialmente
    renderBasses(basses);
});
