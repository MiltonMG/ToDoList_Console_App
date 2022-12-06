
require('colors');



const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('==================='.green);
        console.log('Selecciones una opcion:'.green);
        console.log('===================\n'.green);
        
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir\n`);

        //Creacion de la interface para mostrar y recibir informacion del usuario
        const readline = require('readline').createInterface({
            input: process.stdin,//esperar informacion del usuario
            output: process.stdout//mostrar informacion al usuario
        });

        //mostrar y recibir informacion del usuario
        readline.question('Seleccione una opcion: ', (answer) => {//mensaje y escritura

            //tenemos que cerrar esl readline cuando terminemos, por que sino se queda esperando informacion
            readline.close(); //cerramos luego de que escribiera
            resolve(answer)
        })
    })//!Fin de la promesa

    
}

const pausa = () => {
    return new Promise(resolve => {
        //Creacion de la interface para mostrar y recibir informacion del usuario
        const readline = require('readline').createInterface({
            input: process.stdin,//esperar informacion del usuario
            output: process.stdout//mostrar informacion al usuario
        });
    
        //mostrar y recibir informacion del usuario
        readline.question(`Preciones ${'ENTER'.green} para continuar\n`, (answer) => {//mensaje y escritura
            readline.close(); //cerramos luego de que escribiera
            resolve();
        })
    })//!Fin de la promesa
}


module.exports = {
    mostrarMenu,
    pausa
}

