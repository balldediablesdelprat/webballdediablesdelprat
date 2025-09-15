# Ball de Diables del Prat de Llobregat

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![Website](https://img.shields.io/website-up-down-green-red/https/balldediablesdelprat.cat.svg)](https://balldediablesdelprat.cat)

> Web oficial del Ball de Diables del Prat de Llobregat. Grup de foc tradicional català fundat el 2017 que segueix el model tradicional del món dels diables.

🌐 **Web en viu:** [balldediablesdelprat.cat](https://balldediablesdelprat.cat)

## 📋 Descripció

Aquest repositori conté el codi font de la web oficial del Ball de Diables del Prat de Llobregat. Una pàgina web moderna i completament responsiva que combina la tradició catalana amb un disseny web contemporani.

### ✨ Característiques principals

- **🎯 Single Page Application (SPA)** - Navegació fluida entre seccions
- **📱 Completament responsiva** - Optimitzada per tots els dispositius
- **🔥 Timeline interactiu** - Descobreix els nostres esdeveniments 2025
- **⏰ Comptador en temps real** - Fins a la propera Festa Major
- **🖼️ Galeria moderna** - Les millors fotos dels nostres actes
- **🎵 Integració Spotify** - Tocs de tabal tradicionals
- **🎰 Gran Panera Infernal 2025** - Sorteig solidari amb mapa interactiu
- **📧 Formulari de contacte** - Amb validació en temps real
- **♿ Totalment accessible** - Compleix estàndards WCAG

## 🚀 Tecnologies utilitzades

- **HTML5** semàntic amb microdata
- **CSS3** modern amb Grid i Flexbox
- **JavaScript ES6+** vanilla (sense frameworks)
- **Leaflet.js** per al mapa interactiu
- **FontAwesome** per a les icones
- **Google Fonts** (Montserrat)

## 📂 Estructura del projecte

```
ball-de-diables-prat/
├── index.html              # Pàgina principal
├── panera.html             # Pàgina de la Gran Panera Infernal 2025
├── CNAME                   # Configuració del domini personalitzat
├── css/
│   └── styles.css          # Estils principals amb disseny responsiu
├── js/
│   └── main.js             # Lògica JavaScript principal
├── images/                 # Imatges i logos
│   ├── Logo.png            # Logo principal
│   ├── LogoBlanc.png       # Logo blanc per fons foscos
│   ├── Rodona.png          # Logo rodó (favicon)
│   ├── Carretillada.jpg    # Imatge hero principal
│   ├── SantJordi.jpg       # Esdeveniments...
│   └── ...                 # Més imatges d'esdeveniments
└── README.md               # Aquest fitxer
```

## 🛠️ Instal·lació i desenvolupament local

1. **Clona el repositori:**
```bash
git clone https://github.com/vostreusuari/ball-de-diables-prat.git
cd ball-de-diables-prat
```

2. **Obre amb un servidor local:**
```bash
# Amb Python 3:
python -m http.server 8000

# Amb Node.js (http-server):
npx http-server

# Amb PHP:
php -S localhost:8000
```

3. **Visita:** `http://localhost:8000`

### 🔧 Desenvolupament

Per modificar la web, simplement edita els fitxers HTML, CSS i JavaScript. La web utilitza tecnologies web estàndard sense necessitat de compilació.

**Fitxers principals a modificar:**
- `index.html` - Contingut principal
- `css/styles.css` - Estils i disseny responsiu
- `js/main.js` - Funcionalitat interactiva

## 📱 Seccions de la web

### 🏠 Pàgina principal (index.html)
- **Hero** - Presentació amb logo i fons dinàmic
- **Qui som** - Informació sobre l'entitat
- **Comptador** - Fins a la propera Festa Major
- **Timeline 2025** - Esdeveniments interactius amb animacions
- **Històric de sortides** - Taula amb sortides passades i futures
- **Gran Panera Infernal 2025** - Sorteig solidari
- **Galeria** - Fotos dels nostres actes
- **Tocs de Tabal** - Integració amb Spotify
- **Contacte** - Formulari i xarxes socials

### 🎰 Gran Panera Infernal (panera.html)
- **Presentació del sorteig** - Premi de 1.250€
- **Mapa interactiu** - 60 comerços locals participants
- **Bases legals** - Condicions del sorteig
- **Informació de participació**

## 🎨 Branding i disseny

- **Colors principals:** Vermells (#a3000f, #520008, #ff2f44)
- **Tipografia:** Montserrat (Google Fonts)
- **Estil:** Modern amb elements tradicionals catalans
- **Icones:** FontAwesome 6
- **Imatges:** Fotografia pròpia d'alta qualitat

## ⚡ Rendiment i SEO

- **Lighthouse Score:** 90+ en totes les categories
- **SEO optimitzat** amb metadades completes
- **Open Graph** i Twitter Cards
- **Structured Data** (JSON-LD)
- **Imatges optimitzades** amb lazy loading
- **CSS i JS minificats** per producció

## 📧 Contacte i suport

- **Email:** balldediablesdelprat@gmail.com
- **Facebook:** [@BalldeDiablesPrat](https://www.facebook.com/BalldeDiablesPrat/)
- **Instagram:** [@balldediablesdelprat](https://www.instagram.com/balldediablesdelprat/)
- **Twitter:** [@balldiablesprat](https://twitter.com/balldiablesprat)

## 📝 Llicència

Aquest projecte està sota llicència MIT. Consulteu el fitxer [LICENSE](LICENSE) per a més detalls.

## 🤝 Contribucions

Les contribucions són benvingudes! Si vols ajudar a millorar la web:

1. Fes un fork del projecte
2. Crea una branca per a la teva funcionalitat (`git checkout -b feature/nova-funcionalitat`)
3. Commiteja els canvis (`git commit -m 'Afegeix nova funcionalitat'`)
4. Fes push a la branca (`git push origin feature/nova-funcionalitat`)
5. Obre un Pull Request

## 📱 Funcionalitats destacades

### 🔥 Timeline interactiu
Timeline amb animacions scroll-based que mostra els esdeveniments 2025 amb:
- Alternança visual esquerra/dreta
- Animacions d'entrada i sortida
- Dots animats
- Imatges de qualitat professional

### ⏰ Comptador en temps real
Comptador JavaScript que mostra el temps restant fins a la Festa Major 2025 (26 de setembre).

### 🗺️ Mapa dels comerços
Mapa interactiu amb Leaflet.js que mostra els 60 comerços participants en la Gran Panera Infernal amb:
- Filtratge per categories
- Popups informatius
- Llegenda visual
- Responsiu per mòbil

### 📱 Menú mòbil avançat
Menú hamburguesa amb:
- Animacions CSS fluides
- Efecte de difuminat (backdrop-filter)
- Flecos decoratius catalans
- Focus trap per accessibilitat

---

**Endavant diables!** 🔥

*Desenvolupat amb ❤️ pel Ball de Diables del Prat de Llobregat*

## 👨‍💻 Developer

**Marc García-Cuevas de Paz**  
📧 marcg-c20@hotmail.es  
📱 Instagram: [@marccgarciia](https://www.instagram.com/marccgarciia/)