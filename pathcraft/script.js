document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;
  
    // Appliquer le thème stocké (si présent)
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      if (toggleButton) toggleButton.textContent = "☀️";
    }
  
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");
        toggleButton.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
    }
  });
  