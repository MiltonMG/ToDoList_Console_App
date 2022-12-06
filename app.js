import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { confirmar, inquirerMenu, leerInput, listadoTareasBorrar, mostrarListadoCheckList, pausa } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
const main = async () => { 

    let answer = '';
    //instanciamos las tareas de la clase Tareas
    const tareas = new Tareas();

    //Traemos las tareas existentes
    const tareasDB = leerDB();

    if (tareasDB) {//Cargamos las tareas de la bd
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Imprime y Guaramos la opcion selecionada en el inquirerMenu
        answer = await inquirerMenu();

        switch (answer) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
            break;
            
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5'://Completar tareas
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                
                break;
            case '6'://Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr ) // nos retornar el id que el usuario quiere borrar
                if (id !== '0') {//Si la opcion es 0 no hace nada

                    const ok = await confirmar('¿Estas seguro?'); //Preguntamos si esta seguro de borrar

                    if (ok) {//Si esta seguro entonces borramos
                        tareas.borrarTarea( id );
                        console.log('TAREA BORRADA!'.black.bgGreen);
                    }
                }
                break;
            case '0':
            
                break;
        }

        guardarDB( tareas.listadoArr );
        
        await pausa()

    } while (answer !== '0');

}

main();