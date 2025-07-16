// script.js

const sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", () => {
  let mensaje = "PUNTOS\n\n";

  const campos = [
    { id: "campo0", label: "DEPARTAMENTO" },
    { id: "campo1", label: "1.- TIPIFICACIÓN" },
    { id: "campo2", label: "2.- HORA" },
    { id: "campo3", label: "3.- LUGAR" },
    { id: "campo4", label: "4.- COMUNA" },
    { id: "campo5", label: "5.- UNIDAD" },
    { id: "campo6", label: "6.- HECHO" },
    { id: "campo7", label: "7.- IDENTIDAD DETENIDOS" },
    { id: "campo8", label: "8.- INCAUTACIÓN" },
    { id: "campo9", label: "9.- FISCALÍA" },
    { id: "campo10", label: "10.- CUENTA OS1" },
  ];

  for (let campo of campos) {
    const valor = document.getElementById(campo.id).value.trim();
    if (valor !== "") {
      mensaje += `${campo.label}: ${valor}\n`;
    } else {
      break;
    }
  }

  const mensajeCodificado = encodeURIComponent(mensaje);
  const link = `https://wa.me/?text=${mensajeCodificado}`;
  window.open(link, "_blank");
});
