import { useMap , MapContainer } from "react-leaflet";
import L from 'leaflet'
import mapImage from '../../assets/Colombia_Mapa_Oficial.svg.png'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from "react";



  //componente que maneja la imagen superpuesta
const ImageOverlay = ({locations, object})=> {
    const [routes, setRoutes] = useState([]);
    const [markers, setMarkers] = useState([]);

    //hacemos el fetch a las conexiones:
    useEffect(()=> {
        const fetchRoute = async ()=> {
            let response = await fetch('http://localhost:3000/graph', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : object
            });

            let routes = response.json();
            return routes;
        }
        fetchRoute().then(routes => {
            setRoutes(prev=>[...prev, ...routes]);

        })
        
    }, [])

    const map = useMap();

    useEffect(()=> {

        //definimos los limites de la imagen
        const bounds = [[0, 0], [100, 100]];

        //agregamos la imagen superpuesta en el mapa
        L.imageOverlay(mapImage, bounds).addTo(map);

        //ajustamos el mapa a los limites de la imagen
        map.fitBounds(bounds);

        //agregar los puntos definidos
        locations.forEach((location)=> {
            setMarkers(prev => [...prev, [[location.nombre], [location.posY, location.posX]]]);

        });
        if (locations.length>0) {
        
            //agregar las conexiones entre los puntos
            const sortLocations = (locations)=> {
                let sortedLocations = [];

                for (let i = 0; i < routes.length; i++) {
                    locations.forEach(nodo => {
                        if(nodo.nombre == routes[i])
                            sortedLocations.push(nodo)
                    })
                }
                return sortedLocations;
            }

            let sortedLocations = sortLocations(locations);

            for (let i = 0; i < routes.length; i++) {

                for (let j = 0; j < sortedLocations.length; j++) {
                    if (routes[i] == sortedLocations[j].nombre) {
                        
                        if (sortedLocations[1+j]) {
                            
                            L.polyline(
                                [
                                    [[sortedLocations[j].posY, sortedLocations[j].posX], [sortedLocations[1+j].posY, sortedLocations[1+j].posX]]
                                ], {
                                    color: 'red'
                                }
                            )
                            .addTo(map)

                        }
                    }
        
                }
                
            }
            

        }

    }, [map, locations]);

    useEffect(()=> {
        if (markers.length == locations.length) {
            markers.forEach((marker)=> {                
                L.marker(marker[1])
                .addTo(map)
                .bindPopup(marker[0][0]);

            })
        }

    }, [markers])

    return null;

}

export const MapView = ({locations, object})=> {
    const position = [50, 50];
    const zoom = 1;
    const style = { height: "68vh", width: "46%" }

    return(
        <MapContainer
            center={position}
            zoom={zoom}
            style={style}
            crs={L.CRS.Simple}
        >

        <ImageOverlay locations={locations} object={object}></ImageOverlay>

        </MapContainer>
    )
}