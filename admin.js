if(localStorage.getItem("adminLogueado") !== "true"){
  window.location.href = "login.html";
}

const tbody = document.getElementById("denunciasTableBody");
const logoutBtn = document.getElementById("logoutBtn");

function cargarDenuncias() {
  const denuncias = JSON.parse(localStorage.getItem("denuncias") || "[]");

  tbody.innerHTML = "";

  denuncias.forEach((denuncia, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${denuncia.folio}</td>
      <td>${denuncia.fecha}</td>
      <td>${denuncia.descripcion}</td>
      <td>${denuncia.anonima ? "Anónima" : (denuncia.correo || "-")}</td>
      <td>${denuncia.anonima ? "Sí" : "No"}</td>
      <td>
        <select data-index="${index}">
          <option value="Pendiente" ${denuncia.status === "Pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="Revisando" ${denuncia.status === "Revisando" ? "selected" : ""}>Revisando</option>
          <option value="Revisado" ${denuncia.status === "Revisado" ? "selected" : ""}>Revisado</option>
        </select>
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      const denuncias = JSON.parse(localStorage.getItem("denuncias") || "[]");
      denuncias[index].status = e.target.value;
      localStorage.setItem("denuncias", JSON.stringify(denuncias));
      alert(\`Estatus actualizado a "\${e.target.value}" para folio \${denuncias[index].folio}\`);
    });
  });
}

cargarDenuncias();

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("adminLogueado");
  window.location.href = "login.html";
});
