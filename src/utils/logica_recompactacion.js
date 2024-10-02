// Asignamos una memoria total de 16MiB
const RAM1 = 16777216

// nombre-proceso | inicio_mem | final_mem
let tabla1 = []
 let procesos_cargados1 = []

 export const getProcesos = () => {
    return procesos_cargados1 
}

// cargamos el sistema operativo en la RAM
let sistema_operativo1 = 1048575
tabla1.push(['SO',0, sistema_operativo1])


export function dinamicaCC(programas) {
    let nombres_procesos = Object.keys(programas)
    let aux_procesos_car = procesos_cargados1.slice()
    //verificamos si el proceso ya no está cargado
    for(let k = 0; k < procesos_cargados1.length;k++){
        if(!nombres_procesos.includes(procesos_cargados1[k])){
                let proceso_eliminar = procesos_cargados1[k]
                let longitud = tabla1.length
                for(let i = 0; i<longitud;i++){
                    try {
                        let aux_fila = tabla1[i][0]
                        if( aux_fila === proceso_eliminar){
                            // eliminamos el proceso de la tabla1 y de la lista de procesos cargados
                            tabla1.splice(i,1)
                            aux_procesos_car = aux_procesos_car.filter((element) => element !== proceso_eliminar);
                            // se hace la recompactación
                            // definimos el tamaño del limite o espacio de memoria libre que quedó
                            let limite = (tabla1[i][1]-tabla1[i-1][2])
                            for (let j = i; j < tabla1.length; j++) {
                                // iteramos desde el elemento que actual en adelante para ajustar los limites
                                tabla1[j][1] = tabla1[j][1] - limite + 1
                                tabla1[j][2] = tabla1[j][2] - limite + 1 
                            }  
                            
                        }
                    } catch (error) {
                        // IGNORAR
                    }
                }
                
            }
    }
    procesos_cargados1 = aux_procesos_car

    // carga de procesos
    for (let i = 0; i < nombres_procesos.length; i++) {
        if (!procesos_cargados1.includes(nombres_procesos[i])) {
            for(let j = 0; j<tabla1.length; j++){
                let posicion_inicial = tabla1[j][2]

                // añadimos a final de la pila si no sobre pasa la el tamaño de la pila
                if(j+1 === tabla1.length && posicion_inicial+programas[nombres_procesos[i]] < RAM1){
                    // cargamos un proceso en la parte más alta de la memoria 
                    tabla1.push([nombres_procesos[i],posicion_inicial+1,posicion_inicial+programas[nombres_procesos[i]]])
                    procesos_cargados1.push(nombres_procesos[i])
                    break
                }   
            }
        }
    }
    let aux_tabla1 = Array.from(tabla1)
    aux_tabla1.push([undefined,tabla1[tabla1.length-1][2]+1,RAM1-1])
    return aux_tabla1
}


// Test

/*let pro = {'p4':436201, 'p8':2696608}
dinamica(pro)
pro = {'p4':224649, 'p8':2696608,'p3':309150}
dinamica(pro)   
pro = {'p5':209462}
dinamica(pro)
pro = {'p4':436201,'p2':286708,'p6':3996608,'p8':2696608,'p5':209462}
dinamica(pro)
pro = {'p1':224649,'p3':309150,'p6':3996608,'p8':2696608}
dinamica(pro)
pro = {'p3':309150,'p7':1785608,'p2':286708,'p6':3996608,'p5':209462,'p4':436201}
console.log(dinamica(pro))
/*let pro = {'p4':16777216, 'p8':2696608}
dinamica(pro)
console.log(procesos_cargados)*/