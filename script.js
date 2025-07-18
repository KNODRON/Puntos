document.addEventListener("DOMContentLoaded", () => {
  const horaInput = document.getElementById("campo2");
  const radiosDetenido = document.getElementsByName("detenido");
  const containerDetenidos = document.getElementById("detenidos-container");
  const btnAgregarDetenido = document.getElementById("agregar-detenido");

  const cuenta10Radios = document.getElementsByName("cuenta10");
  const cuenta10Detalle = document.getElementById("cuenta10-detalle");

  // Autoformato HH:MM hrs
  horaInput.addEventListener("input", () => {
    let value = horaInput.value.replace(/[^0-9]/g, "");
    if (value.length >= 3) value = value.slice(0, 2) + ":" + value.slice(2);
    if (value.length === 5 && !value.includes("hrs")) value += " hrs";
    horaInput.value = value;
  });

  // Mostrar campos detenidos
  radiosDetenido.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "si") {
        containerDetenidos.style.display = "block";
        btnAgregarDetenido.style.display = "inline-block";
      } else {
        containerDetenidos.style.display = "none";
        btnAgregarDetenido.style.display = "none";
      }
    });
  });

  // Agregar hasta 5 detenidos
  let cantidadDetenidos = 1;
  btnAgregarDetenido.addEventListener("click", () => {
    if (cantidadDetenidos >= 5) return;

    const template = document.getElementById("detenido-template");
    const nuevo = template.cloneNode(true);
    cantidadDetenidos++;

    nuevo.id = "";
    nuevo.querySelector("h4").textContent = `DETENIDO ${cantidadDetenidos}`;
    
    // Limpiar campos del nuevo detenido
    nuevo.querySelectorAll("input").forEach((input) => input.value = "");

    // Separación visual
    containerDetenidos.appendChild(document.createElement("hr"));
    containerDetenidos.appendChild(nuevo);
  });

  // Mostrar campo extra del punto 10
  cuenta10Radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      cuenta10Detalle.style.display = radio.value === "si" ? "block" : "none";
    });
  });

  // Botón Enviar
  document.getElementById("sendBtn").addEventListener("click", () => {
    let mensaje = "";
    const campo0 = document.getElementById("campo0").value.trim();
    if (campo0) mensaje += `${campo0.toUpperCase()}\n\n`;

    const campos = [
      { id: "campo1", label: "1.- TIPIFICACIÓN" },
      { id: "campo2", label: "2.- HORA" },
      { id: "campo3", label: "3.- LUGAR" },
      { id: "campo4", label: "4.- COMUNA" },
      { id: "campo5", label: "5.- UNIDAD" },
      { id: "campo6", label: "6.- HECHO" }
    ];

    for (let campo of campos) {
      const valor = document.getElementById(campo.id).value.trim();
      if (valor !== "") mensaje += `${campo.label}: ${valor}\n`;
    }

    // Campo 7: Detenidos
    const detenidoSI = document.getElementById("detenido-si").checked;
    const detenidoNO = document.getElementById("detenido-no").checked;

    mensaje += `7.- IDENTIDAD DETENIDOS:\n`;
    if (detenidoSI) {
      const bloques = document.querySelectorAll(".detenido");
      bloques.forEach((bloque, index) => {
        const identidad = bloque.querySelector(".identidad").value.trim();
        const run = bloque.querySelector(".run").value.trim();
        const edad = bloque.querySelector(".edad").value.trim();
        const nacionalidad = bloque.querySelector(".nacionalidad").value.trim();
        const penales = bloque.querySelector(".penales").value.trim();
        const policiales = bloque.querySelector(".policiales").value.trim();

        mensaje += `DETENIDO ${index + 1}:\n`;
        if (identidad) mensaje += `IDENTIDAD: ${identidad}\n`;
        if (run) mensaje += `RUN: ${run}\n`;
        if (edad) mensaje += `EDAD: ${edad}\n`;
        if (nacionalidad) mensaje += `NACIONALIDAD: ${nacionalidad}\n`;
        if (penales) mensaje += `ANTEPEN: ${penales}\n`;
        if (policiales) mensaje += `ANTPOL: ${policiales}\n`;
        mensaje += `\n`;
      });
    } else if (detenidoNO) {
      mensaje += `No hay detenidos\n`;
    }

    // Campo 8 y 9
    const campo8 = document.getElementById("campo8").value.trim();
    const campo9 = document.getElementById("campo9").value.trim();
    if (campo8) mensaje += `8.- INCAUTACIÓN: ${campo8}\n`;
    if (campo9) mensaje += `9.- FISCALÍA: ${campo9}\n`;

    // Campo 10
    const cuentaSI = document.getElementById("cuenta10-si").checked;
    const cuentaNO = document.getElementById("cuenta10-no").checked;
    mensaje += `10.- CUENTA OS1: `;
    if (cuentaSI) {
      const campo10 = document.getElementById("campo10").value.trim();
      mensaje += campo10 ? `${campo10}\n` : "Sí\n";
    } else if (cuentaNO) {
      mensaje += "No por parte de este Depto.\n";
    }

    // Enviar mensaje
    const mensajeCodificado = encodeURIComponent(mensaje);
    const link = `https://wa.me/?text=${mensajeCodificado}`;
    window.open(link, "_blank");
  });
});
