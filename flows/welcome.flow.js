const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const welcomeFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.endFlow("¡Bienvenido!😊 Soy Somi, tu asistente Virtual. Nos alegra mucho tenerte aquí. Esperamos que disfrutes tu experiencia y que encuentres todo lo que necesitas, Podes escribir 'Menu' para ver las opciones disponibles")    
    })

module.exports = { welcomeFlow };