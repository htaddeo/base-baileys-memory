const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { voiceToText } = require('../scripts/voice2text');
const { isActive, isConvActive } = require("../scripts/utils")
const { chat } = require("../scripts/chatgpt");

const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAction(async (ctx, ctxFn) => {
        //Primero, el bot esta Activo Globalmente?
        if (!await isActive(ctx, ctxFn)) {
            return ctxFn.endFlow() // No, esta desactivado
        } //Si, esta activo

        //Segundo, la conversación esta activa?
        if (!await isConvActive(ctx.from, ctxFn)) {
            return ctxFn.endFlow() // No, la conversación esta desactivada
        } //Si, el bot tiene que contestar

        const prompt = "Sos un chatbot diseñado para responder preguntas";
        const text = await voiceToText(ctx);

        // Recuperar el estado actual
        let userState = await ctxFn.state.getMyState() || {};
        userState.conversations = userState.conversations ?? [];
        const conversations = userState.conversations;

        // Crear el contexto con las últimas dos conversaciones
        const contextMessages = conversations.flatMap(conv => [
            { role: "user", content: conv.question },
            { role: "assistant", content: conv.answer }
        ]);

        // Añadir la pregunta actual al contexto
        contextMessages.push({ role: "user", content: text });

        // Obtener la respuesta de ChatGPT
        const response = await chat(prompt, contextMessages);

        // Actualizar el estado con la nueva conversación
        const newConversations = [...conversations, { question: text, answer: response }];
        if (newConversations.length > 2) {
            newConversations.shift(); // Mantener solo las últimas dos entradas
        }

        await ctxFn.state.update({ conversations: newConversations });

        // Enviar la respuesta al usuario
        await ctxFn.flowDynamic(response);
    })

module.exports = { voiceNoteFlow }