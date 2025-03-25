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