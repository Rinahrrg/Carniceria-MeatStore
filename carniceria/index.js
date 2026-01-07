
const secciones = document.querySelectorAll("section");
function mostrarSeccion(id) {
  secciones.forEach(sec => {
    sec.classList.remove("activa");
    setTimeout(() => (sec.style.display = "none"), 300);
  });

  const activa = document.getElementById(id);
  activa.style.display = "block";
  setTimeout(() => activa.classList.add("activa"), 10);
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSeccion(link.getAttribute("href").substring(1));
    });
});
window.onload = () => mostrarSeccion("inicio");

const textos = {
  es: {
    titulo: "Carnicentro #1",
    bienvenida: "Calidad y frescura",
    productos: "Productos",
    contacto: "Contactos",
    // ... agrega los demás textos
  },
  en: {
    titulo: "Meat Market #1",
    bienvenida: "Quality and Freshness",
    productos: "Products",
    contacto: "Contact",
    // ...
  }
};

function cambiarIdioma(lang) {
  document.querySelector("header h1").textContent = textos[lang].titulo;
  document.querySelector("header p").textContent = textos[lang].bienvenida;
  document.querySelector("nav a[href='#productos']").textContent = textos[lang].productos;
  document.querySelector("nav a[href='#contactos']").textContent = textos[lang].contacto;
  // ... actualiza todos los elementos visibles
}
