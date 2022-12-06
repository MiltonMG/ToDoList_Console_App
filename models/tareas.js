
/**
 * COMO FUNCIONARA LISTADO
 * _listad:
 * {'uuid-123456-12356-2: {id:12, desc:asd, completadoEn:05/12/2022}'}
 * {'uuid-123456-12356-2: {id:12, desc:asd, completadoEn:05/12/2022}'}
 * {'uuid-123456-12356-2: {id:12, desc:asd, completadoEn:05/12/2022}'}
 */

import { Tarea } from "./tarea.js";



class Tareas {

    _listado = {};

    //Para llamar al get hace falta solo poner el nombre listadoArr
    get listadoArr(){
        //Object.values devuelve un arreglo con las instancias de Tarea
        const listado = [...Object.values(this._listado)];
        return listado;

    }

    constructor() {
        this._listado = {}; 
    }

    borrarTarea( id = '' ){

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }

    //Este metodo solo sirve para agregar las tareas al iniciar la app
    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach (tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    //Creamos una tarea nueva de la clase Tarea
    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    //Metodo para listamos las tareas y mostrarlas al usuario
    listadoCompleto(){

        console.log();
        this.listadoArr.forEach((item, index) => {
            console.log(`${((index+1) + '.').green} ${item.desc} :: ${item.completadoEn ? 'Completado'.green : 'Pendiente'.red} `)
        })

    }

    //Imprime los pendientes segun la variable completada
    //false -> las que no estan completas
    //true -> las que estan completadas
    listarPendientesCompletadas(completadas = true){ 

        console.log();
        let index = 0;

        if (completadas) {
        
            this.listadoArr.forEach((item) => {
                if (item.completadoEn) {
                    console.log(`${((index+1) + '.').green} ${item.desc} :: `+`${item.completadoEn}`.green)
                }
            })

            index++;

        } else {
            
            this.listadoArr.forEach((item) => {
                if (!item.completadoEn) {
                    console.log(`${((index+1) + '.').green} ${item.desc} :: ${item.completadoEn ? 'Completado'.green : 'Pendiente'.red} `)
                }
            })
            index++;
        }
    }

    toggleCompletadas( ids = [] ){//Pasara el estado de una tarea a completado

        ids.forEach(id => {

            //Estos objetos se estan pasando por referencia, 
            //asi que la modificacion tambien se realiza en _listado[id]
            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;  
            }
        });

    }

}

export { 
    Tareas
 }