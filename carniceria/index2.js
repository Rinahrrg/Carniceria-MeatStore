document.addEventListener('DOMContentLoaded', () => {
  // ================================
  // 🔥 Datos de la galería principal
  // ================================
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=800&h=400&fit=crop",
      title: "Cortes Premium",
      description: "Selección de carnes premium"
    },
    {
      src: "https://images.unsplash.com/photo-1588347818113-0c22eb10d1cd?w=800&h=400&fit=crop",
      title: "Carne de Res",
      description: "Cortes frescos y jugosos"
    },
    {
      src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=400&fit=crop",
      title: "Carne de Cerdo",
      description: "Sabor y frescura garantizada"
    },
    {
      src: "https://images.unsplash.com/photo-1604908177522-199b3c95a4da?w=800&h=400&fit=crop",
      title: "Carne Molida",
      description: "Perfecta para tus recetas"
    },
    {
      src: "https://images.unsplash.com/photo-1621346152149-9288bdb3b901?w=800&h=400&fit=crop",
      title: "Embutidos",
      description: "Variedad y calidad premium"
    }
  ];

  let currentGalleryIndex = 0;

  // ================================
  // ⚙️ Inicialización de la galería
  // ================================
  function createGalleryDots() {
    const dotsContainer = document.getElementById("galleryDots");
    dotsContainer.innerHTML = "";
    galleryImages.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("gallery-dot");
      dot.addEventListener("click", () => {
        currentGalleryIndex = index;
        updateGalleryDisplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateGalleryDisplay() {
    const currentImage = galleryImages[currentGalleryIndex];
    document.getElementById("currentGalleryImage").src = currentImage.src;
    document.getElementById("galleryTitle").textContent = currentImage.title;
    document.getElementById("galleryDescription").textContent =
      currentImage.description;

    // contador
    document.getElementById(
      "galleryCounter"
    ).textContent = `Imagen ${currentGalleryIndex + 1} de ${galleryImages.length}`;

    // actualizar dots
    const dots = document.querySelectorAll(".gallery-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentGalleryIndex);
    });
  }

  window.changeGalleryImage = function (direction) {
    currentGalleryIndex += direction;
    if (currentGalleryIndex < 0) {
      currentGalleryIndex = galleryImages.length - 1;
    } else if (currentGalleryIndex >= galleryImages.length) {
      currentGalleryIndex = 0;
    }
    updateGalleryDisplay();
  };

  // ================================
  // 🎞 Hero gallery
  // ================================
  const heroImages = document.querySelectorAll(".hero-image");
  let currentHeroIndex = 0;

  window.changeHeroImage = function (direction) {
    heroImages[currentHeroIndex].classList.remove("active");
    currentHeroIndex += direction;
    if (currentHeroIndex < 0) currentHeroIndex = heroImages.length - 1;
    if (currentHeroIndex >= heroImages.length) currentHeroIndex = 0;
    heroImages[currentHeroIndex].classList.add("active");
  };

  // ================================
  // 💬 Comentarios
  // ================================
  let comments = []; // podrías guardar en localStorage si quieres
  let currentCommentIndex = 0;

  const commentsSection = document.getElementById("commentsSection");
  const commentsDisplay = document.getElementById("commentsDisplay");
  const noComments = document.getElementById("noComments");
  const commentViewer = document.getElementById("commentViewer");
  const commentNavigation = document.getElementById("commentNavigation");

  window.toggleComments = function () {
    commentsSection.style.display =
      commentsSection.style.display === "none" ? "block" : "none";
  };

  window.addComment = function (e) {
    e.preventDefault();
    const author = document.getElementById("commentAuthor").value.trim();
    const content = document.getElementById("commentContent").value.trim();
    if (author && content) {
      const newComment = {
        author,
        content,
        date: new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric"
        })
      };
      comments.push(newComment);
      document.getElementById("commentAuthor").value = "";
      document.getElementById("commentContent").value = "";
      updateCommentsDisplay();
    }
  };

  function updateCommentsDisplay() {
    document.getElementById("commentsCount").textContent = comments.length;
    if (comments.length === 0) {
      noComments.style.display = "block";
      commentViewer.style.display = "none";
      commentNavigation.style.display = "none";
      return;
    }
    noComments.style.display = "none";
    commentViewer.style.display = "block";
    commentNavigation.style.display = comments.length > 1 ? "flex" : "none";
    showComment(currentCommentIndex);
  }

  function showComment(index) {
    const comment = comments[index];
    const currentComment = document.getElementById("currentComment");
    currentComment.innerHTML = `
      <div class="comment-header">
        <span class="comment-author">${comment.author}</span>
        <span class="comment-date">${comment.date}</span>
      </div>
      <div class="comment-content">${comment.content}</div>
    `;
    document.getElementById(
      "commentCounter"
    ).textContent = `Comentario ${index + 1} de ${comments.length}`;
  }

  window.changeComment = function (direction) {
    currentCommentIndex += direction;
    if (currentCommentIndex < 0) currentCommentIndex = comments.length - 1;
    if (currentCommentIndex >= comments.length) currentCommentIndex = 0;
    showComment(currentCommentIndex);
  };

  // ================================
  // ✨ Scroll animations
  // ================================
  function initializeScrollAnimations() {
    const scrollElements = document.querySelectorAll(
      ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right"
    );

    function handleScroll() {
      scrollElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          el.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // ejecutar al cargar
  }

  // ================================
  // 🔄 Navegación activa
  // ================================
  function initializeNavButtons() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        navButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // ================================
  // 🚀 Llamadas de inicialización
  // ================================
  createGalleryDots();
  updateGalleryDisplay();
  initializeScrollAnimations();
  initializeNavButtons();
});

