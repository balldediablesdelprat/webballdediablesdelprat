const comerciosData = [
    { id: 1, name: "Academia d'Anglès Estela", category: "cultura", lat: 41.3313350, lng: 2.0965152, color: "#f39c12", description: "Carrer de Joan Maragall, 21, El Prat de Llobregat", address: "Carrer de Joan Maragall, 21, El Prat de Llobregat" },
    { id: 2, name: "Montse Borràs", category: "moda", lat: 41.3311696, lng: 2.0939320, color: "#3498db", description: "Carrer del Centre, 2, El Prat de Llobregat", address: "Carrer del Centre, 2, El Prat de Llobregat" },
    { id: 3, name: "La Central", category: "alimentacio", lat: 41.3304394, lng: 2.0935590, color: "#e74c3c", description: "Plaça de la Vila, 12, El Prat de Llobregat", address: "Plaça de la Vila, 12, El Prat de Llobregat" },
    { id: 4, name: "Carnisseria Montserrat", category: "alimentacio", lat: 41.3304594, lng: 2.0935790, color: "#e74c3c", description: "Plaça de la Vila, 12, El Prat de Llobregat", address: "Plaça de la Vila, 12, El Prat de Llobregat" },
    { id: 5, name: "Ferreteria la Cresta", category: "llar", lat: 41.3296108, lng: 2.0934235, color: "#2ecc71", description: "Carrer de Ferran Puig, 23, El Prat de Llobregat", address: "Carrer de Ferran Puig, 23, El Prat de Llobregat" },
    { id: 6, name: "Passion Beauté", category: "moda", lat: 41.3295258, lng: 2.0934468, color: "#3498db", description: "Carrer de Ferran Puig, 27, El Prat de Llobregat", address: "Carrer de Ferran Puig, 27, El Prat de Llobregat" },
    { id: 7, name: "Herba Bona", category: "llar", lat: 41.3287250, lng: 2.0940276, color: "#2ecc71", description: "Carrer de Ferran Puig, 51, El Prat de Llobregat", address: "Carrer de Ferran Puig, 51, El Prat de Llobregat" },
    { id: 8, name: "Aurora", category: "moda", lat: 41.3283256, lng: 2.0943767, color: "#3498db", description: "Carrer de Ferran Puig, 65, El Prat de Llobregat", address: "Carrer de Ferran Puig, 65, El Prat de Llobregat" },
    { id: 9, name: "Fonollosa", category: "moda", lat: 41.3281037, lng: 2.0945748, color: "#3498db", description: "Carrer de Ferran Puig, 73, El Prat de Llobregat", address: "Carrer de Ferran Puig, 73, El Prat de Llobregat" },
    { id: 10, name: "Delcar", category: "moda", lat: 41.3271899, lng: 2.0952554, color: "#3498db", description: "Carrer de Frederic Soler, 6 bis, El Prat de Llobregat", address: "Carrer de Frederic Soler, 6 bis, El Prat de Llobregat" },
    { id: 11, name: "Picapedrer", category: "alimentacio", lat: 41.3304194, lng: 2.0935390, color: "#e74c3c", description: "Plaça de la Vila, 12, El Prat de Llobregat", address: "Plaça de la Vila, 12, El Prat de Llobregat" },
    { id: 12, name: "Tàstum", category: "alimentacio", lat: 41.3297260, lng: 2.0933171, color: "#e74c3c", description: "Carrer de Ferran Puig, 10, El Prat de Llobregat", address: "Carrer de Ferran Puig, 10, El Prat de Llobregat" },
    { id: 13, name: "La Nova San José", category: "alimentacio", lat: 41.3296389, lng: 2.0933150, color: "#e74c3c", description: "Carrer de Ferran Puig, 14, El Prat de Llobregat", address: "Carrer de Ferran Puig, 14, El Prat de Llobregat" },
    { id: 14, name: "Perruqueria Carmen Marín", category: "moda", lat: 41.3292628, lng: 2.0934839, color: "#3498db", description: "Carrer de Ferran Puig, 32, El Prat de Llobregat", address: "Carrer de Ferran Puig, 32, El Prat de Llobregat" },
    { id: 15, name: "Llibreria Drac", category: "cultura", lat: 41.3292859, lng: 2.0935507, color: "#f39c12", description: "Carrer de Ferran Puig, 37, El Prat de Llobregat", address: "Carrer de Ferran Puig, 37, El Prat de Llobregat" },
    { id: 16, name: "MuyCoqueta", category: "moda", lat: 41.3281885, lng: 2.0944042, color: "#3498db", description: "Carrer de Ferran Puig, 72, El Prat de Llobregat", address: "Carrer de Ferran Puig, 72, El Prat de Llobregat" },
    { id: 17, name: "Font Pell", category: "moda", lat: 41.3267805, lng: 2.0955242, color: "#3498db", description: "Carrer de Frederic Soler, 40, El Prat de Llobregat", address: "Carrer de Frederic Soler, 40, El Prat de Llobregat" },
    { id: 18, name: "Cal Ramonet del Nara", category: "alimentacio", lat: 41.3292105, lng: 2.0935282, color: "#e74c3c", description: "Carrer de Ferran Puig, 34, El Prat de Llobregat", address: "Carrer de Ferran Puig, 34, El Prat de Llobregat" },
    { id: 19, name: "Flors Montané", category: "llar", lat: 41.3294971, lng: 2.0933795, color: "#2ecc71", description: "Carrer de Ferran Puig, 18, El Prat de Llobregat", address: "Carrer de Ferran Puig, 18, El Prat de Llobregat" },
    { id: 20, name: "Pa i Coca", category: "alimentacio", lat: 41.3298061, lng: 2.0932949, color: "#e74c3c", description: "Carrer de Ferran Puig, 6, El Prat de Llobregat", address: "Carrer de Ferran Puig, 6, El Prat de Llobregat" },
    { id: 21, name: "Nit i dia", category: "llar", lat: 41.327019, lng: 2.0984971, color: "#2ecc71", description: "Av. de la Verge de Montserrat, 47, El Prat de Llobregat", address: "Av. de la Verge de Montserrat, 47, El Prat de Llobregat" },
    { id: 22, name: "La Masia", category: "alimentacio", lat: 41.3304594, lng: 2.0935990, color: "#e74c3c", description: "Plaça de la Vila, 12, El Prat de Llobregat", address: "Plaça de la Vila, 12, El Prat de Llobregat" },
    { id: 23, name: "Calçats Avenida", category: "moda", lat: 41.3272283, lng: 2.0992558, color: "#3498db", description: "Av. de la Verge de Montserrat, 41, El Prat de Llobregat", address: "Av. de la Verge de Montserrat, 41, El Prat de Llobregat" },
    { id: 24, name: "Pet Naturalia", category: "llar", lat: 41.3228609, lng: 2.0912570, color: "#2ecc71", description: "Carrer Rector Farrés i Poch, 15, El Prat de Llobregat", address: "Carrer Rector Farrés i Poch, 15, El Prat de Llobregat" },
    { id: 25, name: "Celler Terra i Sol", category: "alimentacio", lat: 41.3271987, lng: 2.0953097, color: "#e74c3c", description: "Carrer de Frederic Soler, 21, El Prat de Llobregat", address: "Carrer de Frederic Soler, 21, El Prat de Llobregat" },
    { id: 26, name: "Agueda Herrera Lencería", category: "moda", lat: 41.325497, lng: 2.0968407, color: "#3498db", description: "Carrer de Frederic Soler, 66, El Prat de Llobregat", address: "Carrer de Frederic Soler, 66, El Prat de Llobregat" },
    { id: 27, name: "La Maranya", category: "moda", lat: 41.3289564, lng: 2.0937433, color: "#3498db", description: "Carrer de Ferran Puig, 40, El Prat de Llobregat", address: "Carrer de Ferran Puig, 40, El Prat de Llobregat" },
    { id: 28, name: "Ferreteria Llobregat", category: "llar", lat: 41.3292410, lng: 2.0987898, color: "#2ecc71", description: "Carretera de la Marina, 5, El Prat de Llobregat", address: "Carretera de la Marina, 5, El Prat de Llobregat" },
    { id: 29, name: "Los Naranjos", category: "restauracio", lat: 41.3297235, lng: 2.0913336, color: "#9b59b6", description: "Carrer de Mossèn Cinto Verdaguer, 16, El Prat de Llobregat", address: "Carrer de Mossèn Cinto Verdaguer, 16, El Prat de Llobregat" },
    { id: 30, name: "Avanti", category: "moda", lat: 41.3280169, lng: 2.0945558, color: "#3498db", description: "Carrer de Ferran Puig, 82, El Prat de Llobregat", address: "Carrer de Ferran Puig, 82, El Prat de Llobregat" },
    { id: 31, name: "Le Tigrè Cakes", category: "restauracio", lat: 41.3290122, lng: 2.0939926, color: "#9b59b6", description: "Passatge Rector Martí i Piñol, 3, El Prat de Llobregat", address: "Passatge Rector Martí i Piñol, 3, El Prat de Llobregat" },
    { id: 32, name: "La Cova", category: "restauracio", lat: 41.3293086, lng: 2.0934469, color: "#9b59b6", description: "Carrer de Ferran Puig, 30, El Prat de Llobregat", address: "Carrer de Ferran Puig, 30, El Prat de Llobregat" },
    { id: 33, name: "El Bar del Mercat", category: "restauracio", lat: 41.3304194, lng: 2.0936190, color: "#9b59b6", description: "Plaça de la Vila, 12, El Prat de Llobregat", address: "Plaça de la Vila, 12, El Prat de Llobregat" },
    { id: 34, name: "La Nova Primavera", category: "restauracio", lat: 41.3301431, lng: 2.0933401, color: "#9b59b6", description: "Carrer de Ferran Puig, 7, El Prat de Llobregat", address: "Carrer de Ferran Puig, 7, El Prat de Llobregat" },
    { id: 35, name: "Ferreteria el Primer Clau", category: "llar", lat: 41.3237947, lng: 2.0938729, color: "#2ecc71", description: "Carrer de Jaume Casanovas, 135, El Prat de Llobregat", address: "Carrer de Jaume Casanovas, 135, El Prat de Llobregat" },
    { id: 36, name: "Copisteria Alonso", category: "cultura", lat: 41.3288857, lng: 2.0986544, color: "#f39c12", description: "Carretera de la Marina, 2, El Prat de Llobregat", address: "Carretera de la Marina, 2, El Prat de Llobregat" },
    { id: 37, name: "M'Enamorau & Tuki", category: "llar", lat: 41.3289052, lng: 2.09368, color: "#2ecc71", description: "Carrer de Ferran Puig, 40, El Prat de Llobregat", address: "Carrer de Ferran Puig, 40, El Prat de Llobregat" },
    { id: 38, name: "Jugueteria Pla", category: "llar", lat: 41.3237437, lng: 2.0902422, color: "#2ecc71", description: "Carrer de Ramon Llull, 9, El Prat de Llobregat", address: "Carrer de Ramon Llull, 9, El Prat de Llobregat" },
    { id: 39, name: "El Ninot", category: "cultura", lat: 41.3271689, lng: 2.1001124, color: "#f39c12", description: "Carretera de la Marina, 25, El Prat de Llobregat", address: "Carretera de la Marina, 25, El Prat de Llobregat" },
    { id: 40, name: "Natur Prat", category: "llar", lat: 41.3241008, lng: 2.0894617, color: "#2ecc71", description: "Av. de la Verge de Montserrat, 200, El Prat de Llobregat", address: "Av. de la Verge de Montserrat, 200, El Prat de Llobregat" },
    { id: 41, name: "Atleet", category: "moda", lat: 41.3237653, lng: 2.1026854, color: "#3498db", description: "Carretera de la Marina, 77, El Prat de Llobregat", address: "Carretera de la Marina, 77, El Prat de Llobregat" },
    { id: 42, name: "Ferreteria JM", category: "llar", lat: 41.3243881, lng: 2.1011777, color: "#2ecc71", description: "Carrer de Lleida, 144, El Prat de Llobregat", address: "Carrer de Lleida, 144, El Prat de Llobregat" },
    { id: 43, name: "Floristería el Trébol", category: "llar", lat: 41.3232359, lng: 2.0983807, color: "#2ecc71", description: "Carrer de Lleida, 116, El Prat de Llobregat", address: "Carrer de Lleida, 116, El Prat de Llobregat" },
    { id: 44, name: "Calçat Diba's", category: "moda", lat: 41.3231128, lng: 2.0980807, color: "#3498db", description: "Carrer de Lleida, 112, El Prat de Llobregat", address: "Carrer de Lleida, 112, El Prat de Llobregat" },
    { id: 45, name: "Cuida't", category: "moda", lat: 41.3291461, lng: 2.0962802, color: "#3498db", description: "Carrer de Manuel Bertrand, 84, El Prat de Llobregat", address: "Carrer de Manuel Bertrand, 84, El Prat de Llobregat" },
    { id: 46, name: "La Docta", category: "alimentacio", lat: 41.3276398, lng: 2.0993613, color: "#e74c3c", description: "Av. de la Verge de Montserrat, 37, El Prat de Llobregat", address: "Av. de la Verge de Montserrat, 37, El Prat de Llobregat" },
    { id: 47, name: "Bicicletes Balaguer", category: "moda", lat: 41.3259927, lng: 2.0929951, color: "#3498db", description: "Carrer de Jaume Casanovas, 95, El Prat de Llobregat", address: "Carrer de Jaume Casanovas, 95, El Prat de Llobregat" },
    { id: 48, name: "Xoco Prat", category: "alimentacio", lat: 41.3300754, lng: 2.0987289, color: "#e74c3c", description: "Carrer d'Enric Borrás, 66, El Prat de Llobregat", address: "Carrer d'Enric Borrás, 66, El Prat de Llobregat" },
    { id: 49, name: "Llibreria Atenea", category: "cultura", lat: 41.3231661, lng: 2.0892828, color: "#f39c12", description: "Carrer de la Mercè, 33, El Prat de Llobregat", address: "Carrer de la Mercè, 33, El Prat de Llobregat" },
    { id: 50, name: "Servei Secretaria", category: "cultura", lat: 41.3283446, lng: 2.0953267, color: "#f39c12", description: "Carrer de Castella, 30, El Prat de Llobregat", address: "Carrer de Castella, 30, El Prat de Llobregat" },
    { id: 51, name: "El Closet", category: "moda", lat: 41.3308247, lng: 2.0955534, color: "#3498db", description: "Plaça de Catalunya, 28, El Prat de Llobregat", address: "Plaça de Catalunya, 28, El Prat de Llobregat" },
    { id: 52, name: "Montserratina", category: "alimentacio", lat: 41.3237878, lng: 2.0894425, color: "#e74c3c", description: "Carrer de Ramon Llull, 13, El Prat de Llobregat", address: "Carrer de Ramon Llull, 13, El Prat de Llobregat" },
    { id: 53, name: "Little Baby", category: "moda", lat: 41.3247224, lng: 2.101958, color: "#3498db", description: "Carrer de Lleida, 152, El Prat de Llobregat", address: "Carrer de Lleida, 152, El Prat de Llobregat" },
    { id: 54, name: "Benessere", category: "llar", lat: 41.3242976, lng: 2.1007665, color: "#2ecc71", description: "Carrer de Lleida, 140, El Prat de Llobregat", address: "Carrer de Lleida, 140, El Prat de Llobregat" },
    { id: 55, name: "Nathal", category: "moda", lat: 41.3270758, lng: 2.1003574, color: "#3498db", description: "Carretera de la Marina, 27, El Prat de Llobregat", address: "Carretera de la Marina, 27, El Prat de Llobregat" },
    { id: 56, name: "Tèxtil Siles", category: "moda", lat: 41.3265926, lng: 2.0991683, color: "#3498db", description: "Av. de la Verge de Montserrat, 31, El Prat de Llobregat", address: "Av. de la Verge de Montserrat, 31, El Prat de Llobregat" },
];


let map;
let markers = [];

// Render grid of comercios
function renderComerciosGrid() {
    const mapView = document.getElementById('mapView');
    if (!mapView) return;

    mapView.innerHTML = '';

    comerciosData.forEach(comercio => {
        const card = document.createElement('div');
        card.className = 'comercio-card';
        card.innerHTML = `
            <div class="comercio-number">${comercio.id}</div>
            <div class="comercio-name">${comercio.name}</div>
        `;
        card.addEventListener('click', () => focusComercio(comercio.id));
        mapView.appendChild(card);
    });
}

// Inicializar mapa con Leaflet
function initMap() {
    const mapLoading = document.getElementById('mapLoading');
    const mapElement = document.getElementById('comerciosMap');

    if (!mapElement) return;

    if (mapLoading) mapLoading.style.display = 'none';
    mapElement.style.display = 'block';

    // Centrar en El Prat de Llobregat
    map = L.map('comerciosMap').setView([41.3285, 2.0975], 15);

    // Tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    addMarkers();
    initMapFilters();
}

function addMarkers() {
    comerciosData.forEach(comercio => {
        const markerHtml = `
            <div style="
                width: 24px; 
                height: 24px; 
                background: ${comercio.color}; 
                border: 3px solid white; 
                border-radius: 50%; 
                box-shadow: 0 3px 10px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 11px;
            ">${comercio.id}</div>
        `;

        const customIcon = L.divIcon({
            html: markerHtml,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15],
            className: 'custom-marker'
        });

        const marker = L.marker([comercio.lat, comercio.lng], {
            icon: customIcon
        }).addTo(map);

        marker.bindPopup(`
            <div style="padding: 12px; min-width: 220px;">
                <h4 style="margin: 0 0 8px 0; color: #a3000f; font-weight: 600;">${comercio.name}</h4>
                <div style="display: inline-block; background: ${comercio.color}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">
                    ${getCategoryName(comercio.category)}
                </div>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">${comercio.description}</p>
                <p style="margin: 0 0 8px 0; color: #999; font-size: 12px;"><i class="fas fa-map-marker-alt"></i> ${comercio.address}</p>
                <small style="color: #999;">Comerç adherit #${comercio.id}</small>
            </div>
        `);

        marker.category = comercio.category;
        marker.comercioId = comercio.id;
        markers.push(marker);
    });
}

function getCategoryName(category) {
    const names = {
        'alimentacio': 'Alimentació',
        'moda': 'Moda',
        'llar': 'Llar',
        'cultura': 'Cultura',
        'restauracio': 'Restauració'
    };
    return names[category] || category;
}

function initMapFilters() {
    const filters = document.querySelectorAll('.map-filter');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            filterMarkers(filter.dataset.category);
        });
    });
}

function filterMarkers(category) {
    markers.forEach(marker => {
        if (category === 'all' || marker.category === category) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

function focusComercio(comercioId) {
    const comercio = comerciosData.find(c => c.id === comercioId);
    if (comercio && map) {
        map.setView([comercio.lat, comercio.lng], 18);
        const marker = markers.find(m => m.comercioId === comercioId);
        if (marker) marker.openPopup();

        // Scroll suau al mapa
        document.getElementById('comerciosMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function toggleBase(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('i');

    document.querySelectorAll('.base-content.active').forEach(item => {
        if (item !== content) {
            item.classList.remove('active');
            item.previousElementSibling.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    content.classList.toggle('active');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', function () {
    renderComerciosGrid();
    setTimeout(initMap, 500);
});