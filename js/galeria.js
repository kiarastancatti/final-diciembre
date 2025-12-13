document.addEventListener("DOMContentLoaded", function () {
    // botones de filtro
    //busca el boton con data-filter
    const filterButtons = document.querySelectorAll("button[data-filter]");
    //busca items de la galería
    const galleryItems = document.querySelectorAll(".galeria-item");

    // función para aplicar filtro
    function applyFilter(filter) {
        galleryItems.forEach(function (item) {
            const category = item.getAttribute("data-category");

            if (filter === "todos" || category === filter) {
                // mostrar
                item.classList.remove("d-none"); //d-none es clase de bootstrap para ocultar
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

            // cambia botón activo visualmente
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active"); //active es clase de bootstrap, cambia el color y marca el btn seleccionado
            });
            this.classList.add("active");

            // aplica filtro
            applyFilter(selectedFilter);
        });
    });

    // filtro inicial - mostrar todos
    applyFilter("todos");
});
