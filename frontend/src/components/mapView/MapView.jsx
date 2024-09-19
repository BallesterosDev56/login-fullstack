import { useMap , MapContainer } from "react-leaflet";
import L from 'leaflet'
import mapImage from '../../assets/Colombia_Mapa_Oficial.svg.png'
import 'leaflet/dist/leaflet.css'
import { useEffect } from "react";

const conexiones = [
    { ubicacion1: "A", ubicacion2: "B", peso: 20 },
    { ubicacion1: "B", ubicacion2: "C", peso: 15 },
    { ubicacion1: "A", ubicacion2: "D", peso: 15 },
  ];

  
  //componente que maneja la imagen superpuesta
  const ImageOverlay = ({ubicaciones, conexiones})=> {

      const findUbication = (name)=> {
          return ubicaciones.find((ubicacion)=> ubicacion.nombre===name);
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
        ubicaciones.forEach((ubicacion)=> {
        L.marker([ubicacion.posY, ubicacion.posX])
            .addTo(map)
            .bindPopup(ubicacion.nombre);

        })

        //agregar las conexiones entre los puntos
        conexiones.forEach((conexion)=> {
            const punto1 = findUbication(conexion.ubicacion1);
            const punto2 = findUbication(conexion.ubicacion2);

            if (punto1 && punto2) {
                L.polyline(
                    [
                        [punto1.posY, punto1.posX], [punto2.posY, punto2.posX]
                    ],
                    {
                        color: 'red'
                    }
                ).addTo(map)
                .bindPopup(`Peso: ${conexion.peso}`);
                
            }

        })

    }, [map, ubicaciones])

    return null;

}

export const MapView = ({ubicaciones})=> {
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

        <ImageOverlay ubicaciones={ubicaciones} conexiones={conexiones}></ImageOverlay>

        </MapContainer>
    )
}