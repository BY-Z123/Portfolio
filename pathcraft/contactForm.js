document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Empêche l'envoi classique du formulaire
  
      const formData = new FormData(form);
      const action = form.getAttribute("action");
  
      // Envoyer les données à Formspree via AJAX
      fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            confirmationMessage.textContent = "Merci ! Votre message a bien été envoyé.";
            confirmationMessage.className = "alert alert-success";
            confirmationMessage.style.display = "block";
            form.reset();
          } else {
            return response.json().then(data => {
              if (Object.hasOwn(data, "errors")) {
                confirmationMessage.textContent = data.errors
                  .map(error => error.message)
                  .join(", ");
              } else {
                confirmationMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
              }
              confirmationMessage.className = "alert alert-danger";
              confirmationMessage.style.display = "block";
            });
          }
        })
        .catch(error => {
          confirmationMessage.textContent = "Erreur réseau. Vérifiez votre connexion.";
          confirmationMessage.className = "alert alert-danger";
          confirmationMessage.style.display = "block";
        });
    });
  });
  