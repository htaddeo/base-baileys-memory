const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const welcomeFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.endFlow("Hola Soy Somi tu asistente VIRTUAL, estoy para ayudarte!. Podes escribir 'Menu' para ver las opciones disponibles")
    })

module.exports = { welcomeFlow };