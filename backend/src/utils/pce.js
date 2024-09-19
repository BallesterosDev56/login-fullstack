// Permuta
function permutador(arr){
    const resultado = []
    function permutadora(perm, inicio){
        if(inicio == perm.length){
            resultado.push([...perm])
            return
        }
        for(let i = inicio ; i < perm.length; i++){
            [perm[inicio], perm[i]] = [perm[i], perm[inicio]]; 
            permutadora(perm, inicio + 1);
            [perm[inicio], perm[i]] = [perm[i], perm[inicio]];
        }
    }
    permutadora(arr, 0)
    
    return resultado
}

// Calcula
function calculaCostos(permutacion, matrizPeso){
    let costo = 0
    for(let i = 0 ; i < permutacion.length -1 ; i++){
        costo += matrizPeso[permutacion[i]][permutacion[i + 1]]
    }
    costo += matrizPeso[permutacion[permutacion.length - 1]][permutacion[0]]
    if(costo == Infinity){
        return false
    }else{
        return costo
    }
}


// Evalua
export function caminoMenosCostoso(matrizPeso){
    const numeroNod = matrizPeso.length
    const nodos = Array.from({length: numeroNod}, (_,i) => i)
    const permutaciones = permutador(nodos)
    let costMin = Infinity
    let mejorCamino = []
    for(const permutacion of permutaciones){
        const costo = calculaCostos(permutacion, matrizPeso)
        if(!costo){
            continue
        }
        if(costo < costMin){
            costMin = costo
            mejorCamino = permutacion
        }
    }
    if(costMin == Infinity){
        mejorCamino = ['No existe conexion posible entre los nodos']
        costMin = 0
        return { mejorCamino, costMin} 
    }else{
        mejorCamino.push(mejorCamino[0])
        return { mejorCamino, costMin}
    }
}
