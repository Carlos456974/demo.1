const form = document.getElementById("denunciaForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descripcion = form.descripcion.value.trim();
  const correo = form.correo.value.trim();
  const anonima = form.anonima.checked;

  if (!descripcion) {
    alert("Por favor escribe una descripción para la denuncia.");
    return;
  }

  const folio = Date.now() + Math.floor(Math.random() * 1000);
  const fecha = new Date().toLocaleString();

  const denuncia = {
    folio,
    descripcion,
    correo: anonima ? null : correo || null,
    anonima,
    fecha,
    status: "Pendiente",
  };

  let denuncias = JSON.parse(localStorage.getItem("denuncias") || "[]");
  denuncias.push(denuncia);
  localStorage.setItem("denuncias", JSON.stringify(denuncias));

  confirmation.style.display = "block";
  confirmation.textContent = \`Denuncia enviada con éxito. Tu folio es: \${folio}\`;

  form.reset();
});
