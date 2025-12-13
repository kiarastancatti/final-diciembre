//espera a q todo el html este cargado para ejecutar el js
document.addEventListener("DOMContentLoaded", function () {
    //formulario
    const form = document.getElementById("form-contacto");

    //tomo los id del ofrmulario
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");
    const inputMensaje = document.getElementById("mensaje");

    // expresiones regulares
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,20}$/;
    const regexTelefono = /^[0-9]{10}$/;

    // con bootstrap se pinta de verde si el campo es valido
    //parametro "el" es elemento html (imputnombre, imputemail, imputtelefono)
    function setValid(el) {
        el.classList.add("is-valid");
        el.classList.remove("is-invalid");
    }

    //  con bootstrap se pinta de rojo si el campo es valido
    function setInvalid(el) {
        el.classList.add("is-invalid");
        el.classList.remove("is-valid");
    }

    // borra el estado visual
    function clearState(el) {
        el.classList.remove("is-valid");
        el.classList.remove("is-invalid");
    }

    // valida el nombre
    function validarNombre() {
        const valor = inputNombre.value.trim();
        //si esta vacio no marca error
        if (valor === "") { clearState(inputNombre); return false; }
        //si cumple la expresion regular es valido
        if (regexNombre.test(valor)) { setValid(inputNombre); return true; }
        //si no cumple es invalido
        setInvalid(inputNombre); return false;
    }

    //valida el email
    function validarEmail() {
        const valor = inputEmail.value.trim();
        if (valor === "") { clearState(inputEmail); return false; }

        //validacion simple del email
        const ok = valor.includes("@") && valor.includes(".") && valor.indexOf("@") > 0;
        if (ok) { setValid(inputEmail); return true; }
        setInvalid(inputEmail); return false;
    }

    //valida el telefono
    function validarTelefono() {
        const valor = inputTelefono.value.trim();
        if (valor === "") { clearState(inputTelefono); return false; }
        if (regexTelefono.test(valor)) { setValid(inputTelefono); return true; }
        setInvalid(inputTelefono); return false;
    }

    //valida q el mensaje no este vacio
    function validarMensaje() {
        const valor = inputMensaje.value.trim();
        if (valor === "") { setInvalid(inputMensaje); return false; }
        setValid(inputMensaje); return true;
    }

    // validación en vivo
    inputNombre.addEventListener("input", validarNombre);
    inputEmail.addEventListener("input", validarEmail);
    inputTelefono.addEventListener("input", validarTelefono);

    //si el mensaje esta vacio no se pinta de rojo
    inputMensaje.addEventListener("input", function () {
        const valor = inputMensaje.value.trim();
        if (valor === "") { clearState(inputMensaje); return; }
        validarMensaje();
    });

    // al mandanr el formulario
    form.addEventListener("submit", function (e) {
        //valida todos los campor
        const okNombre = validarNombre();
        const okEmail = validarEmail();
        const okTelefono = validarTelefono();
        const okMensaje = validarMensaje();

        //si alguno falla frena el envio
        if (!(okNombre && okEmail && okTelefono && okMensaje)) {
            e.preventDefault(); // evita q se mande a formspree
        }
        // si todo está ok no usa preventDefault y el form se envía a Formspree
    });
});

