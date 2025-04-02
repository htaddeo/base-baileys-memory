const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { sendPdfFlow } = require('./sendPdf.flow.js');
const { formFlow } = require("./form.flow.js")
//const { gptFlow } = require('./gpt.flow.js');

const path = require('path');
const fs = require('fs');

const pathMenu = path.join(__dirname, "../mensajes", "menu.txt");
const menuText = fs.readFileSync(pathMenu, 'utf8');

const flow1 = addKeyword("A") // Historia del Club
.addAnswer("Historia El Club Somisa, tuvo como primera sede a la entonces Copesa, luego el Hotel de Solteros, y más tarde a la Escuela N° 30, hasta alguna casa particular del Barrio Somisa. En las 17 hectáreas el inicio fue con una cancha de fútbol y dos de básquetbol abiertas. En 1970 se construyó la pileta olímpica, en 1974 el gimnasio cerrado y en 1983 la sede en Los Ceibos 1950 (actual). Tras la privatización de Somisa, el club quedó para los socios con la denominación Club Del Acuerdo, con Personería Jurídica, el 15 de agosto de 1992 y cuyo primer presidente fue el Ing. Eduardo Pérez.  El fútbol fue desde los comienzos la esencia misma del club y, aunque posteriormente el crecimiento de la institución promovió el desarrollo de otras actividades, aquel permaneció como la disciplina deportiva sobre la cual se sustenta la entidad y la que le valió su reconocimiento a nivel local y zonal, años más tarde el equipo de voley del club, logra ganar un torneo nacional, siendo así el primer título a nivel país que obtuvo Club Somisa. En la actualidad, el deporte de mayor influencia y el que mayor cantidad de socios lo practican, es el básquet, en el que compite a nivel provincial, con un público que ronda las 1.000 personas por partido, tanto en el torneo provincial como en el local. La mayor atracción de gente en la actualidad, la produce la pileta olímpica con su magnífico predio rodeado de arboles y sombrillas para pasar un verano al aire libre como en ningún otro lado. En el año 1990 se inauguró lo que hoy funciona como cantina restaurante, ubicada en la planta baja del edificio, en la que actualmente se da la mayor concentración de socios, reuniones familiares y celebraciones en general. En el primer piso esta la secretaria, donde se realizan las actividades administrativas del club y en el segundo piso, se encuentra el gimnasio de pesas junto con el sector de práctica de spinning.-")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})

const flow2 = addKeyword("B") // Alias del Club
.addAnswer("Alias del Club Unico alias del club es:")
.addAnswer("SOMISA-1950 ")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})

 const flow3 = addKeyword("C") //Valores de la Cuota
 .addAnswer("Valores de cuota social de los meses febrero, marzo y abril son:")
 .addAnswer("ACTIVOS $40000 ")
 .addAnswer("CAD.ACTIVO $37300 (de 12 a 17 años) ")
 .addAnswer("CAD. MENOR $34700 ( de 6 a 11 años) ")
 .addAnswer("JUBILADOS $34700")
 .addAnswer("ACTIVOS CON LICENCIA $34700")
 .addAnswer("PRE VITALICIOS $32000")
 .addAnswer("GRUPO FLIAR $122700")
 .addAnswer("Fecha de pago de cuotas es del 01 al 20 de cada mes.") 
 .addAnswer("Pagos con tarjeta de credito , tienen recargo, de 1 a 3 cuotas + 11,41% y en 6 cuotas + 20,84%") 
 .addAnswer("A. ⬅️ Menú principal ")
 .addAction(async (ctx, ctxFn) => {
 await ctxFn.gotoFlow(formFlow)
 })

  const flow4 = addKeyword("D") //Valor de Entrada a no socios
 .addAnswer("Valores de entrada a no socios : MAYORES DE 12 AÑOS EN ADELANTE ABONAN $7000 C/U")
 .addAnswer("DE 6 A 11 AÑOS Y JUBILADOS ABONAN $6000 C/U ")
 .addAnswer("EL ESTACIONAMIENTO $3000 POR AUTO")
 .addAnswer("A. ⬅️ Menú principal ")
 .addAction(async (ctx, ctxFn) => {
 await ctxFn.gotoFlow(formFlow)
 })

const flow5 = addKeyword("E") //Grupo familiar
.addAnswer("El grupo fliar se conforma por padre, madre y minimo 2 hijos de entre 6 a 17 años.")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})

const flow6 = addKeyword("F") // Horarios de atencion
.addAnswer("HORARIOS DE ATENCION DE SECRETARIA ")
.addAnswer("DE LUNES A VIERNES DE 11 HS A 19 HS")
.addAnswer("SABADOS DE 8 A 11,30 HS")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})
                                             
const flow7 = addKeyword("G") // Horarios  de gimnasio
.addAnswer("DE 7 A 12 HS Y DE 17 A 21 HS ")
.addAnswer("SABADOS DE 8 A 12 HS" )
.addAnswer("Feriados nacionales esta cerrado")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})

const flow8 = addKeyword("H") // Horario de pileta climatizada
.addAnswer("DE 7 A 12 HS Y DE 17 A 21 HS / SABADOS DE 8 A 12 HS / Feriados nacionales esta cerrado")
.addAnswer("SABADOS DE 8 A 12 HS" )
.addAnswer("Feriados nacionales esta cerrado")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})
        
const flow9 = addKeyword("I") //Guarderia
.addAnswer("Precios de guarderia de box compartidos $45000 por mes")
.addAnswer("Boxes individuales $50000 por mes.")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})
                             
const flow10 = addKeyword("J") //Fichas de la luz de canchas
.addAnswer("FICHAS DE LUZ DE CANCHAS")
.addAnswer("FUTBOL $15000")
.addAnswer("FICHAS DE TENIS $4000")
.addAnswer("FICHAS DE PADEL $4000")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})

const flow11 = addKeyword("K") //Carpas y Casas rodantes
.addAnswer("CARPAS Y CASAS RODANTES *SOCIOS $5000 POR NOCHE x CARPA *NO SOCIOS X NOCHE $15000 ")
.addAnswer("ENTRADA POR PERSONA $7000 +AUTO $3000")
.addAnswer("CASA RODANTE SOCIOS $5000 ")
.addAnswer("CASA RODANTE NO SOCIO $18000 + ENTRADA $7000")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})
                     
const flow12 = addKeyword("L") //Becas municipales
.addAnswer("SE ENTREGAN  APARRTIR DEL 10 DE FEBRERO De Lunes a Viernes de 7 a 12 hs y de 17 a 21hsy Sabados de 8 a 12hs")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})                    

const flow13 = addKeyword("M") //Quinchos
.addAnswer("Quincho Pileta: de uso comun para los socios")
.addAnswer("Quincho Tenis: Se alquila solo de tarde/noche -> Info en secretaria")
.addAnswer("Quincho Tejo: Para alquilar info en secretaria")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})  

const flow14 = addKeyword("N") //Deportes
.addAnswer("Consultar en secretaria")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
})  

const flow15 = addKeyword("O") //Showroom
.addAnswer("Horarios de Atencion:")
.addAnswer("Lunes, Miercoles y Viernes: 16:30 a 20:30")
.addAnswer("Martes, Jueves y Sabados: 08:30 a 12:30")
.addAnswer("Domingo y Feriados CERRADO")
.addAnswer("A. ⬅️ Menú principal ")
.addAction(async (ctx, ctxFn) => {
await ctxFn.gotoFlow(formFlow)
}) 


//const flow14 = addKeyword("N") //Deportes (Spinning,Funcional)
//.addAnswer(" Spinning : Martes y jueves 7 am Funcional : De lunes a viernes 8 am profesor: ALVARO LLUCH *si tenes la cuota al día, vas directamente a la clase Lunes , miércoles y viernes  de 18 a 19hs /de 19 a 20hs /de 20 a 21hs Funcional: NATI SANCHEZ *si tenes la cuota al día, vas directamente a la clase / Spinning : lunes y miércoles  a las 18.15  y  19,15 y martes y jueves  a las 19,15 hs y      20:15 hs profesor: NOELIA ROBLEDO *si tenes la cuota al día, vas directamente a la clase")
//.addAnswer("A. ⬅️ Menú principal ")
//.addAction(async (ctx, ctxFn) => {
//await ctxFn.gotoFlow(formFlow)
//})  

//const flow13 = addKeyword("7") //Opcion 1 del menu
//    .addAnswer("Te adjunto el PDF")
//    .addAnswer("A.⬅️ Menú principal ")
//    .addAction(async (ctx, ctxFn) => {
//        await ctxFn.gotoFlow(formFlow)
//    })

//const flow14 = addKeyword("8") //Opcion 2 del menu
//    .addAnswer("Decime, en que te puedo ayudar ?", { capture: true },
//        async (ctx, ctxFn) => {
//            await ctxFn.gotoFlow(gptFlow)
//        })


const menuFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(menuText, { capture: true, }, //Si, quiere abrir el menu
        async (ctx, ctxFn) => {
            const opciones = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","Z"]
            if (!opciones.includes(ctx.body)) {
                return ctxFn.fallBack("No elegiste una opcion correcta. Elegi A,B,C,D,E,F,G,H,I,J,K,L,M,N,O ")
            }
            if (ctx.body === "Z") {
                return ctxFn.endFlow("Volviendo al menu principal. Escribi 'Menu' para volver a ver las opciones")
            }
        }, [flow1, flow2, flow3, flow4, flow5, flow6, flow7, flow8, flow9, flow10, flow11, flow12, flow13, flow14, flow15 ])
module.exports = { menuFlow };