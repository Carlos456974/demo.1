document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const anonimoSelect = document.getElementById("anonimo");
  const nombreCampo = document.getElementById("nombreCampo");
  const confirmation = document.getElementById("confirmation");

  // Ocultar o mostrar campo nombre
  anonimoSelect.addEventListener("change", () => {
    if (anonimoSelect.value === "sí") {
      nombreCampo.style.display = "none";
    } else {
      nombreCampo.style.display = "block";
    }
  });

  // Validar y enviar
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const anonima = anonimoSelect.value === "sí";
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const categoria = prompt("¿Cuál es la categoría de la queja? (Ej: violencia de género, mal trato, jefe, etc)").toLowerCase();
    
    if (!descripcion || !categoria) {
      alert("Debes llenar todos los campos requeridos y definir la categoría.");
      return;
    }

    // Si es violencia de género, redirigir
    if (categoria.includes("violencia")) {
      localStorage.setItem("tmpQueja", JSON.stringify({
        descripcion,
        anonima,
        nombre,
        categoria
      }));
      window.location.href = "violencia.html";
      return;
    }

    guardarDenuncia({ descripcion, anonima, nombre, categoria });
  });

  function guardarDenuncia({ descripcion, anonima, nombre, categoria }) {
    const folio = "Q" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
    const fecha = new Date().toLocaleString();

    const denuncia = {
      folio,
      descripcion,
      correo: anonima ? null : nombre || null,
      anonima,
      fecha,
      categoria,
      status: "Pendiente",
      comentarios: []
    };

    let denuncias = JSON.parse(localStorage.getItem("denuncias") || "[]");
    denuncias.push(denuncia);
    localStorage.setItem("denuncias", JSON.stringify(denuncias));

    confirmation.innerHTML = `<p>✅ Denuncia enviada con éxito. Tu folio es: <strong>${folio}</strong><br>
    <span style="color:#fff;">Guárdalo bien. Este código te servirá para dar seguimiento a tu denuncia.<br>
    <b>No lo compartas con nadie más.</b></span></p>`;
    confirmation.style.display = "block";
    form.reset();
    nombreCampo.style.display = "block";
  }
});
