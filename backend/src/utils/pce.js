// Generar matriz de adyacencia
function generarMatrizAdyacencia(json) {
    const ubicaciones = json.ubicaciones;
    const conexiones = json.conexiones;

    // Crear una matriz cuadrada de tamaño n x n con valores Infinity
    const n = ubicaciones.length;
    const matrizPeso = Array.from({ length: n }, () => Array(n).fill(Infinity));

    // Rellenar la diagonal con ceros (distancia de un nodo a sí mismo)
    for (let i = 0; i < n; i++) {
        matrizPeso[i][i] = 0;
    }

    // Rellenar la matriz con los pesos de las conexiones
    conexiones.forEach(({ ubicacion1, ubicacion2, peso }) => {
        const index1 = ubicaciones.findIndex(u => u.nombre === ubicacion1);
        const index2 = ubicaciones.findIndex(u => u.nombre === ubicacion2);
        if (index1 !== -1 && index2 !== -1) {
            matrizPeso[index1][index2] = peso;
            matrizPeso[index2][index1] = peso; // Si es un grafo no dirigido
        }
    });

    return matrizPeso
}

// Permutador
function permutador(arr) {
    const resultado = [];
    function permutadora(perm, inicio) {
        if (inicio === perm.length) {
            resultado.push([...perm]);
            return;
        }
        for (let i = inicio; i < perm.length; i++) {
            [perm[inicio], perm[i]] = [perm[i], perm[inicio]];
            permutadora(perm, inicio + 1);
            [perm[inicio], perm[i]] = [perm[i], perm[inicio]];
        }
    }
    permutadora(arr, 0);
    return resultado;
}

// Calcula el costo de una permutación
function calculaCostos(permutacion, matrizPeso) {
    let costo = 0;
    for (let i = 0; i < permutacion.length - 1; i++) {
        costo += matrizPeso[permutacion[i]][permutacion[i + 1]];
    }
    costo += matrizPeso[permutacion[permutacion.length - 1]][permutacion[0]]; // Vuelta al inicio
    return costo === Infinity ? false : costo;
}

// Evalúa el camino menos costoso
export function caminoMenosCostoso(json) {
    const matrizPeso = generarMatrizAdyacencia(json);
    const ubicaciones = json.ubicaciones;
    const nodoInicio = json.inicio;

    // Encontrar el índice del nodo de inicio
    const indexInicio = ubicaciones.findIndex(u => u.nombre === nodoInicio);
    
    if (indexInicio === -1) {
        throw new Error("Nodo de inicio no encontrado en las ubicaciones");
    }

    // Crear una lista de nodos excluyendo el nodo de inicio para permutar
    const numeroNod = matrizPeso.length;
    const nodos = Array.from({ length: numeroNod }, (_, i) => i).filter(i => i !== indexInicio);
    const permutaciones = permutador(nodos);
    let costMin = Infinity;
    let mejorCamino = [];

    // Añadir el nodo de inicio al principio y al final de cada permutación
    for (const permutacion of permutaciones) {
        const caminoCompleto = [indexInicio, ...permutacion, indexInicio];
        const costo = calculaCostos(caminoCompleto, matrizPeso);
        if (!costo) {
            continue;
        }
        if (costo < costMin) {
            costMin = costo;
            mejorCamino = caminoCompleto;
        }
    }

    if (costMin === Infinity) {
        mejorCamino = ['No existe conexión posible entre los nodos'];
        costMin = 0;
        return [mejorCamino, costMin];
    } else {
        // Convertir índices a nombres de nodos
        const nombreNodos = ubicaciones.map(u => u.nombre);
        const mejorCaminoNombres = mejorCamino.map(index => nombreNodos[index]);
        return [mejorCaminoNombres, costMin];
    }
}

// Ejemplo
let json = {
    "ubicaciones": [
        { "nombre": "A", "posX": 20, "posY": 20 },
        { "nombre": "B", "posX": 45, "posY": 60 },
        { "nombre": "C", "posX": 79, "posY": 90 },
        { "nombre": "D", "posX": 56, "posY": 79 },
        { "nombre": "E", "posX": 30, "posY": 40 },
        { "nombre": "F", "posX": 70, "posY": 30 },
        { "nombre": "G", "posX": 80, "posY": 70 },
        { "nombre": "H", "posX": 60, "posY": 50 }
    ],
    "conexiones": [
        { "ubicacion1": "A", "ubicacion2": "B", "peso": 25 },
        { "ubicacion1": "A", "ubicacion2": "E", "peso": 15 },
        { "ubicacion1": "B", "ubicacion2": "C", "peso": 35 },
        { "ubicacion1": "B", "ubicacion2": "D", "peso": 20 },
        { "ubicacion1": "C", "ubicacion2": "D", "peso": 30 },
        { "ubicacion1": "C", "ubicacion2": "G", "peso": 40 },
        { "ubicacion1": "D", "ubicacion2": "E", "peso": 25 },
        { "ubicacion1": "D", "ubicacion2": "F", "peso": 50 },
        { "ubicacion1": "E", "ubicacion2": "F", "peso": 10 },
        { "ubicacion1": "E", "ubicacion2": "H", "peso": 20 },
        { "ubicacion1": "F", "ubicacion2": "G", "peso": 15 },
        { "ubicacion1": "F", "ubicacion2": "H", "peso": 25 },
        { "ubicacion1": "G", "ubicacion2": "H", "peso": 30 }
    ],
    "inicio": "A"
}


let [ruta, costo] = caminoMenosCostoso(json);
console.log("Mejor ruta:", ruta);
console.log("Costo:", costo);
