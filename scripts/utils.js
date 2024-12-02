//Bot Global esta activo?
const isActive = async (ctx, ctxFn) => {
    let currentGlobalState = await ctxFn.globalState.getMyState();
    currentGlobalState.encendido = currentGlobalState.encendido ?? true;
    return currentGlobalState.encendido
}

//Activar / Desactivar bot
const toogleActiveBot = async (ctx, ctxFn) => {
    if (await isActive(ctx, ctxFn)) {
        await ctxFn.globalState.update({ encendido: false });
        return ctxFn.flowDynamic("Bot desactivado.");
    } else {
        await ctxFn.globalState.update({ encendido: true });
        return ctxFn.flowDynamic("Bot activado.");
    }
}

//Conversación activa
const isConvActive = async (number, ctxFn) => {
    let currentGlobalState = await ctxFn.globalState.getMyState();
    let convOff = currentGlobalState.convOff ?? {};

    if (convOff[number]) {
        let deactivationDate = new Date(convOff[number]);
        let currentDate = new Date();
        let hoursDiff = (currentDate - deactivationDate) / (1000 * 60 * 60);

        // Verificar si la diferencia es mayor a 48 horas
        if (hoursDiff < 48) {
            return false;
        } else {
            return true;
        }
    } else {
        // Si el número no existe en convOff, la conversación está activa
        return true;
    }
}

//Activar / desactivar conversación
const toggleActive = async (number, ctxFn) => {
    let currentGlobalState = await ctxFn.globalState.getMyState();
    let convOff = currentGlobalState.convOff ?? {};
    let isActive = await isConvActive(number, ctxFn);

    if (isActive) {
        // Si está activa, desactivarla
        convOff[number] = new Date().toISOString(); // Guardar la fecha actual en formato ISO
        await ctxFn.flowDynamic("Conversación desactivada.");
    } else {
        // Si está desactivada, activarla
        delete convOff[number]; // Remover el número de convOff
        await ctxFn.flowDynamic("Conversación reactivada.");
    }

    // Actualizar el estado global con el nuevo convOff
    currentGlobalState.convOff = convOff;
    await ctxFn.globalState.update(currentGlobalState);

    return !isActive; // Devolver el nuevo estado
};

const conversationsOff = async (ctxFn) => {
    let currentGlobalState = await ctxFn.globalState.getMyState();
    let convOff = currentGlobalState.convOff ?? {};
    let result = [];

    for (let number in convOff) {
        if (convOff.hasOwnProperty(number)) {
            let deactivationDate = new Date(convOff[number]);
            let currentDate = new Date();
            let timeDiff = 48 * 60 * 60 * 1000 - (currentDate - deactivationDate); // Tiempo restante en ms
            if (timeDiff > 0) {
                let hours = Math.floor(timeDiff / (1000 * 60 * 60));
                let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                result.push([number, `Tiempo restante para reactivarse - ${hours}hs ${minutes}minutos`]);
            } else {
                // El tiempo ya ha pasado, lo removemos
                delete convOff[number];
            }
        }
    }

    // Actualizar el estado global si hemos removido números desactivados
    currentGlobalState.convOff = convOff;
    await ctxFn.globalState.update(currentGlobalState);

    return result;
};


module.exports = { isActive, isConvActive, toggleActive, toogleActiveBot, conversationsOff }