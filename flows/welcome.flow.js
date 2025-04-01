const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const welcomeFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.endFlow("Hola Soy Somi estoy para ayudarte! Podes escribir 'Menu' para ver las opciones o directamente hacer una consulta")
    })

module.exports = { welcomeFlow };