// Asignamos una memoria total de 16MiB
const RAM = 16777216

// nombre-proceso | inicio_mem | final_mem
let tabla = []
let procesos_cargados = []

export const getProcesos = () => {
    return procesos_cargados 
}


// cargamos el sistema operativo en la RAM
let sistema_operativo = 1048575
tabla.push(['SO',0, sistema_operativo])
tabla.push([undefined,tabla[0][2]+1,RAM-1])


function espacio_mayor(tabla, tamaño_min) {
    let posicion_mayor = 0
    let tamaño_bloque = 0
    for (let i = 1; i< tabla.length; i++) {
       if (tabla[i][0] === undefined && tamaño_min <= tabla[i][2]-tabla[i][1] && tamaño_bloque < tabla[i][2]-tabla[i][1]){
            tamaño_bloque = tabla[i][2]-tabla[i][1]
            posicion_mayor = i
       }
    }
    if (posicion_mayor !== 0){
        return posicion_mayor
    }else{
        return -1
    }
}

function espacio_ajustado(tabla, tamaño_min) {
    let posicion_mayor = 0
    let tamaño_bloque = 0
    let mejor_ajuste = null
    for (let i = 1; i< tabla.length; i++) {
       if (tabla[i][0] === undefined && tamaño_min <= tabla[i][2]-tabla[i][1] ){
            if (mejor_ajuste === null ||  tamaño_bloque > tabla[i][2]-tabla[i][1]) {
                mejor_ajuste = 1
                tamaño_bloque = tabla[i][2]-tabla[i][1]
                posicion_mayor = i
            }       
       }
    }
    if (posicion_mayor !== 0){
        return posicion_mayor
    }else{
        return -1
    }
}

export function dinamica(programas, ajuste) {
    let nombres_procesos = Object.keys(programas)
    let aux_procesos_car = procesos_cargados.slice()
    //verificamos si el proceso ya no está cargado
    for(let k = 0; k < procesos_cargados.length;k++){
        if(!nombres_procesos.includes(procesos_cargados[k])){
                let proceso_eliminar = procesos_cargados[k]
                for(let i = 0; i<tabla.length;i++){
                    try {
                        let aux_fila = tabla[i][0]
                        if( aux_fila === proceso_eliminar){
                            // eliminamos el proceso de la tabla y de la lista de procesos cargados
                            tabla[i][0] = undefined
                            aux_procesos_car = aux_procesos_car.filter((element) => element !== proceso_eliminar);
                            break
                        }
                    } catch (error) {
                        // IGNORAR
                    }
                    
                }
                
            }
    }
    procesos_cargados = aux_procesos_car

    // reconstruccion de la pila
    let aux_length = tabla.length - 1
    for (let i = aux_length; i > 0; i--) {
        if(tabla[i][0]=== undefined && tabla[i-1][0] === undefined){
            tabla[i][1] = tabla[i-1][1]
            tabla.splice(i-1,1)
        }
    }
   
    // carga de procesos
    for (let i = 0; i < nombres_procesos.length; i++) {
        if (!procesos_cargados.includes(nombres_procesos[i])) {
            
            // peor ajuste
            if (ajuste === 'peor') {
                let posicion_inicial = espacio_mayor(tabla,programas[nombres_procesos[i]])
                tabla.splice(posicion_inicial,0,[nombres_procesos[i],tabla[posicion_inicial-1][2]+1,tabla[posicion_inicial-1][2]+programas[nombres_procesos[i]]])
                tabla[posicion_inicial+1][1]= tabla[posicion_inicial][2]+1
                procesos_cargados.push(nombres_procesos[i])
            }

            // mejor ajuste 
            if (ajuste === 'mejor') {
                let posicion_inicial = espacio_ajustado(tabla,programas[nombres_procesos[i]])
                tabla.splice(posicion_inicial,0,[nombres_procesos[i],tabla[posicion_inicial-1][2]+1,tabla[posicion_inicial-1][2]+programas[nombres_procesos[i]]])
                tabla[posicion_inicial+1][1]= tabla[posicion_inicial][2]+1
                procesos_cargados.push(nombres_procesos[i])
            }

            // primer ajuste
            for(let j = 0; j<tabla.length; j++){
                let posicion_inicial = tabla[j][2]
                try {
                    // añadimos el proceso en un espacio vacio
                    if (tabla[j][0] === undefined && ajuste === 'primer'){
                        let tamanio = tabla[j][2]-tabla[j][1]
                        if(tamanio >= programas[nombres_procesos[i]]){
                           posicion_inicial = tabla[j-1][2]
                            tabla.splice(j,0,[nombres_procesos[i],posicion_inicial+1,posicion_inicial+programas[nombres_procesos[i]]])
                            tabla[j+1][1]= tabla[j][2]+1
                            procesos_cargados.push(nombres_procesos[i])
                            break
                        }
                    }   
                } catch (error) {
                    //IGNORAR
                } 
            }
        }
    }

    return tabla
}


// Test
/*
let pro = {'p4':436201, 'p8':2696608}
dinamica(pro,'mejor')
pro = {'p4':224649, 'p8':2696608,'p3':309150}
dinamica(pro,'mejor')
pro = {'p5':209462}
dinamica(pro,'mejor')
pro = {'p4':436201,'p2':286708,'p6':3996608,'p8':2696608,'p5':209462}
dinamica(pro,'mejor')
pro = {'p1':224649,'p3':309150,'p6':3996608,'p8':2696608}
dinamica(pro,'mejor')
pro = {'p3':309150,'p2':286708,'p6':3996608,'p7':1785608,'p4':436201,'p5':209462}
console.log(dinamica(pro,'mejor'))*/