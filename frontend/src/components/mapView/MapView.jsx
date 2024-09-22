import { useMap, MapContainer } from "react-leaflet";
import L from 'leaflet';
import mapImage from '../../assets/Colombia_Mapa_Oficial.svg.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";

// Componente que maneja la imagen superpuesta
const ImageOverlay = ({ locations, object }) => {
    const [routes, setRoutes] = useState([]);
    const [markers, setMarkers] = useState([]);
    
    // Hacemos el fetch a las conexiones:
    useEffect(() => {
        const fetchRoute = async () => {
            try {
                let response = await fetch('http://localhost:3000/graph', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: object
                });

                let routes = await response.json();

                // Verificamos que `routes` sea un array
                if (Array.isArray(routes.ruta)) {
                    setRoutes(routes.ruta);
                } else {
                    console.error("The fetched routes data is not an array:", routes);
                }
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        }

        if (object) {
            fetchRoute(); // Solo hacemos fetch si existe el objeto.
        }

    }, [object]);

    const map = useMap();

    useEffect(() => {
        // Definimos los límites de la imagen
        const bounds = [[0, 0], [100, 100]];

        // Agregamos la imagen superpuesta en el mapa
        L.imageOverlay(mapImage, bounds).addTo(map);

        // Ajustamos el mapa a los límites de la imagen
        map.fitBounds(bounds);

        // Agregar los puntos definidos
        locations.forEach((location) => {
            setMarkers(prev => [...prev, [[location.nombre], [location.posY, location.posX]]]);
        });

        if (locations.length > 0 && routes.length > 0) {
            // Ordenar las ubicaciones según las rutas
            const sortLocations = (locations) => {
                let sortedLocations = [];

                routes.forEach(route => {
                    let matchedNode = locations.find(nodo => nodo.nombre === route);
                    if (matchedNode) {
                        sortedLocations.push(matchedNode);
                    }
                });
                return sortedLocations;
            }

            let sortedLocations = sortLocations(locations);

            // Dibujar las rutas en el mapa
            if (sortedLocations.length > 1) {
                for (let i = 0; i < sortedLocations.length - 1; i++) {
                    L.polyline(
                        [
                            [sortedLocations[i].posY, sortedLocations[i].posX],
                            [sortedLocations[i + 1].posY, sortedLocations[i + 1].posX]
                        ], 
                        { color: 'red' }
                    ).addTo(map);
                }
            }
        }

    }, [map, locations, routes]);

    // Agregar los marcadores
    useEffect(() => {
        if (markers.length === locations.length) {
            markers.forEach((marker) => {                
                L.marker(marker[1])
                .addTo(map)
                .bindPopup(marker[0][0]);
            });
        }
    }, [markers]);

    return null;
}

export const MapView = ({ locations, object }) => {
    const position = [50, 50];
    const zoom = 1;
    const style = { height: "68vh", width: "46%" };

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            style={style}
            crs={L.CRS.Simple}
        >
            <ImageOverlay locations={locations} object={object}></ImageOverlay>
        </MapContainer>
    );
}
