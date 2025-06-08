const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const { sendPdfFlow } = require('./sendPdf.flow.js');
const { formFlow } = require("./form.flow.js");
const path = require('path');
const fs = require('fs');

// Cargar texto del menú desde archivo
const pathMenu = path.join(__dirname, "../mensajes", "menu.txt");
const menuText = fs.readFileSync(pathMenu, 'utf8');

// Función para crear flujos dinámicamente
const createFlow = (keyword, answers) => 
    addKeyword(keyword)
        .addAnswer(answers.join("\n"))
        .addAnswer("*a*. ⬅️ Menú principal")
//      .addAnswer("B. ⬅️ Salir")
        .addAction(async (ctx, ctxFn) => {
            if (ctx.body.toUpperCase().trim() === "B") {
                return ctxFn.endFlow("Gracias por tu consulta! 😊\nEscribí 'Menú' para volver.");
            }
            await ctxFn.gotoFlow(formFlow);
        });

// Definimos los flujos en un objeto para mayor claridad y facilidad de modificación
const flows = {
    "A": createFlow("A", ["📜 *Historia El Club Somisa, tuvo como primera sede a la entonces Copesa, luego el Hotel de Solteros, y más tarde a la Escuela N° 30, hasta alguna casa particular del Barrio Somisa. En las 17 hectáreas el inicio fue con una cancha de fútbol y dos de básquetbol abiertas. En 1970 se construyó la pileta olímpica, en 1974 el gimnasio cerrado y en 1983 la sede en Los Ceibos 1950 (actual). Tras la privatización de Somisa, el club quedó para los socios con la denominación Club Del Acuerdo, con Personería Jurídica, el 15 de agosto de 1992 y cuyo primer presidente fue el Ing. Eduardo Pérez.  El fútbol fue desde los comienzos la esencia misma del club y, aunque posteriormente el crecimiento de la institución promovió el desarrollo de otras actividades, aquel permaneció como la disciplina deportiva sobre la cual se sustenta la entidad y la que le valió su reconocimiento a nivel local y zonal, años más tarde el equipo de voley del club, logra ganar un torneo nacional, siendo así el primer título a nivel país que obtuvo Club Somisa. En la actualidad, el deporte de mayor influencia y el que mayor cantidad de socios lo practican, es el básquet, en el que compite a nivel provincial, con un público que ronda las 1.000 personas por partido, tanto en el torneo provincial como en el local. La mayor atracción de gente en la actualidad, la produce la pileta olímpica con su magnífico predio rodeado de arboles y sombrillas para pasar un verano al aire libre como en ningún otro lado. En el año 1990 se inauguró lo que hoy funciona como cantina restaurante, ubicada en la planta baja del edificio, en la que actualmente se da la mayor concentración de socios, reuniones familiares y celebraciones en general. En el primer piso esta la secretaria, donde se realizan las actividades administrativas del club y en el segundo piso, se encuentra el gimnasio de pesas junto con el sector de práctica de spinning."]),
    "B": createFlow("B", ["🏦 *Alias del Club:* SOMISA-1950"]),
  "C": createFlow("C", [
        "💰 *Valores de cuota social:*",
        "🔹 ACTIVOS $45.000",
        "🔹 CAD.ACTIVO (12 a 17 años) $42.000",
        "🔹 CAD. MENOR (6 a 11 años) $39.000",
        "🔹 JUBILADOS $39.000",
        "🔹 GRUPO FLIAR $138.000",
        "📆 Fecha de pago: del 01 al 20 de cada mes.",
        "💳 Tarjeta de crédito: 1 a 3 cuotas +11.41%, 6 cuotas +20.84%"
    ]),
    "D": createFlow("D", [
        "🎟️ *Valores de entrada a NO SOCIOS*",
        "🔹 Mayores de 12 años: $7.000",
        "🔹 Niños (6-11 años) y jubilados: $6.000",
        "🚗 Estacionamiento: $3.000 por auto"
    ]),
    "E": createFlow("E", ["👨‍👩‍👧‍👦 *Grupo familiar:* Padre, madre y 2 hijos (6-17 años)."]),
    "F": createFlow("F", [
        "🕒 *Horario de Atención Secretaría*",
        "🔹 Lunes a Viernes: 11:00 - 19:00",
        "🔹 Sábados: 08:00 - 11:30"
    ]),
    "G": createFlow("G", [
        "🏋️ *Horario de Gimnasio*",
        "🔹 Lunes a Viernes: 07:00 - 12:00 y 17:00 - 21:00",
        "🔹 Sábados: 08:00 - 12:00",
        "⚠️ Feriados nacionales: CERRADO"
    ]),
    "H": createFlow("H", ["🏊 *Horario Pileta Climatizada*", "🔹 Lunes a Viernes: 07:00 - 21:00", "⚠️ Feriados nacionales: CERRADO"]),
    "I": createFlow("I", ["🗄️ *Guardería*", "🔹 Box compartido: $45.000/mes", "🔹 Box individual: $50.000/mes"]),
    "J": createFlow("J", [
        "💡 *Fichas de Luz Canchas*",
        "⚽ Fútbol: $15.000",
        "🎾 Tenis: $4.000",
        "🏓 Pádel: $4.000"
    ]),
    "K": createFlow("K", [
        "🏕️ *Carpas y Casas Rodantes*",
        "🔹 Socios: $5.000/noche",
        "🔹 No socios: $15.000/noche + Entrada $7.000 + Auto $3.000",
        "🚐 Casa Rodante No Socio: $18.000"
    ]),
   "L": createFlow("L", [
        "🎓 *Becas Municipales*",
        "📅 Se entregan a partir del 10 de febrero.",
        "🕒 Lunes a Viernes: 07:00 - 12:00 y 17:00 - 21:00",
        "🕒 Sábados: 08:00 - 12:00"
    ]),
    "M": createFlow("M", [
        "🏠 *Quinchos*",
        "🔹 Pileta: Uso común socios",
        "🔹 Tenis: Alquiler tarde/noche (Info en secretaría)",
        "🔹 Tejo: Alquiler (Info en secretaría)"
    ]),


    "N": addKeyword("R")
    .addAnswer("📄 Horarios de Deportes:", {
        media: "http://localhost:4000/pdfs/Deportes.pdf" // 🔁 cambiá por la URL real
    
    }),
    "O": createFlow("O", [
        "🛍️ *Showroom*",
        "📅 Lunes, Miércoles y Viernes: 16:30 - 20:30",
        "📅 Martes, Jueves y Sábados: 08:30 - 12:30",
        "🚫 Domingo y Feriados: CERRADO"
    ]),
    "P": createFlow("P", [
        "🌐 *Reservas en línea*",
        "📌 Puedes realizar tu reserva en el siguiente enlace:",
        "🔗 www.tureservasomisa.com"
    ]),    
    "Q": createFlow("Q", [
        "📲 *Chatear por WhatsApp*",
        "Para comunicarte con nosotros por WhatsApp, haz clic en el siguiente enlace:",
        "👉 https://wa.me/5493364566412"
    ]), 
    "R": createFlow("R", [
        "📍 *Ubicación del Club Somisa*",
        "Los Ceibos 1950, B2900 San Nicolás de Los Arroyos, Provincia de Buenos Aires",
        "👉 [Abrir en Google Maps](https://maps.app.goo.gl/APB8zLq4um9dszbr9)"
    ]), 

};


// Menú principal
const menuFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(menuText, { capture: true }, async (ctx, ctxFn) => {
        const opcion = ctx.body.toUpperCase().trim();

        if (!flows[opcion] && opcion !== "Z" && opcion !== "0") {
            return ctxFn.fallBack("⚠️ Opción inválida. Elige entre A, B, C, D, E, F, G, H, I, J, K, L, M, N, O o Z.");
        }

        if (opcion === "0" || opcion === "Z") {
            return ctxFn.endFlow("Gracias por tu consulta! 😊\nEscribí 'Menú' para volver.");
        }

        await ctxFn.gotoFlow(flows[opcion]);
    });

// Exportar menú
module.exports = { menuFlow };