document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contacto");

    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");
    const inputMensaje = document.getElementById("mensaje");

    //mail al q se envia el correo
    const destinatario = "carastancat@gmail.com";

    // expresiones regulares
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,20}$/;
    const regexTelefono = /^[0-9]{10}$/;

    //clase de bootstrap isvalid pinta de verde el campo
    function setValid(el) {
        el.classList.add("is-valid");
        el.classList.remove("is-invalid");
    }

    //pinta de rojo el campo
    function setInvalid(el) {
        el.classList.add("is-invalid");
        el.classList.remove("is-valid");
    }

    //borra estado visual, verde o rojo
    function clearState(el) {
        el.classList.remove("is-valid");
        el.classList.remove("is-invalid");
    }

    //validacion del formulario
    //devuelven true o false y tambien actualizan el estado visual
    function validarNombre() {

        //lee el valor y saca espacios al principio y al final
        const valor = inputNombre.value.trim();

        //si esta vacio limpia el estado y devuelve false
        if (valor === "") { clearState(inputNombre); return false; }

        //si pasa la validacion, verde true y si no la pasa rojo false
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
    //cada vez que se escribe algo, chekea si esta bien o mal y lo pinta de verde o de rojo
    inputNombre.addEventListener("input", validarNombre);
    inputEmail.addEventListener("input", validarEmail);
    inputTelefono.addEventListener("input", validarTelefono);
    
    //validacion del mensaje
    //si esta vacio no se pinta de rojo
    //si tiene contenido lo valida normalmente
    inputMensaje.addEventListener("input", function () {
        
        const valor = inputMensaje.value.trim();
        if (valor === "") { clearState(inputMensaje); return; }
        validarMensaje();
    });

    // al enviar, valida todo y si está ok, arma el mail
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        //valida todo junto
        const okNombre = validarNombre();
        const okEmail = validarEmail();
        const okTelefono = validarTelefono();
        const okMensaje = validarMensaje();

        //si alguno es false, se ven los rojos
        if (!(okNombre && okEmail && okTelefono && okMensaje)) {
            return; 
        }

        //si todo esta ok, recupera los valores 
        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();
        const telefono = inputTelefono.value.trim();
        const mensaje = inputMensaje.value.trim();

        const asunto = "Contacto desde sitio Babasónicos";
        const cuerpo = `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`;

        //amrma el link de mailto con subjet y body
        //encodeURIComponent sirve por si hay espacios, acentos, etc. no rompe la url
        const mailtoLink =
            `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

            //redirige el navegador a mailto
        window.location.href = mailtoLink;
    });
});

