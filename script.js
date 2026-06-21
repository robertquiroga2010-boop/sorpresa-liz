// --- 1. CONFIGURACIÓN DEL EFECTO MATRIX ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        let text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// --- 2. LÓGICA DE LA CONVERSACIÓN ---

function escribir(texto) {
    document.getElementById("texto").innerText = texto;
}

function coincide(respuesta, lista) {
    return lista.some(palabra => respuesta.includes(palabra));
}

// Inicialización: Mensaje de bienvenida
window.onload = function() {
    escribir("Sistema: Infiltración iniciada. ¿Liz, estás ahí?");
    document.getElementById("miFoto").style.display = "none";
};

let paso = 0;

function verificar() {
    let input = document.getElementById("respuestaUsuario");
    let res = input.value.trim().toLowerCase();
    input.value = ""; // Limpiar caja después de enviar

    // Listas de palabras clave para las respuestas
    const listaSi = ["si", "hola", "estoy", "aca", "acá", "obvio", "claro", "soy yo"];
    const listaNoSe = ["no", "no se", "nose", "quien sos", "quien eres", "ni idea", "no tengo idea", "no se quien", "quien habla", "quien sos", "no, ni idea"];
    const listaPapa = ["papa", "papá", "pa", "papi", "padre", "viejo", "roberto", "rober", "vieja", "mi papa", "mi viejo", "mi pa"];
    const listaAmor = ["quiero", "amo", "también", "yo también", "te quiero"];

    // PASO 0: Inicio
    if (paso === 0) {
        if (coincide(res, listaSi)) {
            escribir("Sistema detectado. ¿Sabés quién está entrando en tu sistema o quién soy?");
            paso = 1;
        } else {
            escribir("Liz, respondé si estás ahí.");
        }
    } 
    // PASO 1: Identificación y Pistas
    else if (paso === 1) {
        if (coincide(res, listaNoSe)) {
            escribir("Jajaja, ¡qué mala memoria! Soy alguien que estuvo a tu lado desde el día que naciste, alguien que se casó con tu mamá y que te ama muchísimo. ¿Todavía no tenés idea de quién soy?");
        } 
        else if (coincide(res, listaPapa)) {
            escribir("Exacto. ¿Y qué soy yo para vos?");
            paso = 2;
        } 
        else if (res.includes("mama") || res.includes("mamá")) {
            escribir("Nop, soy el esposo de tu mamá. ¿Quién soy?");
        }
        else {
            escribir("No entiendo... concentrate. ¿Quién te está hablando?");
        }
    }
    // PASO 2: Confirmación y Foto
    else if (paso === 2) {
        if (coincide(res, listaPapa)) {
            escribir("Soy tu papá. Y te amo mucho, hija. Mirá.");
            document.getElementById("miFoto").style.display = "block";
            paso = 3; 
        } else if (coincide(res, listaNoSe)) {
            escribir("¿Otra vez? Pensá un poquito... ¿quién te habla siempre?");
        } else {
            escribir("Estás jugando conmigo... ¿Quién soy realmente?");
        }
    }
    // PASO 3: Intercambio final de cariño
    else if (paso === 3) {
        if (coincide(res, listaAmor)) {
            escribir("Yo también te amo muchísimo, Liz. Sos lo más importante para mí. ❤️");
            
            // Cierre automático tras 3 segundos
            setTimeout(() => {
                // Activar el cartel de cierre que definimos en el HTML y CSS
                document.getElementById('overlayFinal').style.display = 'flex';
                input.disabled = true; // Desactivar el input para que no escriba más
            }, 3000); 
            
            paso = 4;
        } else {
            escribir("¡Dale, no me digas eso! Decime algo lindo que tu viejo te está esperando 😉");
        }
    }
}