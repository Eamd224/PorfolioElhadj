function toggleMenu(){
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');   
}

// Mode sombre et clair amélioré
class ThemeManager {
    constructor() {
        this.toggleButton = document.getElementById("theme-toggle");
        this.body = document.body;
        this.init();
    }

    init() {
        // Détecter la préférence système
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem("theme");
        
        // Appliquer le thème selon les priorités : sauvegarde > préférence système > clair par défaut
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        // Écouter les changements de préférence système
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem("theme")) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // Écouter le clic sur le bouton
        this.toggleButton.addEventListener("click", () => this.toggleTheme());
        
        // Animation de transition fluide
        this.addTransitionStyles();
    }

    setTheme(theme) {
        if (theme === 'dark') {
            this.body.classList.add("dark-mode");
            this.toggleButton.innerHTML = "☀️ ";
            this.toggleButton.setAttribute('aria-label', 'Activer le mode clair');
        } else {
            this.body.classList.remove("dark-mode");
            this.toggleButton.innerHTML = "🌙 ";
            this.toggleButton.setAttribute('aria-label', 'Activer le mode sombre');
        }
        
        // Mettre à jour les métadonnées pour les navigateurs
        this.updateMetaThemeColor(theme);
    }

    toggleTheme() {
        const isDark = this.body.classList.contains("dark-mode");
        const newTheme = isDark ? 'light' : 'dark';
        
        // Animation de transition
        this.body.style.transition = 'none';
        this.setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        
        // Réactiver les transitions après un court délai
        setTimeout(() => {
            this.body.style.transition = '';
        }, 50);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (!metaThemeColor) {
            metaThemeColor = document.createElement("meta");
            metaThemeColor.name = "theme-color";
            document.getElementsByTagName('head')[0].appendChild(metaThemeColor);
        }
        metaThemeColor.content = theme === 'dark' ? '#282626' : '#ffffff';
    }

    addTransitionStyles() {
        // Ajouter des transitions fluides pour tous les éléments concernés
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
            
            .btn-mode {
                transition: all 0.3s ease;
                transform: translateY(-50%);
            }
            
            .btn-mode:hover {
                transform: translateY(-50%) scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialiser le gestionnaire de thème quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

// Fonction pour ouvrir la modale de la vidéo spotify
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Empêcher le scroll en arrière-plan
}

// Fonction pour fermer la modale de la vidéo spotify
function closeVideoModal(event) {
    if (event) {
        event.preventDefault();
    }
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('projectVideo');
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactiver le scroll
    
    // Arrêter la vidéo si elle joue
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// Ouvrir la modale avec le jeu
function openModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fermer la modale du jeu
function closeModal(event) {
    if (event) {
        event.stopPropagation(); 
    }
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fonction pour ouvrir la modal du projet netflix
function openModalProject1() {
    const modal = document.getElementById('gameModalProject1');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer la modal du projet netflix
function closeModalProject1(event) {
    if (event) {
        event.stopPropagation(); 
    }
    const modal = document.getElementById('gameModalProject1');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer les modales avec la touche Échap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // Fermer toutes les modales ouvertes
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Arrêter la vidéo si c'est la modale vidéo
                const video = modal.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }
});

// Amélioration de l'accessibilité pour le menu hamburger
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.setAttribute('role', 'button');
        hamburgerIcon.setAttribute('aria-label', 'Menu de navigation');
        hamburgerIcon.setAttribute('tabindex', '0');
        
        // Permettre l'activation avec Enter ou Espace
        hamburgerIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });
    }
});