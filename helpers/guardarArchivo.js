import fs from 'fs'
const archivo = './db/data.json'

//Creamos o actualizamos el archivo con la tarea nueva
const guardarDB = ( data ) => {
    
    fs.writeFileSync( archivo, JSON.stringify(data) );

}

//Leemos los datos en el archivo data.json (nos sirve como BD)
const leerDB = () => {
    //si no existe no hace nada
    if (!fs.existsSync(archivo)) {
        return null;
    }

    //Leemos la informacion del archivo y agregamos el encoding
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse( info );

    console.log(data);
    
    return data;
}

export {
    guardarDB,
    leerDB
}