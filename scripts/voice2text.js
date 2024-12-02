const { downloadMediaMessage } = require("@adiwajshing/baileys");
const { OpenAI } = require("openai");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require('path');
ffmpeg.setFfmpegPath(ffmpegPath);
require("dotenv").config

const openaiApiKey = process.env.OPENAI_API_KEY;

const voiceGPT = async (path) => {
    if (!fs.existsSync(path)) {
        throw new Error("No se encuentra el archivo");
    }
    try {
        const openai = new OpenAI({
            apiKey: openaiApiKey,
        });
        const resp = await openai.audio.transcriptions.create({
            file: fs.createReadStream(path),
            model: "whisper-1",
        });
        return resp.text;
    } catch (err) {
        console.log(err);
        return "Error";
    }
};

const convertOggMp3 = async (inputStream, outStream) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputStream)
            .audioQuality(96)
            .toFormat("mp3")
            .save(outStream)
            .on("progress", (p) => null)
            .on("end", () => {
                resolve(true);
            });
    });
};

const voiceToText = async (ctx) => {
    const buffer = await downloadMediaMessage(ctx, "buffer");
    // Verificar si la carpeta tmp existe y crearla si no
    const tmpDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }
    const pathTmpOgg = `${process.cwd()}/tmp/voice-note-${Date.now()}.ogg`;
    const pathTmpMp3 = `${process.cwd()}/tmp/voice-note-${Date.now()}.mp3`;
    await fs.writeFileSync(pathTmpOgg, buffer);
    await convertOggMp3(pathTmpOgg, pathTmpMp3);
    const text = await voiceGPT(pathTmpMp3);
    fs.unlink(pathTmpMp3, (error) => {
        if (error) throw error;
    });
    fs.unlink(pathTmpOgg, (error) => {
        if (error) throw error;
    });
    return text;
};

module.exports = { voiceToText };