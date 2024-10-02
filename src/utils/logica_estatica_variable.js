let espacio_particionado = [3145728, 2097152, 1048576, 4194304, 5242880] //[524288,524288,1048576,1048576,2097152,2097152,4194304,4194304]

// nombre-proceso | inicio_mem | final_mem
let tabla = []
let procesos_cargados = []

export const getProcesos = () => {
    return procesos_cargados 
}

// cargamos el sistema operativo en la RAM
let sistema_operativo = 1048575 
tabla.push(['SO', 0, sistema_operativo])

// Asignamos una memoria total de 16MiB
export const RAM = 16777216 - sistema_operativo - 1

if (espacio_particionado && espacio_particionado.length > 0) {

    // cargamos las particiones en la tabla
    for (let i = 0; i < espacio_particionado.length; i++) {
        tabla.push([undefined, tabla[i][2] + 1, tabla[i][2] + espacio_particionado[i]])
    }
}

export const setterParticiones = (values) => {
    procesos_cargados = []
    espacio_particionado = values
    tabla = []
    // cargamos el sistema operativo en la RAM
    sistema_operativo = 1048575
    tabla.push(['SO', 0, sistema_operativo])
    if (espacio_particionado && espacio_particionado.length > 0) {

        // cargamos las particiones en la tabla
        for (let i = 0; i < espacio_particionado.length; i++) {
            tabla.push([undefined, tabla[i][2] + 1, tabla[i][2] + espacio_particionado[i]])
        }
    }
}

function espacio_mayor(tabla, tamaño_min) {
    let posicion_mayor = 0
    let tamaño_bloque = 0
    for (let i = 1; i < tabla.length; i++) {
        if (tabla[i][0] === undefined && tamaño_min <= tabla[i][2] - tabla[i][1] && tamaño_bloque < tabla[i][2] - tabla[i][1]) {
            tamaño_bloque = tabla[i][2] - tabla[i][1]
            posicion_mayor = i
        }
    }
    if (posicion_mayor !== 0) {
        return posicion_mayor
    } else {
        return -1
    }
}

function espacio_ajustado(tabla, tamaño_min) {
    let posicion_mayor = 0
    let tamaño_bloque = 0
    let mejor_ajuste = null
    for (let i = 1; i < tabla.length; i++) {
        if (tabla[i][0] === undefined && tamaño_min <= tabla[i][2] - tabla[i][1]) {
            if (mejor_ajuste === null || tamaño_bloque > tabla[i][2] - tabla[i][1]) {
                mejor_ajuste = 1
                tamaño_bloque = tabla[i][2] - tabla[i][1]
                posicion_mayor = i
            }
        }
    }
    if (posicion_mayor !== 0) {
        return posicion_mayor
    } else {
        return -1
    }
}

export function estatica_variable(programas, ajuste) {
    let nombres_procesos = Object.keys(programas)
    let aux_procesos_car = procesos_cargados.slice()
    //verificamos si el proceso ya no está cargado
    for (let k = 0; k < procesos_cargados.length; k++) {
        if (!nombres_procesos.includes(procesos_cargados[k])) {
            let proceso_eliminar = procesos_cargados[k]
            for (let i = 0; i < tabla.length; i++) {
                if (tabla[i][0] === proceso_eliminar) {
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
    for (let i = 0; i < nombres_procesos.length; i++) {
        // validamos que el proceso no este ya cargado en memoria
        if (!procesos_cargados.includes(nombres_procesos[i])) {

            if (ajuste === 'peor') {
                let posicion_espacio = espacio_mayor(tabla, programas[nombres_procesos[i]])
                if (posicion_espacio !== -1) {
                    tabla[posicion_espacio][0] = nombres_procesos[i]
                    procesos_cargados.push(nombres_procesos[i])
                }
                continue
            }
            if (ajuste === 'mejor') {
                let posicion_espacio = espacio_ajustado(tabla, programas[nombres_procesos[i]])
                if (posicion_espacio !== -1) {
                    tabla[posicion_espacio][0] = nombres_procesos[i]
                    procesos_cargados.push(nombres_procesos[i])
                }
                continue
            }
            for (let j = 0; j < tabla.length; j++) {
                /*
                    Recorremos cada elemento de la tabla para buscar si hay alguna partición disponible
                    y verificamos si el proceso es de un tamaño igual o menor
                */
                // primer ajuste
                if (tabla[j][0] === undefined && programas[nombres_procesos[i]] <= tabla[j][2] - tabla[j][1] && ajuste === 'primer') {
                    // añadimos el proceso en un espacio vacio 
                    tabla[j][0] = nombres_procesos[i]
                    procesos_cargados.push(nombres_procesos[i])
                    break
                }
            }
        }

    }

    return tabla
}

/*
let pro = {'p4':436201, 'p8':2696608}
estatica_variable(pro,'mejor')
pro = {'p4':224649,'p3':309150, 'p8':2696608}
estatica_variable(pro,'mejor')   
pro = {'p5':209462}
estatica_variable(pro,'mejor')
pro = {'p5':209462,'p4':436201,'p2':286708,'p6':3996608,'p8':2696608}
estatica_variable(pro,'mejor')
pro = {'p6':3996608,'p1':224649,'p8':2696608,'p3':309150}
estatica_variable(pro,'mejor')
pro = {'p3':309150,'p6':3996608,'p7':1785608,'p2':286708,'p5':209462,'p4':436201}
console.log(estatica_variable(pro,'mejor'))*/