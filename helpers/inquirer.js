import inquirer from 'inquirer';

import colors from 'colors';

//Estas preguntas son las que necesita enquerer para
//mostrarlas como menu (esto en el el metodo: inquererMenu)
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value:'1',
                name:`${'1.'.green} Crear tarea`
            },
            {
                value:'2',
                name:`${'2.'.green} Listar tareas`
            },
            {
                value:'3',
                name:`${'3.'.green} Listar tareas completadas`
            },
            {
                value:'4',
                name:`${'4.'.green} Listar tareas pendientes`
            },
            {
                value:'5',
                name:`${'5.'.green} Completar tarea(s)`
            },
            {
                value:'6',
                name:`${'6.'.green} Borrar tarea`
            },
            {
                value:'0',
                name:`${'0.'.green} Salir`
            },
        ],  
    }
]

//Menu de la aplicacion
const inquirerMenu = async() => {
    console.clear();
    console.log('==============================='.green);
    console.log('Selecciones una opcion:'.white);
    console.log('===============================\n'.green);
    
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

//Este metodo solo genera un mensaje para que el usuario presione enter
const pausa = async () =>{ 
    console.log('\n');

    await inquirer.prompt({
        type: 'input',
        name: 'inputEnter',
        message: `Precione ${'ENTER'.green} para continuar\n`,
    });
}

//Este metodo lee todos la informacion (inputs) que 
//al usuario se le pidan (ej. crear tarea, id tarea a borrar)
const leerInput = async(message) => {
    const question = [//pregunta para utilizar en inquirer
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if( value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ];
    
    const {desc} = await inquirer.prompt(question)
    return desc
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map( (tarea, index) => {
        
        const idx = `${index+1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    } )

    choices.unshift({ //Nos sirve para agregar un nuevo objeto al inicio de todos
        value: '0',
        name: '0.'.green+' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async ( mensaje ) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map( (tarea, index) => {
        
        const idx = `${index+1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    } )

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}


export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList };