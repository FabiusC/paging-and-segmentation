// Asignamos una memoria total de 16MiB
const RAM = 16777216

let espacio_particionado = 1048576 //parseInt(prompt("valor de la particion en KiB"))*1024
// nombre-proceso | inicio_mem | final_mem
let tabla = []
let procesos_cargados = []

export const getProcesos = () => {
    return procesos_cargados 
}

// cargamos el sistema operativo en la RAM
let sistema_operativo = 1048575
tabla.push(['SO',0, sistema_operativo])

// cargamos las particiones en la tabla
for (let i = 0; i < parseInt((RAM - 1048576)/espacio_particionado); i++) {
    tabla.push([undefined,tabla[i][2]+1,tabla[i][2]+espacio_particionado])
}

export const setter_particion = (val) =>{
    espacio_particionado = parseInt(val)
    tabla = []
    procesos_cargados = []
    sistema_operativo = 1048575
    tabla.push(['SO',0, sistema_operativo])
    for (let i = 0; i < parseInt((RAM - 1048576)/espacio_particionado); i++) {
        tabla.push([undefined,tabla[i][2]+1,tabla[i][2]+espacio_particionado])
    }
}

export function estaticas_fija(programas) {
    let nombres_procesos = Object.keys(programas)
    let aux_procesos_car = procesos_cargados.slice()
    //verificamos si el proceso ya no está cargado
    for(let k = 0; k < procesos_cargados.length;k++){
        if(!nombres_procesos.includes(procesos_cargados[k])){
                let proceso_eliminar = procesos_cargados[k]
                for(let i = 0; i<tabla.length;i++){
                    if(tabla[i][0] === proceso_eliminar){
                        // eliminamos el proceso de la tabla y de la lista de procesos cargados
                        tabla[i][0] = undefined
                        aux_procesos_car = aux_procesos_car.filter((element) => element !== proceso_eliminar);
                        break
                    }
                }
                
            }
    }
    procesos_cargados = aux_procesos_car

    //cargar procesos
    for(let i = 0; i< nombres_procesos.length; i++){
            // validamos que el proceso no ocupe más memoria de la permitida por la partición
            // validamos que el proceso no este ya cargado en memoria
            if(programas[nombres_procesos[i]]<= espacio_particionado && !procesos_cargados.includes(nombres_procesos[i])){
                for(let j = 0; j<tabla.length; j++){
                    /*
                        Recorremos cada elemento de la tabla para buscar si hay alguna partición disponible
                        en caso de que no lo haya se registra en una nueva posición de la tabla
                    */
                    // añadimos el proceso en un espacio vacio 
                    if (tabla[j][0] === undefined){
                        tabla[j][0] = nombres_procesos[i]
                        procesos_cargados.push(nombres_procesos[i])
                        break
                    }
                }
            }
        
    }
    return tabla
}


// Test

/*pro = {'p2':307200,'p3':309150,'p6':3996608,'p4':436201,'p5':209462,
'p7':1785608,'p9':1785608,'p10':209462,'p11':209462,'p12':209462,'p13':209462,
'p14':209462,'p15':209462,'p16':209462,'p17':209462,
'p18':209462,'p19':209462,'p20':209462,'p21':209462
}*/

/*
let pro = {'p4':436201, 'p8':2696608}
estaticas_fija(pro)
pro = {'p4':224649, 'p8':2696608,'p3':309150}
estaticas_fija(pro)   
pro = {'p5':209462}
estaticas_fija(pro)
pro = {'p4':436201,'p2':286708,'p6':3996608,'p8':2696608,'p5':209462}
estaticas_fija(pro)
pro = {'p1':224649,'p3':309150,'p6':3996608,'p8':2696608}
estaticas_fija(pro)*/