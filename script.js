const sendBtn = document.getElementById("sendBtn");
const radioSi = document.getElementById("detenido-si");
const radioNo = document.getElementById("detenido-no");
const contenedorDetenidos = document.getElementById("detenidos-container");
const botonAgregar = document.getElementById("agregar-detenido");

let contadorDetenidos = 1;
const maxDetenidos = 5;

radioSi.addEventListener("change", () => {
  contenedorDetenidos.style.display = "block";
  botonAgregar.style.display = "block";
});

radioNo.addEventListener("change", () => {
  contenedorDetenidos.style.display = "none";
  botonAgregar.style.display = "none";
  // Eliminar todos los detenidos adicionales excepto el primero
  const detenidos = document.querySelectorAll(".detenido");
  detenidos.forEach((el, i) => {
    if (i > 0) el.remove();
  });
  contadorDetenidos = 1;
});

botonAgregar.addEventListener("click", () => {
  if (contadorDetenidos >= maxDetenidos) return;

  const original = document.getElementById("detenido-template");
  const clon = original.cloneNode(true);
  contadorDetenidos++;

  clon.querySelector("h4").textContent = `DETENIDO ${contadorDetenidos}`;
  clon.querySelectorAll("input").forEach(input => input.value = "");

  contenedorDetenidos.appendChild(clon);
});

sendBtn.addEventListener("click", () => {
  const departamento = document.getElementById("campo0").value.trim();
  let mensaje = "";

  if (departamento !== "") {
    mensaje += `DEPTO. O.S.9. (${departamento})\n\n`;
  }

  const campos = [
    { id: "campo1", label: "1.- TIPIFICACIÓN" },
    { id: "campo2", label: "2.- HORA" },
    { id: "campo3", label: "3.- LUGAR" },
    { id: "campo4", label: "4.- COMUNA" },
    { id: "campo5", label: "5.- UNIDAD" },
    { id: "campo6", label: "6.- HECHO" },
  ];

  for (let campo of campos) {
    const valor = document.getElementById(campo.id).value.trim();
    if (valor !== "") {
      mensaje += `${campo.label}: ${valor}\n`;
    } else {
      break;
    }
  }

  // DETENIDOS
  if (radioSi.checked) {
    const bloques = document.querySelectorAll(".detenido");
    bloques.forEach((bloque, i) => {
      const identidad = bloque.querySelector(".identidad").value.trim();
      const run = bloque.querySelector(".run").value.trim();
      const edad = bloque.querySelector(".edad").value.trim();
      const nacionalidad = bloque.querySelector(".nacionalidad").value.trim();
      const penales = bloque.querySelector(".penales").value.trim();
      const policiales = bloque.querySelector(".policiales").value.trim();

      mensaje += `\nDETENIDO ${i + 1}\n`;
      if (identidad) mensaje += `IDENTIDAD: ${identidad}\n`;
      if (run) mensaje += `RUN: ${run}\n`;
      if (edad) mensaje += `EDAD: ${edad}\n`;
      if (nacionalidad) mensaje += `NACIONALIDAD: ${nacionalidad}\n`;
      if (penales) mensaje += `ANTECEDENTES PENALES: ${penales}\n`;
      if (policiales) mensaje += `ANTECEDENTES POLICIALES: ${policiales}\n`;
    });
  }

  // Restantes
  const resto = [
    { id: "campo8", label: "8.- INCAUTACIÓN" },
    { id: "campo9", label: "9.- FISCALÍA" },
    { id: "campo10", label: "10.- CUENTA OS1" },
  ];

  for (let campo of resto) {
    const valor = document.getElementById(campo.id).value.trim();
    if (valor !== "") {
      mensaje += `${campo.label}: ${valor}\n`;
    }
  }

  const mensajeCodificado = encodeURIComponent(mensaje);
  const link = `https://wa.me/?text=${mensajeCodificado}`;
  window.open(link, "_blank");
});
