import { useMap , MapContainer } from "react-leaflet";
import L from 'leaflet'
import mapImage from '../../assets/Colombia_Mapa_Oficial.svg.png'
import 'leaflet/dist/leaflet.css'
import { useEffect } from "react";

const connections = [
    { ubicacion1: "A", ubicacion2: "B", peso: 20 },
    { ubicacion1: "B", ubicacion2: "C", peso: 15 },
    { ubicacion1: "A", ubicacion2: "D", peso: 15 },
  ];

  
  //componente que maneja la imagen superpuesta
  const ImageOverlay = ({locations, connections})=> {

      const findUbication = (name)=> {
          return locations.find((location)=> location.nombre===name);
      }

      const map = useMap();

    useEffect(()=> {
        //definimos los limites de la imagen
        const bounds = [[0, 0], [100, 100]];

        //agregamos la imagen superpuesta en el mapa
        L.imageOverlay(mapImage, bounds).addTo(map);

        //ajustamos el mapa a los limites de la imagen
        map.fitBounds(bounds);

        //agregar los puntos prefedinidos
        locations.forEach((location)=> {
        L.marker([location.posY, location.posX])
            .addTo(map)
            .bindPopup(location.nombre);

        })

        //agregar las connections entre los puntos
        connections.forEach((connection)=> {
            const punto1 = findUbication(connection.ubicacion1);
            const punto2 = findUbication(connection.ubicacion2);

            if (punto1 && punto2) {
                L.polyline(
                    [
                        [punto1.posY, punto1.posX], [punto2.posY, punto2.posX]
                    ],
                    {
                        color: 'red'
                    }
                ).addTo(map)
                .bindPopup(`Peso: ${connection.peso}`);
                
            }

        })

    }, [map, locations])

    return null;

}

export const MapView = ({locations})=> {
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

        <ImageOverlay locations={locations} connections={connections}></ImageOverlay>

        </MapContainer>
    )
}