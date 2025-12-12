document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contacto");

    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");
    const inputMensaje = document.getElementById("mensaje");

    const destinatario = "carastancat@gmail.com";

    // reglas
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,20}$/;
    const regexTelefono = /^[0-9]{10}$/;

    function setValid(el) {
        el.classList.add("is-valid");
        el.classList.remove("is-invalid");
    }

    function setInvalid(el) {
        el.classList.add("is-invalid");
        el.classList.remove("is-valid");
    }

    function clearState(el) {
        el.classList.remove("is-valid");
        el.classList.remove("is-invalid");
    }

    function validarNombre() {
        const valor = inputNombre.value.trim();
        if (valor === "") { clearState(inputNombre); return false; }
        if (regexNombre.test(valor)) { setValid(inputNombre); return true; }
        setInvalid(inputNombre); return false;
    }

    function validarEmail() {
        const valor = inputEmail.value.trim();
        if (valor === "") { clearState(inputEmail); return false; }
        
        const ok = valor.includes("@") && valor.includes(".") && valor.indexOf("@") > 0;
        if (ok) { setValid(inputEmail); return true; }
        setInvalid(inputEmail); return false;
    }

    function validarTelefono() {
        const valor = inputTelefono.value.trim();
        if (valor === "") { clearState(inputTelefono); return false; }
        if (regexTelefono.test(valor)) { setValid(inputTelefono); return true; }
        setInvalid(inputTelefono); return false;
    }

    function validarMensaje() {
        const valor = inputMensaje.value.trim();
        if (valor === "") { setInvalid(inputMensaje); return false; }
        setValid(inputMensaje); return true;
    }

    // validación en vivo
    inputNombre.addEventListener("input", validarNombre);
    inputEmail.addEventListener("input", validarEmail);
    inputTelefono.addEventListener("input", validarTelefono);
    inputMensaje.addEventListener("input", function () {
        
        const valor = inputMensaje.value.trim();
        if (valor === "") { clearState(inputMensaje); return; }
        validarMensaje();
    });

    // al enviar, valida todo y si está ok, arma el mail
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const okNombre = validarNombre();
        const okEmail = validarEmail();
        const okTelefono = validarTelefono();
        const okMensaje = validarMensaje();

        if (!(okNombre && okEmail && okTelefono && okMensaje)) {
            return; // se ven los rojos con sus mensajes
        }

        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();
        const telefono = inputTelefono.value.trim();
        const mensaje = inputMensaje.value.trim();

        const asunto = "Contacto desde sitio Babasónicos";
        const cuerpo = `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`;

        const mailtoLink =
            `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

        window.location.href = mailtoLink;
    });
});

