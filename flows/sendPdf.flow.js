const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const express = require('express');

// Definir la función para enviar el PDF
const sendPdfFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, ctxFn) => {
        return await ctxFn.flowDynamic([
            {
                body: "Pdf",
                media: "http://localhost:4000/pdfs/restaurant-menu.pdf",
            }
        ]);
    });

module.exports = { sendPdfFlow };