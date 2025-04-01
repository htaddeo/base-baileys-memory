const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { sendPdfFlow } = require('./sendPdf.flow.js');
const { formFlow } = require("./form.flow.js")
const { gptFlow } = require('./gpt.flow.js');

const path = require('path');
const fs = require('fs');

const pathMenu = path.join(__dirname, "../mensajes", "menu.txt");
const menuText = fs.readFileSync(pathMenu, 'utf8');

const flow1 = addKeyword("1") //Opcion 2 del menu
    .addAnswer("Decime, en que te puedo ayudar sobre la Historia del Club?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.gotoFlow(gptFlow)
        })

const flow2 = addKeyword("2") //Opcion 2 del menu
    .addAnswer("Decime, en que te puedo ayudar sobre como asociarte?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.gotoFlow(gptFlow)
        })

 const flow3 = addKeyword("3") //Opcion 2 del menu
        .addAnswer("Decime, en que te puedo ayudar sobre el  alquiler de quinchos", { capture: true },
            async (ctx, ctxFn) => {
                await ctxFn.gotoFlow(gptFlow)
            })
  const flow4 = addKeyword("4") //Opcion 2 del menu
            .addAnswer("Decime, en que te puedo ayudar sobre el sector Nautico", { capture: true },
                async (ctx, ctxFn) => {
                    await ctxFn.gotoFlow(gptFlow)
                })
 const flow5 = addKeyword("5") //Opcion 2 del menu
                .addAnswer("Decime, en que te puedo ayudar sobre las recepciones de notas?", { capture: true },
                    async (ctx, ctxFn) => {
                        await ctxFn.gotoFlow(gptFlow)
                    })
 const flow6 = addKeyword("6") //Opcion 2 del menu
                            .addAnswer("Decime, en que te puedo ayudar sobre el Valor Cuota?", { capture: true },
                                async (ctx, ctxFn) => {
                                    await ctxFn.gotoFlow(gptFlow)
                                })
                                                                                    

const flow7 = addKeyword("7") //Opcion 1 del menu
    .addAnswer("Te adjunto el PDF")
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.gotoFlow(sendPdfFlow)
    })

const flow8 = addKeyword("8") //Opcion 2 del menu
    .addAnswer("Decime, en que te puedo ayudar ?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.gotoFlow(gptFlow)
        })

const flow9 = addKeyword("9") //Opcion 3 del menu
    .addAnswer("Excelente, te vamos a contactar con un asesor. Para eso te voy a hacer 3 preguntas")
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.gotoFlow(formFlow)
    })

const menuFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(menuText, { capture: true, }, //Si, quiere abrir el menu
        async (ctx, ctxFn) => {
            const opciones = ["1", "2", "3","4","5","6","7","8","9","0"]
            if (!opciones.includes(ctx.body)) {
                return ctxFn.fallBack("No elegiste una opcion correcta. Elegi 1,2, 3,4,5,6,7,8,9, o 0")
            }
            if (ctx.body === "0") {
                return ctxFn.endFlow("Volviendo al menu principal. Escribi 'Menu' para volver a ver las opciones")
            }
        }, [flow1, flow2, flow3, flow4, flow5, flow6, flow7, flow8, flow9])

module.exports = { menuFlow };