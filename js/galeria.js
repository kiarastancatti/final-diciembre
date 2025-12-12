document.addEventListener("DOMContentLoaded", function () {
    // botones de filtro
    const filterButtons = document.querySelectorAll("button[data-filter]");
    // items de la galería
    const galleryItems = document.querySelectorAll(".galeria-item");

    // función para aplicar filtro
    function applyFilter(filter) {
        galleryItems.forEach(function (item) {
            const category = item.getAttribute("data-category");

            if (filter === "todos" || category === filter) {
                // mostrar
                item.classList.remove("d-none");
            } else {
                // ocultar
                item.classList.add("d-none");
            }
        });
    }

    // asigno eventos a cada botón
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter = this.getAttribute("data-filter");

            // cambiar botón activo visualmente
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            this.classList.add("active");

            // aplicar filtro
            applyFilter(selectedFilter);
        });
    });

    // filtro inicial - mostrar todos
    applyFilter("todos");
});
