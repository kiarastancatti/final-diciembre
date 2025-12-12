document.addEventListener("DOMContentLoaded", function () {

    // 12 tapas 
    const tapas = [
        "anoche.jpg",
        "aproposito.jpg",
        "babasonica.jpg",
        "discutible.jpg",
        "dopadrmo.jpg",
        "infame.jpg",
        "jessico.jpg",
        "miami.jpg",
        "mucho.jpg",
        "pasto.jpg",
        "romantisismico.jpg",
        "trance-zomba.jpg"
    ];

    // duplica las tapas para formar 24 cartas
    const cartasImagenes = [...tapas, ...tapas];

    // mezcla array
    cartasImagenes.sort(() => Math.random() - 0.5);

    //contenedor donde se insertan las cartas
    const tablero = document.getElementById("tablero-juego");

    let primeraCarta = null; //guarda la primera carta clickeada
    let segundaCarta = null; //guarda la segunda
    let bloqueo = false; //evita q se hagan cliks mientras se cmparan las cartas clikeadas
    let parejasEncontradas = 0; //contador de parejas correctas
    const totalParejas = tapas.length; //cant total de parejas

    
    // crear la carta
    //recibe el nombre de la img y devuelve un div armado
    
    function crearCarta(nombreArchivo) {
        //crea el contenedor de la carta
        const carta = document.createElement("div");
        carta.classList.add("carta");

        //guarda el nombre de la imagen para desp comparar si hay dos iguales
        carta.dataset.imagen = nombreArchivo;

        // dorso
        const imgDorso = document.createElement("img");
        imgDorso.src = "../img/discos/dorso.jpg";
        imgDorso.alt = "Dorso";
        imgDorso.classList.add("dorso");

        // frente
        const imgFrente = document.createElement("img");
        imgFrente.src = "../img/discos/" + nombreArchivo;
        imgFrente.alt = "Tapa " + nombreArchivo.replace(".jpg", "");
        imgFrente.classList.add("frente");

        // ensamblado, agrega ambas img dentro del div de la carta
        carta.appendChild(imgDorso);
        carta.appendChild(imgFrente);

        // al hacer click
        carta.addEventListener("click", function () {

            //si el tablero esta bloqueado no te deja hacer clik
            if (bloqueo) return;
            //si la carta ya formo pareja no te deja hacer clik
            if (carta.classList.contains("completada")) return;
            //si la carta esta destapada tampoco
            if (carta.classList.contains("destapada")) return;

            //destapa la carta
            carta.classList.add("destapada");

            if (!primeraCarta) {
                //si no hay una primera carta guardada, esta pasa a ser la primera y espera la segunda
                primeraCarta = carta;
                return;
            }

            // segunda carta
            segundaCarta = carta;
            bloqueo = true; //bloquea el tablero hasta resolver la jugada

            //compara las img usando data-atributo (para asociar datos a cada carta)
            const img1 = primeraCarta.dataset.imagen;
            const img2 = segundaCarta.dataset.imagen;

            //si coinciden
            if (img1 === img2) {
                // se marcan como completadas
                primeraCarta.classList.add("completada");
                segundaCarta.classList.add("completada");

                //reinicia las variables
                primeraCarta = null;
                segundaCarta = null;
                bloqueo = false;

                //suma una pareja encontrada
                parejasEncontradas++;

                //si encontraron todas las parejas gana el juego
                if (parejasEncontradas === totalParejas) {
                    setTimeout(() => {
                        alert("¡Ganaste! Ahora ya sos un BabaLover");
                    }, 400);
                }

            } else {
                // si no coinciden
                //espera un poco para que el jugador vea las cartas
                //y se dan vuelta
                setTimeout(() => {
                    if (primeraCarta) primeraCarta.classList.remove("destapada");
                    if (segundaCarta) segundaCarta.classList.remove("destapada");

                    //se reinician las variables
                    primeraCarta = null;
                    segundaCarta = null;
                    bloqueo = false;
                }, 900);
            }
        });

        //devuelve la carta ya armada
        return carta;
    }

    
    // crea todas las cartas
    //recorre el array de img mezcladas
    //crea cada carta y la agrega al tablero
   
    cartasImagenes.forEach((nombre) => {
        const carta = crearCarta(nombre);
        tablero.appendChild(carta);
    });
});
