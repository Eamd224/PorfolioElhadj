function toggleMenu(){
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.deroulant-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
    
}

// mode sombre et clair
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Vérifier le mode enregistré
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleButton.textContent = "☀️ Mode Clair";
}

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  
  // Enregistrer la préférence utilisateur
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleButton.textContent = "☀️ Mode Clair";
  } else {
    localStorage.setItem("theme", "light");
    toggleButton.textContent = "🌙 Mode Sombre";
  }
});


// Fonction pour ouvrir la modale de la vidéo
function openVideoModal() {
  document.getElementById('videoModal').style.display = 'block';
}

// Fonction pour fermer la modale de la vidéo
function closeVideoModal(event) {
  if (event) {
    event.preventDefault();
  }
  document.getElementById('videoModal').style.display = 'none';
}

// Ouvrir la modale avec le jeu
function openModal() {
  document.getElementById('gameModal').style.display = 'block';
}

// Fermer la modale
function closeModal(event) {
  if (event) {
    event.stopPropagation(); 
  }
  document.getElementById('gameModal').style.display = 'none';
}


// Fonction pour ouvrir la modal du Projet 1
function openModalProject1() {
  document.getElementById("gameModalProject1").style.display = "block";
}

// Fonction pour fermer la modal du Projet 1
function closeModalProject1(event) {
  if (event.target === document.getElementById("gameModalProject1") || event.target === document.querySelector(".close")) {
    document.getElementById("gameModalProject1").style.display = "none";
  }
}
