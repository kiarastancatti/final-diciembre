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

    // tapas duplicadas para formar 24 cartas
    const cartasImagenes = [...tapas, ...tapas];

    // mezcla array
    cartasImagenes.sort(() => Math.random() - 0.5);

    const tablero = document.getElementById("tablero-juego");

    let primeraCarta = null;
    let segundaCarta = null;
    let bloqueo = false;
    let parejasEncontradas = 0;
    const totalParejas = tapas.length;

    
    // crear la carta
    
    function crearCarta(nombreArchivo) {
        const carta = document.createElement("div");
        carta.classList.add("carta");
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

        // ensamblado
        carta.appendChild(imgDorso);
        carta.appendChild(imgFrente);

        // al hacer click
        carta.addEventListener("click", function () {

            if (bloqueo) return;
            if (carta.classList.contains("completada")) return;
            if (carta.classList.contains("destapada")) return;

            carta.classList.add("destapada");

            if (!primeraCarta) {
                primeraCarta = carta;
                return;
            }

            // segunda carta
            segundaCarta = carta;
            bloqueo = true;

            const img1 = primeraCarta.dataset.imagen;
            const img2 = segundaCarta.dataset.imagen;

            if (img1 === img2) {
                // pareja encontrada
                primeraCarta.classList.add("completada");
                segundaCarta.classList.add("completada");

                primeraCarta = null;
                segundaCarta = null;
                bloqueo = false;

                parejasEncontradas++;

                if (parejasEncontradas === totalParejas) {
                    setTimeout(() => {
                        alert("¡Ganaste! Ahora ya sos un BabaLover");
                    }, 400);
                }

            } else {
                // si no coinciden, se da vuelta
                setTimeout(() => {
                    if (primeraCarta) primeraCarta.classList.remove("destapada");
                    if (segundaCarta) segundaCarta.classList.remove("destapada");

                    primeraCarta = null;
                    segundaCarta = null;
                    bloqueo = false;
                }, 900);
            }
        });

        return carta;
    }

    
    // inserta cartas en el tablero
   
    cartasImagenes.forEach((nombre) => {
        const carta = crearCarta(nombre);
        tablero.appendChild(carta);
    });
});
