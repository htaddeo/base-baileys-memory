### CHATBOT Whatsapp (Baileys Provider)
Te dejo esta plantilla de un chatbot genérico creada en NodeJS. Esta plantilla está diseñada para proporcionar una base sólida y funcional desde la cual puedes desarrollar tu propio chatbot adaptado a tus necesidades. 
Distribución de Archivos en la Carpeta
La plantilla del chatbot está organizada en diversos archivos y scripts, cada uno con una funcionalidad específica:

Flows:
admin.flow.js: Contiene comandos administrativos para el administrador del bot, permitiendo activar o desactivar el bot y manejar conversaciones específicas.
form.flow.js: Implementa un formulario que realiza tres preguntas (nombre, correo electrónico y motivo de contacto) y sube las respuestas a Google Sheets.
gpt.flow.js: Maneja las interacciones con ChatGPT.
menu.flow.js: Presenta un menú con tres opciones:
    Ver un PDF
    Hacer una consulta
    Hablar con un asesor
sendPdf.flow.js: Envía un PDF almacenado localmente.
voiceNote.flow.js: Traduce notas de voz a texto y las envía a ChatGPT.
welcome.flow.js: Envía un saludo cuando alguien dice "hola".

Scripts:
chatgpt.js: Contiene la función para llamar a ChatGPT.
sheets.js: Gestiona las funciones relacionadas con Google Sheets.
utils.js: Incluye funciones de soporte para el bot, especialmente para los comandos administrativos.
voice2text.js: Contiene la función que traduce audios a texto.


Usa Esta Plantilla
Para usar esta plantilla, tenes que modificar los siguientes parametros:

1. admin.flow.js
Abre el archivo admin.flow.js.
Escribe el número de administrador en la siguiente linea
const adminNum = ["NUMERO ADMIN"];
Descomenenta la validación de admin
2. gpt.flow.js

Abre gpt.flow.js y edita el prompt para tu chatbot.
const prompt = "Sos un chatbot diseñado para responder preguntas";
3. voiceNote.flow.js

Abre voiceNote.flow.js y edita el prompt y la función de conversión de voz a texto.
const prompt = "Sos un chatbot diseñado para responder preguntas";
4. sendPdf.flow.js
Sube tu PDF a la carpeta pdfs.
Abre sendPdf.flow.js y cambia el nombre del PDF:
media: "http://localhost:4000/pdfs/tu-pdf.pdf",
5. sheets.js
Abre sheets.js.
Coloca el ID de tu hoja de cálculo de Google Sheets y asegúrate de que el path a tu archivo de autenticación es correcto:
keyFile: './google.json', 
const spreadsheetId = 'TU_ID_DE_HOJA_DE_CALCULO';
6. .env
Crea un archivo .env en la raíz del proyecto.
Agrega tu API Key de OpenAI:
OPENAI_API_KEY = "tu_api_key"
Conclusión
Espero que esta plantilla te sea de gran ayuda para desarrollar tu propio chatbot y adaptarlo a tus necesidades. Si tienes alguna duda, comentario o sugerencia, por favor agrégala en la sección de comentarios. ¡Estoy deseando ver cómo personalizas y mejoras esta plantilla!