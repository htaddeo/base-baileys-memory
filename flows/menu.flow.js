const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { sendPdfFlow } = require('./sendPdf.flow.js');
const { formFlow } = require("./form.flow.js")
const { gptFlow } = require('./gpt.flow.js');

const path = require('path');
const fs = require('fs');

const pathMenu = path.join(__dirname, "../mensajes", "menu.txt");
const menuText = fs.readFileSync(pathMenu, 'utf8');

const flow1 = addKeyword("1") //Opcion 1 del menu
    .addAnswer("Te adjunto el PDF")
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.gotoFlow(sendPdfFlow)
    })

const flow2 = addKeyword("2") //Opcion 2 del menu
    .addAnswer("Decime, en que te puedo ayudar sobre el Club Somisa?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.gotoFlow(gptFlow)
        })

const flow3 = addKeyword("3") //Opcion 3 del menu
    .addAnswer("Excelente, te vamos a contactar con un asesor. Para eso te voy a hacer 3 preguntas")
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.gotoFlow(formFlow)
    })

const menuFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(menuText, { capture: true, }, //Si, quiere abrir el menu
        async (ctx, ctxFn) => {
            const opciones = ["1", "2", "3", "0"]
            if (!opciones.includes(ctx.body)) {
                return ctxFn.fallBack("No elegiste una opcion correcta. Elegi 1, 2, 3 o 0")
            }
            if (ctx.body === "0") {
                return ctxFn.endFlow("Volviendo al menu principal. Escribi 'Menu' para volver a ver las opciones")
            }
        }, [flow1, flow2, flow3])

module.exports = { menuFlow };